import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Paintbrush, Eraser, RotateCcw, Check, Square, Waves, Ship, Sparkles, Layers } from "lucide-react";
import type { ArtworkData } from "@/lib/gameProgress";
import { loadDiagnostics, getArtSettings } from "@/lib/adaptiveDiagnostics";

interface TariqArtStudioProps {
  onComplete: (artworkData: ArtworkData) => void;
}

const BRUSH_COLORS = [
  "#8B4513", // Brown (mountain)
  "#228B22", // Green (vegetation)
  "#4169E1", // Blue (water)
  "#87CEEB", // Sky blue
  "#FFD700", // Gold (sun)
  "#FFFFFF", // White (clouds)
  "#808080", // Gray (rocks)
  "#000000", // Black (outline)
];

const STICKERS = [
  { id: "ship", emoji: "⛵️", label: "Ship" },
  { id: "sun", emoji: "☀️", label: "Sun" },
  { id: "cloud", emoji: "☁️", label: "Cloud" },
  { id: "bird", emoji: "🦅", label: "Eagle" },
  { id: "flag", emoji: "🏴", label: "Flag" },
  { id: "star", emoji: "⭐", label: "Star" },
];

const MOSAIC_PATTERNS = [
  { id: "tile1", color: "#C19A6B", pattern: "solid" },
  { id: "tile2", color: "#E6BE8A", pattern: "solid" },
  { id: "tile3", color: "#1E90FF", pattern: "solid" },
  { id: "tile4", color: "#228B22", pattern: "solid" },
];

type Tool = "brush" | "eraser" | "sticker" | "mosaic" | "guided_waves" | "guided_ships" | "layered_mosaic" | "animated_brush";

interface PlacedSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
}

export default function TariqArtStudio({ onComplete }: TariqArtStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const diagnostics = useMemo(() => loadDiagnostics("student_1", "tariq_711_module"), []);
  const artSettings = useMemo(() => getArtSettings(diagnostics), [diagnostics]);
  
  const [activeTool, setActiveTool] = useState<Tool>("brush");
  const [brushColor, setBrushColor] = useState(BRUSH_COLORS[0]);
  const [brushSize, setBrushSize] = useState(8);
  const [selectedSticker, setSelectedSticker] = useState(STICKERS[0]);
  const [selectedMosaic, setSelectedMosaic] = useState(MOSAIC_PATTERNS[0]);
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [usedBrush, setUsedBrush] = useState(false);
  const [usedMosaic, setUsedMosaic] = useState(false);
  const [usedGuidedWaves, setUsedGuidedWaves] = useState(false);
  const [usedGuidedShips, setUsedGuidedShips] = useState(false);
  const [usedLayeredMosaic, setUsedLayeredMosaic] = useState(false);
  const [usedAnimatedBrush, setUsedAnimatedBrush] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4169E1";
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.3, canvas.height * 0.7);
    ctx.lineTo(canvas.width * 0.5, canvas.height * 0.3);
    ctx.lineTo(canvas.width * 0.7, canvas.height * 0.7);
    ctx.closePath();
    ctx.fill();
  }, []);

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const drawGuidedWaves = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    
    ctx.strokeStyle = "#4169E1";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const startX = Math.max(0, x - 60 + i * 30);
      const waveY = y + Math.sin(i) * 10;
      if (i === 0) ctx.moveTo(startX, waveY);
      else ctx.quadraticCurveTo(startX - 15, waveY - 15, startX, waveY);
    }
    ctx.stroke();
    setUsedGuidedWaves(true);
  };

  const drawGuidedShip = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.moveTo(x - 25, y);
    ctx.lineTo(x + 25, y);
    ctx.lineTo(x + 15, y + 15);
    ctx.lineTo(x - 15, y + 15);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x + 20, y);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    setUsedGuidedShips(true);
  };

  const drawLayeredMosaic = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    
    const colors = ["#C19A6B", "#E6BE8A", "#1E90FF", "#228B22"];
    const tileSize = 15;
    const snapX = Math.floor(x / tileSize) * tileSize;
    const snapY = Math.floor(y / tileSize) * tileSize;
    
    for (let i = 0; i < 4; i++) {
      const offsetX = (i % 2) * tileSize;
      const offsetY = Math.floor(i / 2) * tileSize;
      ctx.fillStyle = colors[i];
      ctx.fillRect(snapX + offsetX, snapY + offsetY, tileSize, tileSize);
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(snapX + offsetX, snapY + offsetY, tileSize, tileSize);
    }
    setUsedLayeredMosaic(true);
  };

  const drawAnimatedBrush = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize * 2);
    gradient.addColorStop(0, brushColor);
    gradient.addColorStop(0.5, brushColor + "88");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, brushSize * 2, 0, Math.PI * 2);
    ctx.fill();
    setUsedAnimatedBrush(true);
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeTool === "sticker") {
      const { x, y } = getCanvasCoords(e);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      setPlacedStickers((prev) => [
        ...prev,
        {
          id: `sticker-${Date.now()}`,
          emoji: selectedSticker.emoji,
          x: (x / canvas.width) * rect.width,
          y: (y / canvas.height) * rect.height,
        },
      ]);
      return;
    }

    if (activeTool === "mosaic") {
      const { x, y } = getCanvasCoords(e);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = selectedMosaic.color;
      const tileSize = 20;
      const snapX = Math.floor(x / tileSize) * tileSize;
      const snapY = Math.floor(y / tileSize) * tileSize;
      ctx.fillRect(snapX, snapY, tileSize, tileSize);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(snapX, snapY, tileSize, tileSize);
      setUsedMosaic(true);
      return;
    }

    if (activeTool === "guided_waves") {
      const { x, y } = getCanvasCoords(e);
      drawGuidedWaves(x, y);
      return;
    }

    if (activeTool === "guided_ships") {
      const { x, y } = getCanvasCoords(e);
      drawGuidedShip(x, y);
      return;
    }

    if (activeTool === "layered_mosaic") {
      const { x, y } = getCanvasCoords(e);
      drawLayeredMosaic(x, y);
      return;
    }

    if (activeTool === "animated_brush") {
      const { x, y } = getCanvasCoords(e);
      drawAnimatedBrush(x, y);
      setIsDrawing(true);
      return;
    }

    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing && activeTool !== "mosaic") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);

    if (activeTool === "brush") {
      ctx.fillStyle = brushColor;
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
      setUsedBrush(true);
    } else if (activeTool === "eraser") {
      ctx.fillStyle = "#87CEEB";
      ctx.beginPath();
      ctx.arc(x, y, brushSize * 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (activeTool === "animated_brush") {
      drawAnimatedBrush(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4169E1";
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);
    setPlacedStickers([]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-foreground">Art Studio</h2>
        <p className="text-sm text-muted-foreground">
          Draw the Mountain of Gibraltar! Use brushes, stickers, and mosaic tiles.
        </p>
      </div>

      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          data-testid="canvas-art"
        />
        {placedStickers.map((sticker) => (
          <motion.div
            key={sticker.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute text-3xl pointer-events-none"
            style={{ left: sticker.x - 15, top: sticker.y - 15 }}
          >
            {sticker.emoji}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          size="sm"
          variant={activeTool === "brush" ? "default" : "outline"}
          onClick={() => setActiveTool("brush")}
          data-testid="button-tool-brush"
        >
          <Paintbrush className="w-4 h-4 mr-1" />
          Brush
        </Button>
        <Button
          size="sm"
          variant={activeTool === "eraser" ? "default" : "outline"}
          onClick={() => setActiveTool("eraser")}
          data-testid="button-tool-eraser"
        >
          <Eraser className="w-4 h-4 mr-1" />
          Eraser
        </Button>
        <Button
          size="sm"
          variant={activeTool === "sticker" ? "default" : "outline"}
          onClick={() => setActiveTool("sticker")}
          data-testid="button-tool-sticker"
        >
          Stickers
        </Button>
        <Button
          size="sm"
          variant={activeTool === "mosaic" ? "default" : "outline"}
          onClick={() => setActiveTool("mosaic")}
          data-testid="button-tool-mosaic"
        >
          <Square className="w-4 h-4 mr-1" />
          Mosaic
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={clearCanvas}
          data-testid="button-clear-canvas"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Clear
        </Button>
        {artSettings.showGuidedTemplates && (
          <>
            <Button
              size="sm"
              variant={activeTool === "guided_waves" ? "default" : "secondary"}
              onClick={() => setActiveTool("guided_waves")}
              data-testid="button-tool-guided-waves"
            >
              <Waves className="w-4 h-4 mr-1" />
              Waves
            </Button>
            <Button
              size="sm"
              variant={activeTool === "guided_ships" ? "default" : "secondary"}
              onClick={() => setActiveTool("guided_ships")}
              data-testid="button-tool-guided-ships"
            >
              <Ship className="w-4 h-4 mr-1" />
              Ships
            </Button>
          </>
        )}
        {artSettings.showAdvancedTools && (
          <>
            <Button
              size="sm"
              variant={activeTool === "layered_mosaic" ? "default" : "secondary"}
              onClick={() => setActiveTool("layered_mosaic")}
              data-testid="button-tool-layered-mosaic"
            >
              <Layers className="w-4 h-4 mr-1" />
              Layered
            </Button>
            <Button
              size="sm"
              variant={activeTool === "animated_brush" ? "default" : "secondary"}
              onClick={() => setActiveTool("animated_brush")}
              data-testid="button-tool-animated-brush"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Glow
            </Button>
          </>
        )}
      </div>

      {activeTool === "brush" && (
        <div className="flex flex-wrap gap-2 justify-center">
          {BRUSH_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setBrushColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                brushColor === color ? "scale-125 border-foreground" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              data-testid={`button-color-${color}`}
            />
          ))}
          <input
            type="range"
            min="2"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24 ml-4"
            data-testid="slider-brush-size"
          />
        </div>
      )}

      {activeTool === "sticker" && (
        <div className="flex flex-wrap gap-3 justify-center">
          {STICKERS.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => setSelectedSticker(sticker)}
              className={`text-3xl p-2 rounded-lg transition-all ${
                selectedSticker.id === sticker.id
                  ? "bg-primary/20 scale-110"
                  : "bg-muted"
              }`}
              data-testid={`button-sticker-${sticker.id}`}
            >
              {sticker.emoji}
            </button>
          ))}
        </div>
      )}

      {activeTool === "mosaic" && (
        <div className="flex flex-wrap gap-3 justify-center">
          {MOSAIC_PATTERNS.map((tile) => (
            <button
              key={tile.id}
              onClick={() => setSelectedMosaic(tile)}
              className={`w-10 h-10 rounded border-2 transition-all ${
                selectedMosaic.id === tile.id
                  ? "scale-110 border-foreground"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: tile.color }}
              data-testid={`button-mosaic-${tile.id}`}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button
          size="lg"
          onClick={() => {
            const canvas = canvasRef.current;
            const fileUrl = canvas ? canvas.toDataURL("image/png") : "";
            
            const elementsUsed: ArtworkData["elements_used"] = [];
            if (usedBrush) {
              elementsUsed.push("waves");
              elementsUsed.push("rocks");
            }
            if (placedStickers.some(s => s.emoji === "⛵️")) {
              elementsUsed.push("ships");
            }
            if (placedStickers.length > 0) {
              elementsUsed.push("stickers");
            }
            if (usedMosaic) {
              elementsUsed.push("mosaic_tiles");
            }
            if (usedGuidedWaves) {
              elementsUsed.push("guided_waves");
            }
            if (usedGuidedShips) {
              elementsUsed.push("guided_ships");
            }
            if (usedLayeredMosaic) {
              elementsUsed.push("layered_mosaic");
            }
            if (usedAnimatedBrush) {
              elementsUsed.push("animated_brush");
            }
            
            const artworkData: ArtworkData = {
              file_url: fileUrl,
              elements_used: elementsUsed,
              creativity_notes: `Used ${elementsUsed.length} different element types. ${placedStickers.length} stickers placed.`,
            };
            
            onComplete(artworkData);
          }}
          className="rounded-full px-8"
          data-testid="button-finish-art"
        >
          <Check className="w-5 h-5 mr-2" />
          Finished Drawing!
        </Button>
      </div>
    </div>
  );
}
