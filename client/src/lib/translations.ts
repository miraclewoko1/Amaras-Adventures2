export type Language = 'en' | 'ko';

export interface Translations {
  // Common UI
  restart: string;
  level: string;
  stars: string;
  completed: string;
  back: string;
  chooseLevel: string;
  
  // Home page
  welcomeBack: string;
  welcomeNew: string;
  adventuresCompleted: string;
  letsKeepLearning: string;
  pickAdventure: string;
  mathAdventure: string;
  countSortSolve: string;
  historyAdventure: string;
  meetHeroes: string;
  adventureMode: string;
  worldProgress: string;
  math: string;
  history: string;
  adventure: string;
  parentInsights: string;
  progressFolder: string;
  notStarted: string;
  noProgressYet: string;
  completeHistory: string;
  rhythm: string;
  art: string;
  reflection: string;
  myArtwork: string;
  howIFelt: string;
  sessions: string;
  bestRhythm: string;
  badges: string;
  bonusPoints: string;
  rhythmGame: string;
  levelProgress: string;
  startAdventureInsight: string;
  allCompleteInsight: string;
  mathProgressInsight: string;
  historyProgressInsight: string;
  amazingProgressInsight: string;
  excellentProgressInsight: string;
  goodStartInsight: string;
  adventuresCompletedInsight: string;
  explorer: string;
  navigator: string;
  voyager: string;
  captain: string;
  copyright: string;
  pageTitle: string;
  
  // Math World
  mathWorldWelcome: string;
  mathWorldComplete: string;
  mathWorldProgress: string;
  
  // History World
  historyWorldWelcome: string;
  historyWorldComplete: string;
  historyWorldProgress: string;
  
  // Era Info
  moorsTitle: string;
  moorsDescription: string;
  innovatorsTitle: string;
  innovatorsDescription: string;
  pioneersTitle: string;
  pioneersDescription: string;
  
  // Math Level titles
  counting: string;
  shapes: string;
  patterns: string;
  sorting: string;
  comparing: string;
  
  // Game UI
  tapToContinue: string;
  correct: string;
  tryAgain: string;
  greatJob: string;
  levelComplete: string;
  starsEarned: string;
  nextLevel: string;
  backToWorld: string;
  startGame: string;
  playAgain: string;
  letsGo: string;
  
  // Adventure Mode
  adventureWelcome: string;
  adventureComplete: string;
  adventureProgress: string;
  
  // History figures
  tariqIbnZiyad: string;
  tariqDescription: string;
  
  // Instructions
  listenToStory: string;
  watchAndLearn: string;
  yourTurn: string;
  
  // Level UI
  checkMyAnswer: string;
  finish: string;
  amazingCorrect: string;
  oopsTryAgain: string;
  wonderfulJob: string;
  nextAdventure: string;
  animals: string;
  sounds: string;
  levelNotFound: string;
  help: string;
  learnedAbout: string;
  
  // Math Level Instructions
  mathL1Instruction: string;
  mathL2Instruction: string;
  mathL3Instruction: string;
  mathL4Instruction: string;
  mathL5Instruction: string;
  mathL6Instruction: string;
  mathL7Instruction: string;
  mathL8Instruction: string;
  mathL9Instruction: string;
  mathL10Instruction: string;
  
  // Adventure Level Content
  advL1Title: string;
  advL1Instruction: string;
  advL2Title: string;
  advL2Instruction: string;
  advL3Title: string;
  advL3Instruction: string;
  advL4Title: string;
  advL4Instruction: string;
  advL5Title: string;
  advL5Instruction: string;
  
  // Adventure Drag/Match Labels
  round: string;
  square: string;
  pointy: string;
  circle: string;
  triangle: string;
  red: string;
  yellow: string;
  purple: string;
  apple: string;
  banana: string;
  grapes: string;
  woof: string;
  meow: string;
  moo: string;
  
  // History Level Content
  histL1Greeting: string;
  histL1Activity: string;
  tariqJourneyTitle: string;
  tariqJourneyIntro: string;
  tariqJourneyDesc: string;
  startAdventure: string;
  tariqArtPrompt: string;
  tariqReflectionPrompt: string;
  histL2Greeting: string;
  histL2Activity: string;
  histL3Greeting: string;
  histL3Activity: string;
  histL4Greeting: string;
  histL4Activity: string;
  histL5Greeting: string;
  histL5Activity: string;
  histL6Greeting: string;
  histL6Activity: string;
  histL7Greeting: string;
  histL7Activity: string;
  histL8Greeting: string;
  histL8Activity: string;
  histL9Greeting: string;
  histL9Activity: string;
  histL10Greeting: string;
  histL10Activity: string;
  
  // History Figure Names/Titles
  tariqTitle: string;
  abdAlRahmanName: string;
  abdAlRahmanTitle: string;
  averroesName: string;
  averroesTitle: string;
  paulJohnName: string;
  paulJohnTitle: string;
  maryGoldaName: string;
  maryGoldaTitle: string;
  williamName: string;
  williamTitle: string;
  maryKennerName: string;
  maryKennerTitle: string;
  kingSejongName: string;
  kingSejongTitle: string;
  ameliaName: string;
  ameliaTitle: string;
  hiddenFiguresName: string;
  hiddenFiguresTitle: string;
  
  // Drag Match Labels
  sun: string;
  moon: string;
  star: string;
  welcomeToSpain: string;
  hello: string;
  thankYouVeryMuch: string;
  howAreYou: string;
  
  // Level 7 Invention Labels
  vacuum: string;
  lawnMower: string;
  toaster: string;
  sprinkler: string;
  
  // History Level Titles
  histL1LevelTitle: string;
  histL1LevelDesc: string;
  histL2LevelTitle: string;
  histL2LevelDesc: string;
  histL3LevelTitle: string;
  histL3LevelDesc: string;
  histL4LevelTitle: string;
  histL4LevelDesc: string;
  histL5LevelTitle: string;
  histL5LevelDesc: string;
  histL6LevelTitle: string;
  histL6LevelDesc: string;
  histL7LevelTitle: string;
  histL7LevelDesc: string;
  histL8LevelTitle: string;
  histL8LevelDesc: string;
  histL9LevelTitle: string;
  histL9LevelDesc: string;
  histL10LevelTitle: string;
  histL10LevelDesc: string;
  
  // Math Level Titles
  mathL1LevelTitle: string;
  mathL1LevelDesc: string;
  mathL2LevelTitle: string;
  mathL2LevelDesc: string;
  mathL3LevelTitle: string;
  mathL3LevelDesc: string;
  mathL4LevelTitle: string;
  mathL4LevelDesc: string;
  mathL5LevelTitle: string;
  mathL5LevelDesc: string;
  mathL6LevelTitle: string;
  mathL6LevelDesc: string;
  mathL7LevelTitle: string;
  mathL7LevelDesc: string;
  mathL8LevelTitle: string;
  mathL8LevelDesc: string;
  mathL9LevelTitle: string;
  mathL9LevelDesc: string;
  mathL10LevelTitle: string;
  mathL10LevelDesc: string;
  
  // Badges
  badgeRhythmRookie: string;
  badgeRhythmRookieDesc: string;
  badgeRhythmMaster: string;
  badgeRhythmMasterDesc: string;
  badgeSpeedRacer: string;
  badgeSpeedRacerDesc: string;
  badgeArtExplorer: string;
  badgeArtExplorerDesc: string;
  badgeCreativeGenius: string;
  badgeCreativeGeniusDesc: string;
  badgeDeepThinker: string;
  badgeDeepThinkerDesc: string;
  badgeEmpathyStar: string;
  badgeEmpathyStarDesc: string;
  badgeVoyager: string;
  badgeVoyagerDesc: string;
  badgeCaptain: string;
  badgeCaptainDesc: string;
  earnedBadges: string;
  
  // Bonus Quest
  bonusQuest: string;
  bonusQuestWelcome: string;
  bonusQuestAmazing: string;
  bonusQuestGreat: string;
  bonusQuestGood: string;
  bonusQuestNote: string;
  bonusQuestGame: string;
  playBonusQuest: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Common UI
    restart: "Restart",
    level: "Level",
    stars: "Stars",
    completed: "completed",
    back: "Back",
    chooseLevel: "Choose Your Level",
    
    // Home page
    welcomeBack: "Welcome back! You've completed",
    welcomeNew: "Hi! I'm Princess Amara! Pick an adventure with me and my friends!",
    adventuresCompleted: "adventures",
    letsKeepLearning: "Let's keep learning!",
    pickAdventure: "Pick an adventure with me and my friends!",
    mathAdventure: "Math Adventure",
    countSortSolve: "Count, sort, and solve puzzles!",
    historyAdventure: "History Adventure",
    meetHeroes: "Meet amazing heroes from the past!",
    adventureMode: "Adventure Mode",
    worldProgress: "World Progress",
    math: "Math",
    history: "History",
    adventure: "Adventure",
    parentInsights: "Parent Insights",
    progressFolder: "Progress Folder",
    notStarted: "Not Started",
    noProgressYet: "No progress yet",
    completeHistory: "Complete a History Adventure to see your work here!",
    rhythm: "Rhythm",
    art: "Art",
    reflection: "Reflection",
    myArtwork: "My Artwork",
    howIFelt: "How I Felt",
    sessions: "Sessions",
    bestRhythm: "Best Rhythm",
    badges: "Badges",
    bonusPoints: "Bonus Points",
    rhythmGame: "Rhythm Game",
    levelProgress: "Level {current} / {total}",
    startAdventureInsight: "Start an adventure to see insights about your child's learning progress!",
    allCompleteInsight: "Amazing! 25 adventures completed with 100 stars earned!",
    mathProgressInsight: "Great progress in Math ({count} levels)! Consider exploring more History adventures.",
    historyProgressInsight: "Great progress in History ({count} levels)! Consider exploring more Math adventures.",
    amazingProgressInsight: "Amazing! {count} adventures completed with {stars} stars earned!",
    excellentProgressInsight: "Excellent progress! {count} adventures completed. Keep up the great work!",
    goodStartInsight: "Good start! {count} adventures completed. Your child is learning well!",
    adventuresCompletedInsight: "{count} adventure(s) completed so far. Every step counts!",
    explorer: "Explorer",
    navigator: "Navigator",
    voyager: "Voyager",
    captain: "Captain",
    copyright: "© EDUNIPLAY 2025",
    pageTitle: "Princess Amara's Learning Adventures",
    
    // Math World
    mathWorldWelcome: "Welcome to Math World! Let's count, sort, and solve puzzles together!",
    mathWorldComplete: "Amazing! You finished all the math adventures!",
    mathWorldProgress: "Great job! You've completed {count} math adventures. Keep going!",
    
    // History World
    historyWorldWelcome: "Welcome to History World! Let's meet amazing heroes from the past!",
    historyWorldComplete: "Wow! You've met all the historical heroes!",
    historyWorldProgress: "Fantastic! You've completed {count} history adventures. Who will you meet next?",
    
    // Era Info
    moorsTitle: "The Moors",
    moorsDescription: "Meet brilliant scholars and builders!",
    innovatorsTitle: "Native American & African Innovators",
    innovatorsDescription: "Discover amazing inventors and scientists!",
    pioneersTitle: "Asian Navigators & Women Pioneers",
    pioneersDescription: "Explore with brave explorers and mathematicians!",
    
    // Math Level titles
    counting: "Counting",
    shapes: "Shapes",
    patterns: "Patterns",
    sorting: "Sorting",
    comparing: "Comparing",
    
    // Game UI
    tapToContinue: "Tap to continue",
    correct: "Correct!",
    tryAgain: "Try again!",
    greatJob: "Great job!",
    levelComplete: "Level Complete!",
    starsEarned: "Stars Earned",
    nextLevel: "Next Level",
    backToWorld: "Back to World",
    startGame: "Start Game",
    playAgain: "Play Again",
    letsGo: "Let's Go!",
    
    // Adventure Mode
    adventureWelcome: "Welcome to Adventure Mode! Explore exciting challenges!",
    adventureComplete: "You completed the adventure!",
    adventureProgress: "Keep exploring! You've completed {count} adventures.",
    
    // History figures
    tariqIbnZiyad: "Tariq ibn Ziyad",
    tariqDescription: "A brave general who led the Moors to new lands in 711 CE",
    
    // Instructions
    listenToStory: "Listen to the story",
    watchAndLearn: "Watch and learn",
    yourTurn: "Your turn!",
    
    // Level UI
    checkMyAnswer: "Check My Answer!",
    finish: "Finish!",
    amazingCorrect: "Amazing! You got it right!",
    oopsTryAgain: "Oops! Try again, you can do it!",
    wonderfulJob: "Wonderful job! You did it!",
    nextAdventure: "Next Adventure",
    animals: "Animals",
    sounds: "Sounds",
    levelNotFound: "Level not found",
    help: "Help",
    learnedAbout: "Amazing! You learned about",
    
    // Math Level Instructions
    mathL1Instruction: "How many apples do you see?",
    mathL2Instruction: "Tap all the blue circles!",
    mathL3Instruction: "What comes next in the pattern?",
    mathL4Instruction: "What number is missing?",
    mathL5Instruction: "How many dogs do you see?",
    mathL6Instruction: "Which cup is medium sized? Tap it!",
    mathL7Instruction: "Cut the pizza in half. How many pieces?",
    mathL8Instruction: "Tap stars in order: 4 stars, 3 stars, 2 stars",
    mathL9Instruction: "Sort by size (use logic): Tap from biggest to smallest!",
    mathL10Instruction: "Select any number of crates that add up to 1 whole.",
    
    // Adventure Level Content
    advL1Title: "Sort the Shapes",
    advL1Instruction: "Help Princess Amara sort the shapes into their homes!",
    advL2Title: "Star Collector",
    advL2Instruction: "Tap all the stars to collect them!",
    advL3Title: "Number Journey",
    advL3Instruction: "Tap the numbers in order from 1 to 5!",
    advL4Title: "Animal Sounds",
    advL4Instruction: "Match each animal to its sound!",
    advL5Title: "Fruit Basket",
    advL5Instruction: "Put each fruit in the right colored basket!",
    
    // Adventure Drag/Match Labels
    round: "Round",
    square: "Square",
    pointy: "Pointy",
    circle: "Circle",
    triangle: "Triangle",
    red: "Red",
    yellow: "Yellow",
    purple: "Purple",
    apple: "Apple",
    banana: "Banana",
    grapes: "Grapes",
    woof: "Woof!",
    meow: "Meow!",
    moo: "Moo!",
    
    // History Level Content
    histL1Greeting: "Hello young explorer! I led a daring journey across the sea to Spain. Can you help me trace the steps of my adventure?",
    histL1Activity: "Show the numbered steps to reach Spain!",
    tariqJourneyTitle: "Tariq's Journey to Spain",
    tariqJourneyIntro: "Let's learn about Tariq ibn Ziyad! He was a brave leader who sailed across the sea to Spain. Listen to the song and tap along!",
    tariqJourneyDesc: "Over 1,300 years ago, Tariq ibn Ziyad led ships across the sea from Africa to Spain. The famous Rock of Gibraltar is named after him - \"Jabal Tariq\" means \"Mountain of Tariq\"!",
    startAdventure: "Start the Adventure!",
    tariqArtPrompt: "Great job with the song! Now let's draw the Mountain of Gibraltar!",
    tariqReflectionPrompt: "Beautiful artwork! Now let's think about how different people felt during this adventure.",
    histL2Greeting: "Welcome! I built grand palaces and gardens in Córdoba. Let's design something amazing together!",
    histL2Activity: "Build the courtyard! Tap in order: Palace, Trees, Fountain!",
    histL3Greeting: "Thinking is my favorite thing! I studied science and philosophy. Can you find which ones are IDEAS?",
    histL3Activity: "Tap all the IDEAS (not tools)!",
    histL4Greeting: "Engineers love patterns! I helped design spacecraft. Let's put these pieces in order for launch!",
    histL4Activity: "Arrange for launch: Rocket, Satellite, then Star!",
    histL5Greeting: "Waqaa! The Yup'ik language is beautiful. Let me teach you some words and phrases we use every day. These are the words my parents taught me, and I taught my children and grandchildren. Now I share them with you.",
    histL5Activity: "Drag each Yup'ik word to its English meaning!",
    histL6Greeting: "Meet the inventor who brought his own spin to a bright idea! I built a windmill from scrap to bring electricity to my village!",
    histL6Activity: "Build the windmill! Tap in order: Gears, Bolts, then Wind!",
    histL7Greeting: "I invented clever tools like the sanitary belt and tissue holder. Can you find the inventions used INSIDE the home?",
    histL7Activity: "Tap only the inventions used INSIDE the home!",
    histL8Greeting: "I created Hangul so everyone could read and write! Let's learn the sounds together!",
    histL8Activity: "Drag each letter to its sound!",
    histL9Greeting: "I flew across oceans! Help me trace my flight path around the world!",
    histL9Activity: "Trace the flight! Tap in order: Plane, Ocean, then World!",
    histL10Greeting: "We used math to send astronauts to space! Let's count down together!",
    histL10Activity: "Tap the countdown in order: 3, 2, 1, then Rocket!",
    
    // History Figure Names/Titles
    tariqTitle: "Great General & Explorer",
    abdAlRahmanName: "Abd al-Rahman I",
    abdAlRahmanTitle: "The Builder King",
    averroesName: "Averroes",
    averroesTitle: "The Great Philosopher",
    paulJohnName: "Paul Joseph John",
    paulJohnTitle: "Yup'ik Elder and Cultural Leader",
    maryGoldaName: "Mary Golda Ross",
    maryGoldaTitle: "First Native American Female Engineer",
    williamName: "William Kamkwamba",
    williamTitle: "The Boy Who Harnessed a Win",
    maryKennerName: "Mary Beatrice Davidson Kenner",
    maryKennerTitle: "Brilliant Inventor",
    kingSejongName: "King Sejong",
    kingSejongTitle: "The Great King of Korea",
    ameliaName: "Amelia Earhart",
    ameliaTitle: "Brave Pilot & Explorer",
    hiddenFiguresName: "Obvious Figures",
    hiddenFiguresTitle: "No Calculator Needed: Meet NASA's Human Computers",
    
    // Drag Match Labels
    sun: "Sun",
    moon: "Moon",
    star: "Star",
    welcomeToSpain: "Welcome to Spain",
    hello: "Hello!",
    thankYouVeryMuch: "Thank you very much!",
    howAreYou: "How are you?",
    
    // Level 7 Invention Labels
    vacuum: "Vacuum",
    lawnMower: "Lawn Mower",
    toaster: "Toaster",
    sprinkler: "Sprinkler",
    
    // History Level Titles
    histL1LevelTitle: "Meet Tariq",
    histL1LevelDesc: "Help Tariq with his ships!",
    histL2LevelTitle: "Build with Abd al-Rahman",
    histL2LevelDesc: "Build a beautiful courtyard!",
    histL3LevelTitle: "Think with Averroes",
    histL3LevelDesc: "Ideas or tools?",
    histL4LevelTitle: "Space Engineer",
    histL4LevelDesc: "Engineers love patterns!",
    histL5LevelTitle: "Yup'ik Words",
    histL5LevelDesc: "Learn with Paul!",
    histL6LevelTitle: "Build a Windmill",
    histL6LevelDesc: "His own spin on a bright idea!",
    histL7LevelTitle: "Sort Inventions",
    histL7LevelDesc: "Home or outdoors?",
    histL8LevelTitle: "Learn Hangul",
    histL8LevelDesc: "Match sounds and shapes!",
    histL9LevelTitle: "Fly with Amelia",
    histL9LevelDesc: "Trace the flight path!",
    histL10LevelTitle: "Launch the Rocket",
    histL10LevelDesc: "Count to liftoff!",
    
    // Math Level Titles
    mathL1LevelTitle: "Counting Fruit",
    mathL1LevelDesc: "Count the yummy fruits!",
    mathL2LevelTitle: "Sorting Shapes",
    mathL2LevelDesc: "Put shapes where they belong!",
    mathL3LevelTitle: "Matching Patterns",
    mathL3LevelDesc: "Find the pattern!",
    mathL4LevelTitle: "Complete the Sequence",
    mathL4LevelDesc: "What comes next?",
    mathL5LevelTitle: "Counting Animals",
    mathL5LevelDesc: "Count the cute animals!",
    mathL6LevelTitle: "Pour the Water",
    mathL6LevelDesc: "Fill the right cup!",
    mathL7LevelTitle: "Cut in Half",
    mathL7LevelDesc: "Learn about fractions!",
    mathL8LevelTitle: "Match Numbers",
    mathL8LevelDesc: "Numbers and groups!",
    mathL9LevelTitle: "Sort by Size",
    mathL9LevelDesc: "Big, medium, small!",
    mathL10LevelTitle: "Math Challenge",
    mathL10LevelDesc: "Use all your skills!",
    
    // Badges
    badgeRhythmRookie: "Rhythm Rookie",
    badgeRhythmRookieDesc: "Completed your first rhythm activity!",
    badgeRhythmMaster: "Rhythm Master",
    badgeRhythmMasterDesc: "Achieved 80%+ accuracy in rhythm!",
    badgeSpeedRacer: "Speed Racer",
    badgeSpeedRacerDesc: "Played at fast tempo!",
    badgeArtExplorer: "Art Explorer",
    badgeArtExplorerDesc: "Used 3+ different art elements!",
    badgeCreativeGenius: "Creative Genius",
    badgeCreativeGeniusDesc: "Unlocked advanced art tools!",
    badgeDeepThinker: "Deep Thinker",
    badgeDeepThinkerDesc: "Wrote a thoughtful reflection!",
    badgeEmpathyStar: "Empathy Star",
    badgeEmpathyStarDesc: "Explored multiple perspectives!",
    badgeVoyager: "Voyager",
    badgeVoyagerDesc: "Reached proficient growth level!",
    badgeCaptain: "Captain",
    badgeCaptainDesc: "Achieved advanced growth level!",
    earnedBadges: "Earned Badges:",
    
    // Bonus Quest
    bonusQuest: "Bonus Quest",
    bonusQuestWelcome: "Let's go on a special adventure together! Help me collect books, stars, and hearts!",
    bonusQuestAmazing: "Amazing! You collected so many treasures!",
    bonusQuestGreat: "Great job helping me collect treasures!",
    bonusQuestGood: "Good effort! Want to try again?",
    bonusQuestNote: "Your best score will be saved to your progress folder!",
    bonusQuestGame: "Bonus Quest Game",
    playBonusQuest: "Play Bonus Quest",
  },
  ko: {
    // Common UI
    restart: "다시 시작",
    level: "레벨",
    stars: "별",
    completed: "완료",
    back: "뒤로",
    chooseLevel: "레벨을 선택하세요",
    
    // Home page
    welcomeBack: "다시 오셨네요!",
    welcomeNew: "안녕! 나는 아마라 공주야! 나와 친구들과 함께 모험을 떠나자!",
    adventuresCompleted: "개의 모험을 완료했어요",
    letsKeepLearning: "계속 배워봐요!",
    pickAdventure: "나와 친구들과 함께 모험을 골라봐!",
    mathAdventure: "수학 모험",
    countSortSolve: "세고, 정리하고, 퍼즐을 풀어봐요!",
    historyAdventure: "역사 모험",
    meetHeroes: "과거의 놀라운 영웅들을 만나봐요!",
    adventureMode: "모험 모드",
    worldProgress: "세계 진행 상황",
    math: "수학",
    history: "역사",
    adventure: "모험",
    parentInsights: "부모님 인사이트",
    progressFolder: "진행 폴더",
    notStarted: "시작 안 함",
    noProgressYet: "아직 진행 없음",
    completeHistory: "여기서 작업을 보려면 역사 모험을 완료하세요!",
    rhythm: "리듬",
    art: "예술",
    reflection: "반성",
    myArtwork: "내 작품",
    howIFelt: "내 기분",
    sessions: "세션",
    bestRhythm: "최고 리듬",
    badges: "배지",
    bonusPoints: "보너스 점수",
    rhythmGame: "리듬 게임",
    levelProgress: "레벨 {current} / {total}",
    startAdventureInsight: "아이의 학습 진행 상황을 보려면 모험을 시작하세요!",
    allCompleteInsight: "대단해요! 25개 모험 완료, 100개 별 획득!",
    mathProgressInsight: "수학 진행 상황이 좋아요 ({count}레벨)! 역사 모험도 탐험해 보세요.",
    historyProgressInsight: "역사 진행 상황이 좋아요 ({count}레벨)! 수학 모험도 탐험해 보세요.",
    amazingProgressInsight: "대단해요! {count}개 모험 완료, {stars}개 별 획득!",
    excellentProgressInsight: "훌륭한 진행! {count}개 모험 완료. 계속 잘하고 있어요!",
    goodStartInsight: "좋은 시작! {count}개 모험 완료. 아이가 잘 배우고 있어요!",
    adventuresCompletedInsight: "지금까지 {count}개 모험 완료. 모든 걸음이 중요해요!",
    explorer: "탐험가",
    navigator: "항해사",
    voyager: "여행자",
    captain: "선장",
    copyright: "© 에듀니플레이 2025",
    pageTitle: "아마라 공주의 학습 모험",
    
    // Math World
    mathWorldWelcome: "수학 세계에 오신 것을 환영합니다! 함께 세고, 정리하고, 퍼즐을 풀어봐요!",
    mathWorldComplete: "놀라워요! 모든 수학 모험을 완료했어요!",
    mathWorldProgress: "잘했어요! {count}개의 수학 모험을 완료했어요. 계속 해봐요!",
    
    // History World
    historyWorldWelcome: "역사 세계에 오신 것을 환영합니다! 과거의 놀라운 영웅들을 만나봐요!",
    historyWorldComplete: "와! 모든 역사 영웅들을 만났어요!",
    historyWorldProgress: "환상적이에요! {count}개의 역사 모험을 완료했어요. 다음에 누구를 만날까요?",
    
    // Era Info
    moorsTitle: "무어인",
    moorsDescription: "뛰어난 학자와 건축가를 만나봐요!",
    innovatorsTitle: "아메리카 원주민과 아프리카 혁신가",
    innovatorsDescription: "놀라운 발명가와 과학자를 발견하세요!",
    pioneersTitle: "아시아 항해사와 여성 개척자",
    pioneersDescription: "용감한 탐험가와 수학자들과 함께 탐험하세요!",
    
    // Math Level titles
    counting: "세기",
    shapes: "도형",
    patterns: "패턴",
    sorting: "분류",
    comparing: "비교",
    
    // Game UI
    tapToContinue: "계속하려면 탭하세요",
    correct: "정답!",
    tryAgain: "다시 해봐요!",
    greatJob: "잘했어요!",
    levelComplete: "레벨 완료!",
    starsEarned: "획득한 별",
    nextLevel: "다음 레벨",
    backToWorld: "세계로 돌아가기",
    startGame: "게임 시작",
    playAgain: "다시 하기",
    letsGo: "시작하자!",
    
    // Adventure Mode
    adventureWelcome: "모험 모드에 오신 것을 환영합니다! 신나는 도전을 탐험하세요!",
    adventureComplete: "모험을 완료했어요!",
    adventureProgress: "계속 탐험하세요! {count}개의 모험을 완료했어요.",
    
    // History figures
    tariqIbnZiyad: "타리크 이븐 지야드",
    tariqDescription: "711년에 무어인을 이끌고 새로운 땅으로 간 용감한 장군",
    
    // Instructions
    listenToStory: "이야기를 들어보세요",
    watchAndLearn: "보고 배우세요",
    yourTurn: "네 차례야!",
    
    // Level UI
    checkMyAnswer: "정답 확인!",
    finish: "완료!",
    amazingCorrect: "대단해! 정답이야!",
    oopsTryAgain: "앗! 다시 해봐, 할 수 있어!",
    wonderfulJob: "정말 잘했어! 해냈어!",
    nextAdventure: "다음 모험",
    animals: "동물",
    sounds: "소리",
    levelNotFound: "레벨을 찾을 수 없어요",
    help: "도움말",
    learnedAbout: "대단해! 배운 사람:",
    
    // Math Level Instructions
    mathL1Instruction: "사과가 몇 개 보이나요?",
    mathL2Instruction: "파란색 원을 모두 탭하세요!",
    mathL3Instruction: "패턴에서 다음에 오는 것은 무엇인가요?",
    mathL4Instruction: "빠진 숫자는 무엇인가요?",
    mathL5Instruction: "강아지가 몇 마리 보이나요?",
    mathL6Instruction: "중간 크기의 컵은 어느 것인가요? 탭하세요!",
    mathL7Instruction: "피자를 반으로 자르면 몇 조각이 될까요?",
    mathL8Instruction: "순서대로 별을 탭하세요: 별 4개, 별 3개, 별 2개",
    mathL9Instruction: "크기 순서대로 (논리 사용): 가장 큰 것부터 가장 작은 것까지 탭하세요!",
    mathL10Instruction: "합이 1이 되는 상자들을 선택하세요.",
    
    // Adventure Level Content
    advL1Title: "도형 정리하기",
    advL1Instruction: "아마라 공주가 도형을 집에 정리하는 것을 도와주세요!",
    advL2Title: "별 모으기",
    advL2Instruction: "별을 모두 탭해서 모으세요!",
    advL3Title: "숫자 여행",
    advL3Instruction: "1부터 5까지 순서대로 숫자를 탭하세요!",
    advL4Title: "동물 소리",
    advL4Instruction: "각 동물을 소리와 맞춰보세요!",
    advL5Title: "과일 바구니",
    advL5Instruction: "각 과일을 맞는 색깔 바구니에 넣으세요!",
    
    // Adventure Drag/Match Labels
    round: "둥근",
    square: "네모",
    pointy: "뾰족한",
    circle: "원",
    triangle: "삼각형",
    red: "빨강",
    yellow: "노랑",
    purple: "보라",
    apple: "사과",
    banana: "바나나",
    grapes: "포도",
    woof: "멍멍!",
    meow: "야옹!",
    moo: "음메!",
    
    // History Level Content
    histL1Greeting: "안녕, 젊은 탐험가! 나는 바다를 건너 스페인으로 대담한 여행을 했어. 내 모험의 발자취를 따라가 볼래?",
    histL1Activity: "스페인에 도달하는 단계를 순서대로 보여주세요!",
    tariqJourneyTitle: "타리크의 스페인 여행",
    tariqJourneyIntro: "타리크 이븐 지야드에 대해 배워봐요! 그는 바다를 건너 스페인으로 항해한 용감한 지도자였어요. 노래를 듣고 함께 박자를 맞춰봐요!",
    tariqJourneyDesc: "1,300년 전, 타리크 이븐 지야드는 아프리카에서 스페인으로 배를 이끌었어요. 유명한 지브롤터 바위는 그의 이름을 따서 지어졌어요 - \"자발 타리크\"는 \"타리크의 산\"이라는 뜻이에요!",
    startAdventure: "모험 시작!",
    tariqArtPrompt: "노래 잘 했어요! 이제 지브롤터 산을 그려봐요!",
    tariqReflectionPrompt: "아름다운 그림이에요! 이제 이 모험에서 사람들이 어떻게 느꼈는지 생각해봐요.",
    histL2Greeting: "환영해요! 나는 코르도바에 웅장한 궁전과 정원을 지었어요. 함께 멋진 것을 디자인해봐요!",
    histL2Activity: "정원을 만들어요! 순서대로 탭하세요: 궁전, 나무, 분수!",
    histL3Greeting: "생각하는 것이 내가 가장 좋아하는 일이에요! 나는 과학과 철학을 공부했어요. 어떤 것이 아이디어인지 찾을 수 있나요?",
    histL3Activity: "아이디어만 탭하세요 (도구가 아닌)!",
    histL4Greeting: "엔지니어는 패턴을 좋아해요! 나는 우주선 설계를 도왔어요. 발사를 위해 이 조각들을 순서대로 놓아봐요!",
    histL4Activity: "발사 준비: 로켓, 위성, 그리고 별 순서로!",
    histL5Greeting: "와카! 유픽 언어는 아름다워요. 매일 사용하는 단어와 문구를 가르쳐 드릴게요. 이것은 부모님이 저에게 가르쳐 주신 단어들이고, 저는 자녀들과 손자들에게 가르쳤어요. 이제 여러분과 나누고 싶어요.",
    histL5Activity: "각 유픽 단어를 영어 의미로 드래그하세요!",
    histL6Greeting: "밝은 아이디어를 가진 발명가를 만나보세요! 나는 마을에 전기를 공급하기 위해 폐품으로 풍차를 만들었어요!",
    histL6Activity: "풍차를 만들어요! 순서대로 탭하세요: 기어, 볼트, 바람!",
    histL7Greeting: "나는 위생 벨트와 휴지 홀더 같은 똑똑한 도구들을 발명했어요. 집 안에서 사용하는 발명품을 찾을 수 있나요?",
    histL7Activity: "집 안에서 사용하는 발명품만 탭하세요!",
    histL8Greeting: "나는 모두가 읽고 쓸 수 있도록 한글을 만들었어요! 함께 소리를 배워봐요!",
    histL8Activity: "각 글자를 소리로 드래그하세요!",
    histL9Greeting: "나는 바다를 건너 날았어요! 세계 일주 비행 경로를 따라가는 것을 도와주세요!",
    histL9Activity: "비행 경로를 따라가요! 순서대로 탭하세요: 비행기, 바다, 세계!",
    histL10Greeting: "우리는 수학을 사용하여 우주비행사를 우주로 보냈어요! 함께 카운트다운을 해봐요!",
    histL10Activity: "순서대로 카운트다운을 탭하세요: 3, 2, 1, 로켓!",
    
    // History Figure Names/Titles
    tariqTitle: "위대한 장군이자 탐험가",
    abdAlRahmanName: "압드 알 라흐만 1세",
    abdAlRahmanTitle: "건축가 왕",
    averroesName: "아베로에스",
    averroesTitle: "위대한 철학자",
    paulJohnName: "폴 조셉 존",
    paulJohnTitle: "유픽 장로 및 문화 지도자",
    maryGoldaName: "메리 골다 로스",
    maryGoldaTitle: "최초의 원주민 여성 엔지니어",
    williamName: "윌리엄 캄콤바",
    williamTitle: "승리를 거머쥔 소년",
    maryKennerName: "메리 비어트리스 데이비슨 케너",
    maryKennerTitle: "뛰어난 발명가",
    kingSejongName: "세종대왕",
    kingSejongTitle: "한국의 위대한 왕",
    ameliaName: "아멜리아 에어하트",
    ameliaTitle: "용감한 조종사이자 탐험가",
    hiddenFiguresName: "어브비어스 피겨스",
    hiddenFiguresTitle: "계산기 필요 없음: NASA의 인간 컴퓨터를 만나보세요",
    
    // Drag Match Labels
    sun: "태양",
    moon: "달",
    star: "별",
    welcomeToSpain: "스페인에 오신 것을 환영합니다",
    hello: "안녕하세요!",
    thankYouVeryMuch: "정말 감사합니다!",
    howAreYou: "안녕하세요?",
    
    // Level 7 Invention Labels
    vacuum: "진공청소기",
    lawnMower: "잔디 깎는 기계",
    toaster: "토스터",
    sprinkler: "스프링클러",
    
    // History Level Titles
    histL1LevelTitle: "타리크 만나기",
    histL1LevelDesc: "타리크의 배를 도와주세요!",
    histL2LevelTitle: "압드 알 라흐만과 건설하기",
    histL2LevelDesc: "아름다운 정원을 만들어요!",
    histL3LevelTitle: "아베로에스와 생각하기",
    histL3LevelDesc: "아이디어일까, 도구일까?",
    histL4LevelTitle: "우주 엔지니어",
    histL4LevelDesc: "엔지니어는 패턴을 좋아해요!",
    histL5LevelTitle: "유픽 단어",
    histL5LevelDesc: "폴과 함께 배워요!",
    histL6LevelTitle: "풍차 만들기",
    histL6LevelDesc: "밝은 아이디어를 가진 발명가!",
    histL7LevelTitle: "발명품 분류하기",
    histL7LevelDesc: "집 안일까, 밖일까?",
    histL8LevelTitle: "Learn Hangul",
    histL8LevelDesc: "Match sounds and shapes!",
    histL9LevelTitle: "아멜리아와 날기",
    histL9LevelDesc: "비행 경로를 따라가요!",
    histL10LevelTitle: "로켓 발사",
    histL10LevelDesc: "발사까지 카운트다운!",
    
    // Math Level Titles
    mathL1LevelTitle: "과일 세기",
    mathL1LevelDesc: "맛있는 과일을 세어봐요!",
    mathL2LevelTitle: "도형 분류하기",
    mathL2LevelDesc: "도형을 제자리에 놓아요!",
    mathL3LevelTitle: "패턴 맞추기",
    mathL3LevelDesc: "패턴을 찾아봐요!",
    mathL4LevelTitle: "순서 완성하기",
    mathL4LevelDesc: "다음에 무엇이 올까요?",
    mathL5LevelTitle: "동물 세기",
    mathL5LevelDesc: "귀여운 동물들을 세어봐요!",
    mathL6LevelTitle: "물 따르기",
    mathL6LevelDesc: "알맞은 컵에 채워요!",
    mathL7LevelTitle: "반으로 자르기",
    mathL7LevelDesc: "분수를 배워봐요!",
    mathL8LevelTitle: "숫자 맞추기",
    mathL8LevelDesc: "숫자와 그룹!",
    mathL9LevelTitle: "크기별 분류",
    mathL9LevelDesc: "크고, 중간, 작은!",
    mathL10LevelTitle: "수학 도전",
    mathL10LevelDesc: "모든 기술을 사용해요!",
    
    // Badges
    badgeRhythmRookie: "리듬 신입",
    badgeRhythmRookieDesc: "첫 번째 리듬 활동을 완료했어요!",
    badgeRhythmMaster: "리듬 마스터",
    badgeRhythmMasterDesc: "리듬에서 80% 이상 정확도 달성!",
    badgeSpeedRacer: "스피드 레이서",
    badgeSpeedRacerDesc: "빠른 템포로 연주했어요!",
    badgeArtExplorer: "예술 탐험가",
    badgeArtExplorerDesc: "3개 이상의 예술 요소를 사용했어요!",
    badgeCreativeGenius: "창의적 천재",
    badgeCreativeGeniusDesc: "고급 예술 도구를 잠금 해제했어요!",
    badgeDeepThinker: "깊은 사고가",
    badgeDeepThinkerDesc: "사려 깊은 반성을 작성했어요!",
    badgeEmpathyStar: "공감의 별",
    badgeEmpathyStarDesc: "여러 관점을 탐구했어요!",
    badgeVoyager: "여행자",
    badgeVoyagerDesc: "숙련 성장 수준에 도달했어요!",
    badgeCaptain: "선장",
    badgeCaptainDesc: "고급 성장 수준을 달성했어요!",
    earnedBadges: "획득한 배지:",
    
    // Bonus Quest
    bonusQuest: "보너스 퀘스트",
    bonusQuestWelcome: "특별한 모험을 함께 떠나요! 책, 별, 하트를 모으는 것을 도와주세요!",
    bonusQuestAmazing: "놀라워요! 정말 많은 보물을 모았어요!",
    bonusQuestGreat: "보물 모으기를 잘 도와줬어요!",
    bonusQuestGood: "잘했어요! 다시 해볼까요?",
    bonusQuestNote: "최고 점수가 진행 폴더에 저장됩니다!",
    bonusQuestGame: "보너스 퀘스트 게임",
    playBonusQuest: "보너스 퀘스트 플레이",
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

export function formatWelcomeMessage(lang: Language, completedLevels: number): string {
  const t = translations[lang];
  if (completedLevels > 0) {
    if (lang === 'en') {
      return `${t.welcomeBack} ${completedLevels} ${t.adventuresCompleted}. ${t.letsKeepLearning}`;
    } else {
      return `${t.welcomeBack} ${completedLevels}${t.adventuresCompleted}. ${t.letsKeepLearning}`;
    }
  }
  return t.welcomeNew;
}

export function formatMathMessage(lang: Language, completedCount: number): string {
  const t = translations[lang];
  if (completedCount === 0) {
    return t.mathWorldWelcome;
  } else if (completedCount === 10) {
    return t.mathWorldComplete;
  }
  return t.mathWorldProgress.replace('{count}', String(completedCount));
}

export function formatHistoryMessage(lang: Language, completedCount: number): string {
  const t = translations[lang];
  if (completedCount === 0) {
    return t.historyWorldWelcome;
  } else if (completedCount === 10) {
    return t.historyWorldComplete;
  }
  return t.historyWorldProgress.replace('{count}', String(completedCount));
}

export function getTranslatedLevelTitle(lang: Language, levelType: 'math' | 'history', levelId: number): { title: string; description: string } {
  const t = translations[lang];
  const prefix = levelType === 'math' ? 'mathL' : 'histL';
  const titleKey = `${prefix}${levelId}LevelTitle` as keyof Translations;
  const descKey = `${prefix}${levelId}LevelDesc` as keyof Translations;
  return {
    title: t[titleKey] as string,
    description: t[descKey] as string,
  };
}

const BADGE_ID_TO_KEY: Record<string, keyof Translations> = {
  rhythm_rookie: 'badgeRhythmRookie',
  rhythm_master: 'badgeRhythmMaster',
  speed_racer: 'badgeSpeedRacer',
  art_explorer: 'badgeArtExplorer',
  creative_genius: 'badgeCreativeGenius',
  deep_thinker: 'badgeDeepThinker',
  empathy_star: 'badgeEmpathyStar',
  voyager: 'badgeVoyager',
  captain: 'badgeCaptain',
};

export function getTranslatedBadgeName(lang: Language, badgeId: string): string {
  const t = translations[lang];
  const key = BADGE_ID_TO_KEY[badgeId];
  if (key) {
    return t[key] as string;
  }
  return badgeId;
}
