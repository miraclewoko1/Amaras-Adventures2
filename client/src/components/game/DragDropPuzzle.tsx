import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

interface DraggableItem {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

interface DropZone {
  id: string;
  label: string;
  acceptsId: string;
  icon?: string;
}

interface DragDropPuzzleProps {
  items: DraggableItem[];
  dropZones: DropZone[];
  onComplete: () => void;
  instruction: string;
}

export default function DragDropPuzzle({ items, dropZones, onComplete, instruction }: DragDropPuzzleProps) {
  const [placedItems, setPlacedItems] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const availableItems = items.filter(
    (item) => !Object.values(placedItems).includes(item.id)
  );

  const handleItemClick = (itemId: string) => {
    if (showSuccess) return;
    if (selectedItem === itemId) {
      setSelectedItem(null);
    } else {
      setSelectedItem(itemId);
    }
  };

  const handleZoneClick = (zoneId: string) => {
    if (showSuccess || !selectedItem) return;

    const zone = dropZones.find((z) => z.id === zoneId);
    if (zone && zone.acceptsId === selectedItem) {
      const newPlaced = { ...placedItems, [zoneId]: selectedItem };
      setPlacedItems(newPlaced);
      setSelectedItem(null);

      if (Object.keys(newPlaced).length === dropZones.length) {
        setShowSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    } else {
      setSelectedItem(null);
    }
  };

  const handleDragStart = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const handleDragEnd = () => {
  };

  const handleDrop = (zoneId: string) => {
    handleZoneClick(zoneId);
  };

  return (
    <div ref={containerRef} className="relative p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{instruction}</h3>
        <p className="text-sm text-muted-foreground">
          Tap an item, then tap where it goes!
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-center gap-4 flex-wrap">
          {availableItems.map((item) => {
            const isSelected = selectedItem === item.id;
            return (
              <motion.button
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={handleDragEnd}
                onClick={() => handleItemClick(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isSelected ? 1.15 : 1,
                  y: isSelected ? -8 : 0,
                }}
                className={`
                  w-20 h-20 rounded-2xl flex flex-col items-center justify-center cursor-pointer
                  shadow-lg border-4 transition-colors
                  ${item.color || "bg-gradient-to-br from-yellow-400 to-orange-400"}
                  ${isSelected ? "border-green-400 ring-4 ring-green-300" : "border-white/50"}
                `}
                style={{ touchAction: "manipulation" }}
                data-testid={`draggable-${item.id}`}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-bold text-white mt-1">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {selectedItem && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-medium text-green-600 dark:text-green-400"
          >
            Now tap where it goes!
          </motion.p>
        )}

        <div className="flex justify-center gap-6 flex-wrap">
          {dropZones.map((zone) => {
            const isPlaced = placedItems[zone.id];
            const placedItem = items.find((i) => i.id === isPlaced);
            const isHighlighted = selectedItem === zone.acceptsId;

            return (
              <motion.button
                key={zone.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(zone.id)}
                onClick={() => handleZoneClick(zone.id)}
                animate={{
                  scale: isHighlighted ? 1.08 : 1,
                  borderColor: isHighlighted ? "#22c55e" : undefined,
                }}
                className={`
                  w-24 h-24 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center
                  transition-colors cursor-pointer
                  ${isPlaced
                    ? "bg-green-100 dark:bg-green-900/30 border-green-400"
                    : isHighlighted
                    ? "bg-green-50 dark:bg-green-900/20 border-green-400"
                    : "bg-muted/50 border-muted-foreground/30"
                  }
                `}
                data-testid={`dropzone-${zone.id}`}
              >
                {isPlaced && placedItem ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-3xl">{placedItem.icon}</span>
                    <Sparkles className="w-4 h-4 text-yellow-500 mt-1" />
                  </motion.div>
                ) : (
                  <>
                    <span className="text-2xl opacity-40">{zone.icon}</span>
                    <span className="text-xs text-muted-foreground mt-1">{zone.label}</span>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-background/80 rounded-3xl"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1.2, 1.2, 1],
                }}
                transition={{ duration: 0.5 }}
              >
                <Star className="w-20 h-20 text-yellow-400 fill-yellow-400" />
              </motion.div>
              <span className="text-2xl font-bold text-foreground">Perfect!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
