import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Volume2, VolumeX, Music, Music2, Music3, Music4, Trophy, Zap } from "lucide-react";
import tariqSongPath from "@assets/tariq_journey_song.mp3";
import tariqAvatarPath from "@assets/generated_images/tariq_ibn_ziyad_cartoon.png";
import lyricsData from "@/data/tariq-lyrics.json";
import type { PerformanceData } from "@/lib/gameProgress";
import { loadDiagnostics, getRhythmSettings, type TempoSetting } from "@/lib/adaptiveDiagnostics";

interface LyricLine {
  text: string;
  start: number;
  end: number;
  echo?: string;
}

interface LyricSection {
  id: string;
  label: string;
  arrangement: string;
  startTime: number;
  lines: LyricLine[];
}

interface RhythmPrompt {
  id: string;
  startTime: number;
  endTime: number;
  emoji: string;
  lyric: string;
}

interface MusicNote {
  id: string;
  x: number;
  y: number;
  noteType: "music" | "music2" | "music3" | "music4";
  createdAt: number;
}

interface TariqRhythmGameProps {
  onComplete: (bonusPoints: number, performanceData: PerformanceData, bestStreak: number) => void;
}

const MUSIC_NOTE_TYPES: MusicNote["noteType"][] = ["music", "music2", "music3", "music4"];

// Song tempo: 129 BPM (Allegro) in 4/4 time
// 60000ms / 129 BPM = ~465ms per beat
const BPM = 129;
const MS_PER_BEAT = 60000 / BPM; // ~465ms
const NOTE_INTERVAL = MS_PER_BEAT * 4; // One note per measure (4 beats) (~1860ms)

function MusicNoteIcon({ type, className }: { type: MusicNote["noteType"]; className?: string }) {
  switch (type) {
    case "music":
      return <Music className={className} />;
    case "music2":
      return <Music2 className={className} />;
    case "music3":
      return <Music3 className={className} />;
    case "music4":
      return <Music4 className={className} />;
    default:
      return <Music className={className} />;
  }
}

function generatePromptsFromLyrics(): RhythmPrompt[] {
  const prompts: RhythmPrompt[] = [];
  let promptId = 1;

  // Each prompt has a beat offset so they appear in sequence (1 beat = ~0.465s)
  const promptConfig = [
    { emoji: "⛵️", keywords: ["Across the sea"], duration: 2, beatOffset: 0 },
    { emoji: "📍", keywords: ["To Spain"], duration: 2, beatOffset: 2 },
    { emoji: "🗺️", keywords: ["We go"], duration: 2, beatOffset: 4 },
  ];

  const beatDuration = MS_PER_BEAT / 1000; // Convert to seconds

  (lyricsData.sections as LyricSection[]).forEach((section) => {
    section.lines.forEach((line) => {
      promptConfig.forEach((config) => {
        config.keywords.forEach((keyword) => {
          if (line.text.toLowerCase().includes(keyword.toLowerCase())) {
            const startTime = line.start + (config.beatOffset * beatDuration);
            prompts.push({
              id: `p${promptId++}`,
              startTime: startTime,
              endTime: startTime + config.duration,
              emoji: config.emoji,
              lyric: keyword,
            });
          }
        });
      });
    });
  });

  return prompts;
}

export default function TariqRhythmGame({ onComplete }: TariqRhythmGameProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const noteIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef(0);
  const totalTapsRef = useRef(0);
  const correctTapsRef = useRef(0);
  const bestStreakRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activePrompts, setActivePrompts] = useState<RhythmPrompt[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [tappedPrompts, setTappedPrompts] = useState<Set<string>>(new Set());
  const [musicNotes, setMusicNotes] = useState<MusicNote[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Load adaptive settings from diagnostics
  const diagnostics = useMemo(() => loadDiagnostics("student_1", "tariq_711_module"), []);
  const adaptiveSettings = useMemo(() => getRhythmSettings(diagnostics), [diagnostics]);
  
  // Adaptive difficulty state - initialize from diagnostics
  const [consecutiveHits, setConsecutiveHits] = useState(0);
  const [consecutiveMisses, setConsecutiveMisses] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(adaptiveSettings.tempoMultiplier);
  const [currentTempo, setCurrentTempo] = useState<TempoSetting>(diagnostics.adaptive_settings.rhythm_tempo);
  const BASE_NOTE_INTERVAL = NOTE_INTERVAL; // Base interval (4 beats)

  const rhythmPrompts = useMemo(() => generatePromptsFromLyrics(), []);
  const sections = lyricsData.sections as LyricSection[];

  const currentSection = useMemo(() => {
    return sections.find((section) => {
      const sectionEnd = section.lines[section.lines.length - 1]?.end || 0;
      return currentTime >= section.startTime && currentTime <= sectionEnd;
    });
  }, [currentTime, sections]);

  const currentLine = useMemo(() => {
    if (!currentSection) return null;
    return currentSection.lines.find(
      (line) => currentTime >= line.start && currentTime <= line.end
    );
  }, [currentSection, currentTime]);

  const nextLine = useMemo(() => {
    if (!currentSection) return null;
    const currentIdx = currentSection.lines.findIndex(
      (line) => currentTime >= line.start && currentTime <= line.end
    );
    if (currentIdx >= 0 && currentIdx < currentSection.lines.length - 1) {
      return currentSection.lines[currentIdx + 1];
    }
    return null;
  }, [currentSection, currentTime]);

  // Keep refs in sync with state
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  
  useEffect(() => {
    if (streak > bestStreakRef.current) {
      bestStreakRef.current = streak;
    }
  }, [streak]);

  useEffect(() => {
    audioRef.current = new Audio(tariqSongPath);
    audioRef.current.preload = "auto";

    const handleEnded = () => {
      setIsPlaying(false);
      setIsComplete(true);
      // Calculate bonus points based on score (no longer earning stars from rhythm game)
      const bonusPointsEarned = Math.min(50, Math.floor(scoreRef.current / 2));
      
      const totalTaps = totalTapsRef.current;
      const correctTaps = correctTapsRef.current;
      const accuracy = totalTaps > 0 ? Math.round((correctTaps / totalTaps) * 100) : 0;
      
      let feedback = "Keep practicing!";
      if (accuracy >= 90) feedback = "Outstanding rhythm mastery!";
      else if (accuracy >= 75) feedback = "Great rhythm skills!";
      else if (accuracy >= 50) feedback = "Good effort, keep it up!";
      
      const performanceData: PerformanceData = {
        rhythm_accuracy: accuracy,
        total_taps: totalTaps,
        correct_taps: correctTaps,
        feedback: feedback,
      };
      
      setTimeout(() => onComplete(bonusPointsEarned, performanceData, bestStreakRef.current), 1500);
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.pause();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (noteIntervalRef.current) {
        clearInterval(noteIntervalRef.current);
      }
    };
  }, [onComplete]);

  const updateTime = useCallback(() => {
    if (audioRef.current && isPlaying) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);

      // Find ALL prompts that are currently active (not just the first one)
      const currentActivePrompts = rhythmPrompts.filter(
        (p) => time >= p.startTime - 0.5 && time <= p.endTime
      );
      setActivePrompts(currentActivePrompts);

      animationRef.current = requestAnimationFrame(updateTime);
    }
  }, [isPlaying, rhythmPrompts]);

  // Track if we're in an emoji prompt section (to hide music notes during those parts)
  // Added 4.5 second buffer after prompts end before showing notes again
  const isEmojiTime = rhythmPrompts.some(
    (p) => currentTime >= p.startTime - 0.5 && currentTime <= p.endTime + 4.5
  );

  const missedMessages = [
    "Oops, missed that one!",
    "You'll get the next one!",
    "Keep trying!",
    "Almost had it!",
    "Next time!",
  ];

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateTime);
      noteIntervalRef.current = setInterval(() => {
        // Only process notes when NOT in emoji time
        const currentAudioTime = audioRef.current?.currentTime || 0;
        const inEmojiTime = rhythmPrompts.some(
          (p) => currentAudioTime >= p.startTime - 0.5 && currentAudioTime <= p.endTime + 4.5
        );

        if (inEmojiTime) {
          // Clear notes during emoji time, no missed message
          setMusicNotes([]);
          return;
        }

        // Calculate current interval based on speed multiplier
        const currentInterval = BASE_NOTE_INTERVAL / speedMultiplier;
        
        // Check if the current note was missed (existed for more than the current interval)
        setMusicNotes((prev) => {
          if (prev.length > 0) {
            const oldNote = prev[0];
            const noteAge = Date.now() - oldNote.createdAt;
            if (noteAge > currentInterval * 0.9) {
              // Note was missed - track as a total tap attempt (but not correct)
              totalTapsRef.current += 1;
              setConsecutiveHits(0); // Reset hits on miss
              setConsecutiveMisses((prevMisses) => {
                const newMisses = prevMisses + 1;
                // Slow down after 3 consecutive misses (min 0.5x speed)
                if (newMisses >= 3 && speedMultiplier > 0.5) {
                  setSpeedMultiplier((prev) => Math.max(0.5, prev / 2));
                  setShowFeedback("Slowing down...");
                  setTimeout(() => setShowFeedback(null), 600);
                  return 0; // Reset miss counter after speed change
                } else {
                  const randomMissed = missedMessages[Math.floor(Math.random() * missedMessages.length)];
                  setShowFeedback(randomMissed);
                  setTimeout(() => setShowFeedback(null), 600);
                }
                return newMisses;
              });
            }
          }
          return [];
        });

        // Create new single note at center position
        const newNote: MusicNote = {
          id: `note-${Date.now()}-${Math.random()}`,
          x: 40 + Math.random() * 20, // Center area: 40-60%
          y: 40 + Math.random() * 10, // Center zone: 40-50%
          noteType: MUSIC_NOTE_TYPES[Math.floor(Math.random() * MUSIC_NOTE_TYPES.length)],
          createdAt: Date.now(),
        };
        setMusicNotes([newNote]); // Only one note at a time
      }, BASE_NOTE_INTERVAL / speedMultiplier); // Dynamic interval based on speed
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (noteIntervalRef.current) {
        clearInterval(noteIntervalRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (noteIntervalRef.current) {
        clearInterval(noteIntervalRef.current);
      }
    };
  }, [isPlaying, updateTime, speedMultiplier, rhythmPrompts]);

  const startGame = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePromptTap = (prompt: RhythmPrompt) => {
    if (tappedPrompts.has(prompt.id)) return;

    totalTapsRef.current += 1;
    const timeDiff = Math.abs(currentTime - (prompt.startTime + 0.5));
    const isGoodTiming = timeDiff < 1;

    if (isGoodTiming) {
      correctTapsRef.current += 1;
      setTappedPrompts((prev) => new Set(Array.from(prev).concat(prompt.id)));
      setScore((prev) => prev + 10 + streak * 2);
      setStreak((prev) => prev + 1);
      setShowFeedback("Great!");
    } else {
      setStreak(0);
      setShowFeedback("Try again!");
    }

    setTimeout(() => setShowFeedback(null), 800);
  };

  const encouragements = ["Great!", "Nice!", "Keep going!", "Awesome!", "You got it!", "Fantastic!"];
  const speedUpMessages = ["Faster!", "Double time!", "You're on fire!", "Speed up!"];
  
  const handleNoteTap = (noteId: string) => {
    setMusicNotes((prev) => prev.filter((n) => n.id !== noteId));
    setConsecutiveMisses(0); // Reset misses on successful tap
    
    totalTapsRef.current += 1;
    correctTapsRef.current += 1;
    
    const newHits = consecutiveHits + 1;
    setConsecutiveHits(newHits);
    
    // Speed up after 4 consecutive hits (max 2x speed)
    if (newHits >= 4 && speedMultiplier < 2) {
      setSpeedMultiplier((prev) => Math.min(2, prev * 2));
      setConsecutiveHits(0); // Reset counter after speed change
      const speedMsg = speedUpMessages[Math.floor(Math.random() * speedUpMessages.length)];
      setShowFeedback(speedMsg);
    } else {
      const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      setShowFeedback(randomEncouragement);
    }
    setTimeout(() => setShowFeedback(null), 500);
  };

  const emojiButtons = [
    { emoji: "⛵️", lyric: "Across the sea" },
    { emoji: "📍", lyric: "To Spain" },
    { emoji: "🗺️", lyric: "We go!" },
  ];

  if (!isPlaying && !isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg">
          <img 
            src={tariqAvatarPath} 
            alt="Tariq ibn Ziyad" 
            className="w-full h-full object-cover"
            data-testid="img-tariq-avatar"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {lyricsData.title}
          </h2>
          <p className="text-muted-foreground mb-4">
            Sing along and tap the symbols when they glow!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {emojiButtons.map((item) => (
              <div key={item.emoji} className="flex flex-col items-center">
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs text-muted-foreground">"{item.lyric}"</span>
              </div>
            ))}
          </div>
        </div>
        <Button
          size="lg"
          onClick={startGame}
          className="rounded-full px-8"
          data-testid="button-start-rhythm"
        >
          <Music className="w-5 h-5 mr-2" />
          Start Song
        </Button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg mx-auto mb-4">
            <img 
              src={tariqAvatarPath} 
              alt="Tariq ibn Ziyad" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Amazing Job!
          </h2>
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(Math.min(5, Math.floor(score / 20) + 1))].map((_, i) => (
              <Star
                key={i}
                className="w-10 h-10 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <p className="text-xl text-muted-foreground">
            Score: {score} points
          </p>
          <p className="text-lg text-muted-foreground">
            Best streak: {streak} in a row!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[500px] bg-gradient-to-b from-sky-200 to-blue-300 dark:from-sky-800 dark:to-blue-900 rounded-3xl overflow-hidden p-4">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 bg-white/80 dark:bg-black/50 rounded-full px-4 py-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold text-foreground">{score}</span>
        </div>
        {currentSection && (
          <Badge variant="secondary" className="bg-white/80 dark:bg-black/50">
            {currentSection.arrangement}
          </Badge>
        )}
        {streak > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-orange-400 text-white rounded-full px-4 py-2 font-bold"
          >
            {streak}x Streak!
          </motion.div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleMute}
          className="bg-white/80 dark:bg-black/50 rounded-full"
          data-testid="button-mute"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>

      <div className="absolute top-20 left-4 right-4 z-10" data-testid="karaoke-display">
        <AnimatePresence mode="wait">
          {currentLine && (
            <motion.div
              key={currentLine.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="bg-white/90 dark:bg-black/70 rounded-2xl px-6 py-4 inline-block">
                <motion.p
                  className="text-xl font-bold text-foreground"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  {currentLine.text}
                </motion.p>
                {currentLine.echo && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-muted-foreground italic mt-1"
                  >
                    ({currentLine.echo})
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {nextLine && !currentLine && (
          <div className="text-center mt-2">
            <span className="text-sm text-muted-foreground/60">
              Coming up: {nextLine.text}
            </span>
          </div>
        )}
      </div>

      {!isEmojiTime && (
        <AnimatePresence>
          {musicNotes.map((note) => (
            <motion.button
              type="button"
              key={note.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => handleNoteTap(note.id)}
              className="absolute cursor-pointer hover:scale-110 transition-transform z-5 text-sky-600 dark:text-sky-300"
              style={{ left: `${note.x}%`, top: `${note.y}%` }}
              data-testid={`button-note-${note.id}`}
            >
              <MusicNoteIcon type={note.noteType} className="w-10 h-10" />
            </motion.button>
          ))}
        </AnimatePresence>
      )}

      <div className="absolute bottom-20 left-0 right-0 flex flex-wrap justify-center gap-4 px-4">
        {emojiButtons.map((item) => {
          // Find the active prompt for this specific emoji (if any)
          const prompt = activePrompts.find((p) => p.emoji === item.emoji && !tappedPrompts.has(p.id)) || null;
          const isTapped = activePrompts.some((p) => p.emoji === item.emoji && tappedPrompts.has(p.id));

          return (
            <motion.button
              type="button"
              key={item.emoji}
              onClick={() => prompt && handlePromptTap(prompt)}
              animate={
                prompt && !isTapped
                  ? {
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(255,215,0,0)",
                        "0 0 20px 10px rgba(255,215,0,0.5)",
                        "0 0 0 0 rgba(255,215,0,0)",
                      ],
                    }
                  : {}
              }
              transition={{ repeat: prompt && !isTapped ? Infinity : 0, duration: 0.6 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
                prompt && !isTapped
                  ? "bg-yellow-300 dark:bg-yellow-500 shadow-lg"
                  : isTapped
                  ? "bg-green-300 dark:bg-green-600"
                  : "bg-white/50 dark:bg-white/20"
              }`}
              disabled={!prompt || !!isTapped}
              data-testid={`button-emoji-${item.emoji}`}
            >
              {item.emoji}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white drop-shadow-lg z-20"
          >
            {showFeedback}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="bg-white/60 dark:bg-black/40 rounded-full px-4 py-1 inline-block">
          <span className="text-sm text-muted-foreground">
            {Math.floor(currentTime)}s / ~115s
          </span>
        </div>
      </div>
    </div>
  );
}
