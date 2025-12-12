import { useRef, useEffect, useState } from "react";

interface BonusQuestKaboomProps {
  onComplete: (score: number, collectibles: number) => void;
  onProgress: (score: number, collectibles: number) => void;
}

export default function BonusQuestKaboom({ onComplete, onProgress }: BonusQuestKaboomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [collectibles, setCollectibles] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const kaboomInstanceRef = useRef<ReturnType<typeof import("kaboom").default> | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !gameStarted || gameEnded) return;

    let isMounted = true;

    const initGame = async () => {
      try {
        const kaboom = (await import("kaboom")).default;

        if (!isMounted || !containerRef.current) return;

        const container = containerRef.current;
        container.innerHTML = '';

        // Create canvas element explicitly
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 360;
        canvas.style.display = 'block';
        container.appendChild(canvas);
        canvasRef.current = canvas;

        // Check WebGL support using a separate test canvas
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
        const hasWebGL = !!gl;

        if (!hasWebGL) {
          // Fall back to Canvas 2D game
          initCanvas2DGame(canvas, isMounted);
          return;
        }

        // Initialize Kaboom with explicit canvas (fresh canvas, no prior context)
        const k = kaboom({
          canvas: canvas,
          background: [135, 206, 235],
          width: 640,
          height: 360,
          scale: 1,
          crisp: true,
          global: false,
        });

        kaboomInstanceRef.current = k;

        const FLOOR_HEIGHT = 48;
        const JUMP_FORCE = 600;
        const SPEED = 200;
        const GRAVITY = 1800;

        let currentScore = 0;
        let currentCollectibles = 0;
        let gameOver = false;
        let cameraX = 0;
        let playerFacingRight = true;

        k.setGravity(GRAVITY);

        // Load Princess Amara sprite (single static image)
        k.loadSprite("amara", "/sprites/amara.png");

        // Wait for all assets to load before creating game entities
        k.onLoad(() => {
        console.log("k.onLoad called - sprite loaded, creating game entities");
        // 2.5D PARALLAX BACKGROUND LAYERS
        // Far background - sky gradient (slowest movement)
        const farBgLayer = k.add([
          k.rect(k.width() * 3, k.height()),
          k.pos(-k.width(), 0),
          k.color(100, 180, 255),
          k.z(-100),
          "farBg",
        ]);

        // Add clouds to far background
        for (let i = 0; i < 8; i++) {
          k.add([
            k.rect(k.rand(60, 120), k.rand(25, 40)),
            k.pos(k.rand(-200, k.width() + 400), k.rand(20, 100)),
            k.color(255, 255, 255),
            k.opacity(0.8),
            k.z(-95),
            "cloud",
            { speed: k.rand(0.1, 0.3), baseX: k.rand(-200, k.width() + 400) },
          ]);
        }

        // Mid background - distant hills (medium movement)
        for (let i = 0; i < 5; i++) {
          const hillWidth = k.rand(150, 250);
          const hillHeight = k.rand(80, 140);
          k.add([
            k.rect(hillWidth, hillHeight),
            k.pos(i * 180 - 100, k.height() - FLOOR_HEIGHT - hillHeight + 40),
            k.color(80, 140, 80),
            k.opacity(0.6),
            k.z(-50),
            "midBg",
            { parallaxFactor: 0.5, baseX: i * 180 - 100 },
          ]);
        }

        // Near background - trees/bushes (faster movement)
        for (let i = 0; i < 6; i++) {
          const treeHeight = k.rand(60, 100);
          const treeWidth = k.rand(40, 70);
          k.add([
            k.rect(treeWidth, treeHeight),
            k.pos(i * 140 - 50, k.height() - FLOOR_HEIGHT - treeHeight + 10),
            k.color(50, 120, 50),
            k.opacity(0.8),
            k.z(-25),
            "nearBg",
            { parallaxFactor: 0.8, baseX: i * 140 - 50 },
          ]);
        }

        // Ground with gradient effect (multiple layers for depth)
        k.add([
          k.rect(k.width() * 2, FLOOR_HEIGHT + 20),
          k.pos(-k.width() / 2, k.height() - FLOOR_HEIGHT - 10),
          k.color(100, 160, 80),
          k.z(-10),
          "groundBack",
        ]);

        k.add([
          k.rect(k.width(), FLOOR_HEIGHT),
          k.pos(0, k.height() - FLOOR_HEIGHT),
          k.color(120, 180, 100),
          k.area(),
          k.body({ isStatic: true }),
          k.z(0),
          "ground",
        ]);

        // Foreground grass details
        for (let i = 0; i < 20; i++) {
          k.add([
            k.rect(8, k.rand(10, 20)),
            k.pos(i * 35 + k.rand(-5, 5), k.height() - FLOOR_HEIGHT - k.rand(5, 15)),
            k.color(90, 160, 90),
            k.z(5),
            "grass",
            { parallaxFactor: 1.2, baseX: i * 35 },
          ]);
        }

        // Platforms with 3D effect (shadow + highlight)
        for (let i = 0; i < 3; i++) {
          const platX = 200 + i * 180;
          const platY = k.height() - FLOOR_HEIGHT - 80 - i * 60;
          
          // Platform shadow (offset below)
          k.add([
            k.rect(150, 20),
            k.pos(platX + 5, platY + 8),
            k.color(60, 80, 60),
            k.opacity(0.4),
            k.z(8),
            "platformShadow",
          ]);

          // Platform
          k.add([
            k.rect(150, 20),
            k.pos(platX, platY),
            k.color(180, 140, 100),
            k.area(),
            k.body({ isStatic: true }),
            k.z(10),
            "platform",
          ]);

          // Platform highlight (top edge)
          k.add([
            k.rect(150, 4),
            k.pos(platX, platY),
            k.color(220, 180, 140),
            k.z(11),
            "platformHighlight",
          ]);
        }

        // Player shadow
        const playerShadow = k.add([
          k.rect(50, 14),
          k.pos(80, k.height() - FLOOR_HEIGHT - 6),
          k.color(0, 0, 0),
          k.opacity(0.3),
          k.anchor("center"),
          k.z(9),
          "playerShadow",
        ]);

        // Player character - Princess Amara sprite (with fallback rectangle)
        let playerComponents: any[] = [];
        try {
          // Try to use the sprite if it loaded
          playerComponents = [
            k.sprite("amara"),
            k.pos(80, k.height() - FLOOR_HEIGHT),
            k.scale(0.12),
            k.area({ scale: 0.6 }),
            k.body(),
            k.anchor("bot"),
            k.z(20),
            "player",
          ];
        } catch (e) {
          // Fallback to a colored rectangle
          console.log("Sprite failed, using fallback rectangle");
          playerComponents = [
            k.rect(40, 60),
            k.color(255, 182, 193),
            k.pos(80, k.height() - FLOOR_HEIGHT),
            k.area(),
            k.body(),
            k.anchor("bot"),
            k.z(20),
            "player",
          ];
        }
        const player = k.add(playerComponents);
        
        // Grace period - disable collision with obstacles for first 4 seconds
        let collisionEnabled = false;
        k.wait(4, () => {
          collisionEnabled = true;
          console.log("Collision detection enabled after grace period");
        });

        // Player name label
        const playerLabel = k.add([
          k.text("Princess Amara", { size: 12 }),
          k.pos(80, k.height() - FLOOR_HEIGHT - 90),
          k.color(100, 50, 100),
          k.anchor("center"),
          k.z(25),
          "playerLabel",
        ]);

        // Depth-based spawning for collectibles - spawn at ground level mostly
        const spawnCollectible = () => {
          if (gameOver) return;

          const types = ["book", "star", "heart"];
          const type = types[Math.floor(Math.random() * types.length)];
          const points = type === "book" ? 10 : type === "star" ? 5 : 3;
          
          const depth = 1.0;
          const baseSize = 35;
          const size = baseSize * depth;

          const x = k.width() + 50;
          // 70% spawn at ground level (easy to collect), 30% higher up (need to jump)
          const spawnAtGround = Math.random() < 0.7;
          const y = spawnAtGround 
            ? k.height() - FLOOR_HEIGHT - size - 5
            : k.rand(120, k.height() - FLOOR_HEIGHT - 80);

          // Shadow for collectible
          k.add([
            k.rect(size, size * 0.3),
            k.pos(x + 3, k.height() - FLOOR_HEIGHT - 3),
            k.color(0, 0, 0),
            k.opacity(0.2),
            k.move(k.LEFT, 100),
            k.z(14),
            "collectibleShadow",
          ]);

          // Main collectible with depth-based z-ordering
          k.add([
            k.rect(size, size),
            k.pos(x, y),
            k.color(type === "book" ? k.rgb(139, 69, 19) : type === "star" ? k.rgb(255, 215, 0) : k.rgb(255, 105, 180)),
            k.area(),
            k.move(k.LEFT, 100),
            k.z(15 + depth * 5),
            "collectible",
            { points, type, depth },
          ]);

          // Highlight on collectible
          k.add([
            k.rect(size * 0.4, size * 0.4),
            k.pos(x + 2, y + 2),
            k.color(255, 255, 255),
            k.opacity(0.4),
            k.move(k.LEFT, 100),
            k.z(16 + depth * 5),
            "collectibleHighlight",
          ]);
        };

        // Obstacles with 3D effect and depth-based scaling
        const spawnObstacle = () => {
          if (gameOver) return;

          // Depth variation - obstacles further back appear smaller and move slower
          const depth = k.rand(0.8, 1.2);
          const baseWidth = 30;
          const baseHeight = 40;
          const width = baseWidth * depth;
          const height = baseHeight * depth;
          // Slower speed for child-friendly gameplay (was 180)
          const speed = 120 * depth;

          const obstacleX = k.width() + 30;
          const obstacleY = k.height() - FLOOR_HEIGHT;

          // Obstacle shadow
          k.add([
            k.rect(width + 5, 12 * depth),
            k.pos(obstacleX + 5, obstacleY - 5),
            k.color(0, 0, 0),
            k.opacity(0.3),
            k.move(k.LEFT, speed),
            k.anchor("bot"),
            k.z(9 + depth * 2),
            "obstacleShadow",
          ]);

          // Main obstacle with depth-based z-ordering
          k.add([
            k.rect(width, height),
            k.pos(obstacleX, obstacleY),
            k.color(100, 100, 100),
            k.area(),
            k.move(k.LEFT, speed),
            k.anchor("bot"),
            k.z(15 + depth * 5),
            "obstacle",
            { depth },
          ]);

          // Obstacle highlight
          k.add([
            k.rect(width - 5, height - 5),
            k.pos(obstacleX + 2, obstacleY - 2),
            k.color(130, 130, 130),
            k.move(k.LEFT, speed),
            k.anchor("bot"),
            k.z(16 + depth * 5),
            "obstacleHighlight",
          ]);
        };

        // Start spawning collectibles immediately
        k.loop(1.5, spawnCollectible);
        
        // Delay first obstacle spawn by 5 seconds to give player time to get ready
        // Then spawn obstacles every 4 seconds (slower pace for young children)
        k.wait(5, () => {
          spawnObstacle();
          k.loop(4, spawnObstacle);
        });

        k.onKeyDown("right", () => {
          if (!gameOver) {
            player.move(SPEED, 0);
            cameraX += 2;
            if (!playerFacingRight) {
              player.flipX = false;
              playerFacingRight = true;
            }
          }
        });

        k.onKeyDown("left", () => {
          if (!gameOver) {
            player.move(-SPEED, 0);
            cameraX -= 2;
            if (playerFacingRight) {
              player.flipX = true;
              playerFacingRight = false;
            }
          }
        });

        k.onKeyPress("up", () => {
          if (!gameOver && player.isGrounded()) {
            player.jump(JUMP_FORCE);
          }
        });

        k.onKeyPress("space", () => {
          if (!gameOver && player.isGrounded()) {
            player.jump(JUMP_FORCE);
          }
        });

        // Note: Jump on click is now handled by the DOM event handlers for better button detection

        // On-screen control buttons for mobile
        let movingLeft = false;
        let movingRight = false;

        // Left arrow button
        const leftBtn = k.add([
          k.rect(70, 50),
          k.pos(20, k.height() - 70),
          k.color(100, 100, 200),
          k.opacity(0.7),
          k.area(),
          k.fixed(),
          k.z(300),
          "leftBtn",
        ]);
        k.add([
          k.text("<", { size: 30 }),
          k.pos(45, k.height() - 55),
          k.color(255, 255, 255),
          k.anchor("center"),
          k.fixed(),
          k.z(301),
        ]);

        // Right arrow button
        const rightBtn = k.add([
          k.rect(70, 50),
          k.pos(100, k.height() - 70),
          k.color(100, 100, 200),
          k.opacity(0.7),
          k.area(),
          k.fixed(),
          k.z(300),
          "rightBtn",
        ]);
        k.add([
          k.text(">", { size: 30 }),
          k.pos(135, k.height() - 55),
          k.color(255, 255, 255),
          k.anchor("center"),
          k.fixed(),
          k.z(301),
        ]);

        // Jump button
        const jumpBtn = k.add([
          k.rect(80, 50),
          k.pos(k.width() - 100, k.height() - 70),
          k.color(200, 100, 100),
          k.opacity(0.7),
          k.area(),
          k.fixed(),
          k.z(300),
          "jumpBtn",
        ]);
        k.add([
          k.text("JUMP", { size: 16 }),
          k.pos(k.width() - 60, k.height() - 55),
          k.color(255, 255, 255),
          k.anchor("center"),
          k.fixed(),
          k.z(301),
        ]);

        // Direct DOM mouse/touch events for better iframe compatibility
        const getCanvasPos = (e: MouseEvent | Touch): { x: number; y: number } => {
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          const clientX = 'clientX' in e ? e.clientX : e.clientX;
          const clientY = 'clientY' in e ? e.clientY : e.clientY;
          return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
          };
        };

        const handlePointerDown = (pos: { x: number; y: number }) => {
          if (gameOver) return;
          console.log("Pointer down at:", pos.x, pos.y, "canvas height:", k.height());
          
          const buttonY = k.height() - 70;
          let buttonPressed = false;
          
          // Check if clicking left button
          if (pos.x >= 20 && pos.x <= 90 && pos.y >= buttonY) {
            movingLeft = true;
            buttonPressed = true;
            console.log("Moving left activated");
          }
          // Check if clicking right button
          if (pos.x >= 100 && pos.x <= 170 && pos.y >= buttonY) {
            movingRight = true;
            buttonPressed = true;
            console.log("Moving right activated");
          }
          // Check if clicking jump button
          if (pos.x >= k.width() - 100 && pos.x <= k.width() - 20 && pos.y >= buttonY) {
            if (player.isGrounded()) {
              player.jump(JUMP_FORCE);
              console.log("Jump from button");
            }
            buttonPressed = true;
          }
          // Tap anywhere else to jump
          if (!buttonPressed && player.isGrounded()) {
            player.jump(JUMP_FORCE);
            console.log("Jump from tap");
          }
        };

        const handlePointerUp = () => {
          movingLeft = false;
          movingRight = false;
        };

        // Mouse events
        canvas.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault();
          handlePointerDown(getCanvasPos(e));
        });
        canvas.addEventListener('mouseup', handlePointerUp);
        canvas.addEventListener('mouseleave', handlePointerUp);

        // Touch events
        canvas.addEventListener('touchstart', (e: TouchEvent) => {
          e.preventDefault();
          if (e.touches.length > 0) {
            handlePointerDown(getCanvasPos(e.touches[0]));
          }
        }, { passive: false });
        canvas.addEventListener('touchend', handlePointerUp);
        canvas.addEventListener('touchcancel', handlePointerUp);

        // Continuous movement based on button state
        k.onUpdate(() => {
          if (!gameOver) {
            if (movingRight) {
              player.move(SPEED, 0);
              cameraX += 2;
              if (!playerFacingRight) {
                player.flipX = false;
                playerFacingRight = true;
              }
            }
            if (movingLeft) {
              player.move(-SPEED, 0);
              cameraX -= 2;
              if (playerFacingRight) {
                player.flipX = true;
                playerFacingRight = false;
              }
            }
          }
        });

        player.onCollide("collectible", (c) => {
          const points = c.points as number;
          currentScore += points;
          currentCollectibles += 1;
          setScore(currentScore);
          setCollectibles(currentCollectibles);
          onProgress(currentScore, currentCollectibles);
          k.destroy(c);

          // Sparkle effect
          for (let i = 0; i < 5; i++) {
            k.add([
              k.rect(6, 6),
              k.pos(c.pos.x + k.rand(-20, 20), c.pos.y + k.rand(-20, 20)),
              k.color(255, 255, 100),
              k.opacity(1),
              k.lifespan(0.4, { fade: 0.3 }),
              k.move(k.vec2(k.rand(-1, 1), k.rand(-1, -0.5)).unit(), 80),
              k.z(50),
            ]);
          }

          k.add([
            k.text(`+${points}`, { size: 18 }),
            k.pos(c.pos),
            k.color(255, 215, 0),
            k.lifespan(0.6, { fade: 0.4 }),
            k.move(k.UP, 60),
            k.z(55),
          ]);
        });

        player.onCollide("obstacle", () => {
          console.log("Collision with obstacle detected! collisionEnabled:", collisionEnabled);
          if (!gameOver && collisionEnabled) {
            console.log("Game over triggered!");
            gameOver = true;
            setGameEnded(true);
            onComplete(currentScore, currentCollectibles);

            k.add([
              k.rect(400, 150),
              k.pos(k.width() / 2, k.height() / 2),
              k.color(0, 0, 0),
              k.opacity(0.8),
              k.anchor("center"),
              k.z(100),
            ]);

            k.add([
              k.text(`Game Over!\nScore: ${currentScore}\nCollected: ${currentCollectibles}`, { size: 20, align: "center" }),
              k.pos(k.width() / 2, k.height() / 2),
              k.color(255, 255, 255),
              k.anchor("center"),
              k.z(101),
            ]);
          }
        });

        // Update shadows and highlights to follow elements
        k.onUpdate(() => {
          if (!gameOver) {
            // Update player shadow position
            playerShadow.pos.x = player.pos.x;
            playerShadow.pos.y = k.height() - FLOOR_HEIGHT - 6;
            
            // Scale shadow based on height (further = smaller shadow)
            const heightFromGround = (k.height() - FLOOR_HEIGHT) - player.pos.y;
            const shadowScale = Math.max(0.5, 1 - heightFromGround / 200);
            playerShadow.opacity = 0.3 * shadowScale;

            // Update label to follow player
            playerLabel.pos.x = player.pos.x;
            playerLabel.pos.y = player.pos.y - 80;

            // Parallax scrolling based on camera position
            k.get("cloud").forEach((cloud: any) => {
              cloud.pos.x = cloud.baseX - cameraX * cloud.speed;
              if (cloud.pos.x < -150) cloud.baseX += k.width() + 300;
              if (cloud.pos.x > k.width() + 150) cloud.baseX -= k.width() + 300;
            });

            k.get("midBg").forEach((hill: any) => {
              hill.pos.x = hill.baseX - cameraX * hill.parallaxFactor;
            });

            k.get("nearBg").forEach((tree: any) => {
              tree.pos.x = tree.baseX - cameraX * tree.parallaxFactor;
            });

            k.get("grass").forEach((grass: any) => {
              grass.pos.x = grass.baseX - cameraX * grass.parallaxFactor;
            });

            if (player.pos.x < 20) player.pos.x = 20;
            if (player.pos.x > k.width() - 20) player.pos.x = k.width() - 20;
          }
        });

        // Clean up off-screen elements
        k.onUpdate("collectible", (c) => {
          if (c.pos.x < -50) k.destroy(c);
        });

        k.onUpdate("collectibleShadow", (s) => {
          if (s.pos.x < -50) k.destroy(s);
        });

        k.onUpdate("collectibleHighlight", (h) => {
          if (h.pos.x < -50) k.destroy(h);
        });

        k.onUpdate("obstacle", (o) => {
          if (o.pos.x < -50) k.destroy(o);
        });

        k.onUpdate("obstacleShadow", (s) => {
          if (s.pos.x < -50) k.destroy(s);
        });

        k.onUpdate("obstacleHighlight", (h) => {
          if (h.pos.x < -50) k.destroy(h);
        });

        // UI elements
        const scoreLabel = k.add([
          k.text(`Score: 0`, { size: 20 }),
          k.pos(20, 20),
          k.color(50, 50, 50),
          k.fixed(),
          k.z(200),
        ]);

        k.onUpdate(() => {
          if (!gameOver) {
            scoreLabel.text = `Score: ${currentScore} | Items: ${currentCollectibles}`;
          }
        });

        k.add([
          k.text("Use buttons below or arrow keys", { size: 11 }),
          k.pos(k.width() / 2, k.height() - 90),
          k.color(80, 80, 80),
          k.anchor("center"),
          k.fixed(),
          k.z(200),
        ]);
        }); // End of k.onLoad() callback

      } catch (err) {
        console.error("Kaboom initialization failed:", err);
        setError("Game could not initialize. Please try refreshing the page.");
      }
    };

    // Canvas 2D fallback game
    const initCanvas2DGame = (canvas: HTMLCanvasElement, mounted: boolean) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !mounted) return;

      const FLOOR_HEIGHT = 48;
      const JUMP_FORCE = 15;
      const GRAVITY = 0.8;
      const SPEED = 5;

      let currentScore = 0;
      let currentCollectibles = 0;
      let gameOver = false;

      // Player state
      const player = {
        x: 60,
        y: canvas.height - FLOOR_HEIGHT - 50,
        width: 40,
        height: 50,
        velocityY: 0,
        isGrounded: true,
      };

      // Collectibles and obstacles with depth-based scaling
      const collectiblesArr: { x: number; y: number; type: string; points: number; depth: number }[] = [];
      const obstacles: { x: number; y: number; width: number; height: number; depth: number; speed: number }[] = [];

      // Parallax layers
      const clouds = Array.from({ length: 6 }, () => ({
        x: Math.random() * canvas.width,
        y: 20 + Math.random() * 80,
        width: 60 + Math.random() * 60,
        speed: 0.2 + Math.random() * 0.3,
      }));

      let lastCollectibleTime = 0;
      let lastObstacleTime = 0;
      let cameraX = 0;

      const keys: { [key: string]: boolean } = {};

      const handleKeyDown = (e: KeyboardEvent) => {
        keys[e.key] = true;
        if ((e.key === ' ' || e.key === 'ArrowUp') && player.isGrounded && !gameOver) {
          player.velocityY = -JUMP_FORCE;
          player.isGrounded = false;
        }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        keys[e.key] = false;
      };

      const handleClick = () => {
        if (player.isGrounded && !gameOver) {
          player.velocityY = -JUMP_FORCE;
          player.isGrounded = false;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      canvas.addEventListener('click', handleClick);

      const gameLoop = (timestamp: number) => {
        if (!mounted) return;

        // Spawn collectibles with depth-based scaling
        if (timestamp - lastCollectibleTime > 1500 && !gameOver) {
          const types = ['book', 'star', 'heart'];
          const type = types[Math.floor(Math.random() * 3)];
          const depth = 0.8 + Math.random() * 0.4;
          collectiblesArr.push({
            x: canvas.width + 50,
            y: 100 + Math.random() * (canvas.height - FLOOR_HEIGHT - 150),
            type,
            points: type === 'book' ? 10 : type === 'star' ? 5 : 3,
            depth,
          });
          lastCollectibleTime = timestamp;
        }

        // Spawn obstacles with depth-based scaling
        // Delay first obstacle by 5 seconds, then spawn every 4 seconds (child-friendly pace)
        if (timestamp > 5000 && timestamp - lastObstacleTime > 4000 && !gameOver) {
          const depth = 0.8 + Math.random() * 0.4;
          const baseWidth = 30;
          const baseHeight = 40;
          obstacles.push({
            x: canvas.width + 30,
            y: canvas.height - FLOOR_HEIGHT - baseHeight * depth,
            width: baseWidth * depth,
            height: baseHeight * depth,
            depth,
            // Slower speed for easier gameplay (was 3)
            speed: 2 * depth,
          });
          lastObstacleTime = timestamp;
        }

        // Update player
        if (!gameOver) {
          if (keys['ArrowRight']) {
            player.x += SPEED;
            cameraX += 1;
          }
          if (keys['ArrowLeft']) {
            player.x -= SPEED;
            cameraX -= 1;
          }

          player.velocityY += GRAVITY;
          player.y += player.velocityY;

          if (player.y >= canvas.height - FLOOR_HEIGHT - player.height) {
            player.y = canvas.height - FLOOR_HEIGHT - player.height;
            player.velocityY = 0;
            player.isGrounded = true;
          }

          player.x = Math.max(20, Math.min(canvas.width - 60, player.x));
        }

        // Update collectibles with depth-based speed
        collectiblesArr.forEach((c, i) => {
          c.x -= 2.5 * c.depth;
          if (c.x < -50) collectiblesArr.splice(i, 1);

          const size = 30 * c.depth;
          // Collision detection
          if (
            player.x < c.x + size &&
            player.x + player.width > c.x &&
            player.y < c.y + size &&
            player.y + player.height > c.y
          ) {
            currentScore += c.points;
            currentCollectibles++;
            setScore(currentScore);
            setCollectibles(currentCollectibles);
            onProgress(currentScore, currentCollectibles);
            collectiblesArr.splice(i, 1);
          }
        });

        // Update obstacles with depth-based speed
        obstacles.forEach((o, i) => {
          o.x -= o.speed;
          if (o.x < -50) obstacles.splice(i, 1);

          // Collision detection - only after grace period (4 seconds)
          if (
            timestamp > 4000 &&
            player.x < o.x + o.width &&
            player.x + player.width > o.x &&
            player.y < o.y + o.height &&
            player.y + player.height > o.y
          ) {
            gameOver = true;
            setGameEnded(true);
            onComplete(currentScore, currentCollectibles);
          }
        });

        // Draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#B0E0E6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Clouds (parallax)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        clouds.forEach((cloud) => {
          const x = cloud.x - cameraX * cloud.speed;
          ctx.beginPath();
          ctx.ellipse(x, cloud.y, cloud.width / 2, 20, 0, 0, Math.PI * 2);
          ctx.fill();
        });

        // Hills (mid-ground parallax)
        ctx.fillStyle = 'rgba(80, 140, 80, 0.6)';
        for (let i = 0; i < 5; i++) {
          const x = i * 180 - 100 - cameraX * 0.5;
          ctx.beginPath();
          ctx.ellipse(x + 75, canvas.height - FLOOR_HEIGHT + 20, 100, 80, 0, Math.PI, 0);
          ctx.fill();
        }

        // Ground
        ctx.fillStyle = '#78B464';
        ctx.fillRect(0, canvas.height - FLOOR_HEIGHT, canvas.width, FLOOR_HEIGHT);

        // Player shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(player.x + player.width / 2, canvas.height - FLOOR_HEIGHT - 3, 22, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Player
        ctx.fillStyle = '#FFB6C1';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = '#FFC0CB';
        ctx.fillRect(player.x + 3, player.y + 3, player.width - 6, player.height - 6);

        // Sort elements by depth for proper z-ordering (smaller depth = further back = drawn first)
        const sortedCollectibles = [...collectiblesArr].sort((a, b) => a.depth - b.depth);
        const sortedObstacles = [...obstacles].sort((a, b) => a.depth - b.depth);

        // Collectibles with depth-based sizing
        sortedCollectibles.forEach((c) => {
          const size = 30 * c.depth;
          // Shadow
          ctx.fillStyle = `rgba(0, 0, 0, ${0.2 * c.depth})`;
          ctx.beginPath();
          ctx.ellipse(c.x + size / 2, c.y + size + 5, size / 2.5, 4 * c.depth, 0, 0, Math.PI * 2);
          ctx.fill();

          // Main collectible
          ctx.fillStyle = c.type === 'book' ? '#8B4513' : c.type === 'star' ? '#FFD700' : '#FF69B4';
          ctx.fillRect(c.x, c.y, size, size);

          // Highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(c.x + 2, c.y + 2, size * 0.4, size * 0.4);
        });

        // Obstacles with depth-based sizing
        sortedObstacles.forEach((o) => {
          // Shadow
          ctx.fillStyle = `rgba(0, 0, 0, ${0.3 * o.depth})`;
          ctx.beginPath();
          ctx.ellipse(o.x + o.width / 2, canvas.height - FLOOR_HEIGHT - 3, o.width / 2 + 2, 5 * o.depth, 0, 0, Math.PI * 2);
          ctx.fill();

          // Main obstacle
          ctx.fillStyle = '#646464';
          ctx.fillRect(o.x, o.y, o.width, o.height);

          // Highlight
          ctx.fillStyle = '#828282';
          ctx.fillRect(o.x + 2, o.y + 2, o.width - 4, o.height - 4);
        });

        // UI
        ctx.fillStyle = '#333';
        ctx.font = '20px sans-serif';
        ctx.fillText(`Score: ${currentScore} | Items: ${currentCollectibles}`, 20, 30);

        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#555';
        ctx.textAlign = 'center';
        ctx.fillText('Tap to jump | Touch left/right to move', canvas.width / 2, canvas.height - 10);
        ctx.textAlign = 'left';

        if (gameOver) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 60, 300, 120);

          ctx.fillStyle = '#FFF';
          ctx.font = '24px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
          ctx.font = '18px sans-serif';
          ctx.fillText(`Score: ${currentScore}`, canvas.width / 2, canvas.height / 2 + 10);
          ctx.fillText(`Items: ${currentCollectibles}`, canvas.width / 2, canvas.height / 2 + 35);
          ctx.textAlign = 'left';
        } else {
          animationRef.current = requestAnimationFrame(gameLoop);
        }
      };

      animationRef.current = requestAnimationFrame(gameLoop);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        canvas.removeEventListener('click', handleClick);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    };

    initGame();

    return () => {
      isMounted = false;
      if (kaboomInstanceRef.current) {
        kaboomInstanceRef.current.quit();
        kaboomInstanceRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [gameStarted, gameEnded, gameKey, onComplete, onProgress]);

  const handleStart = () => {
    setScore(0);
    setCollectibles(0);
    setGameEnded(false);
    setError(null);
    setGameStarted(true);
  };

  const handleRestart = () => {
    if (kaboomInstanceRef.current) {
      kaboomInstanceRef.current.quit();
      kaboomInstanceRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    setGameEnded(false);
    setGameStarted(false);
    setScore(0);
    setCollectibles(0);
    setError(null);
    setGameKey(prev => prev + 1);
    setTimeout(() => {
      setGameStarted(true);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative bg-gradient-to-b from-sky-200 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-2xl overflow-hidden shadow-lg">
        <div
          ref={containerRef}
          style={{ width: 640, height: 360 }}
          className="block"
          data-testid="canvas-bonus-game"
        />
        
        {!gameStarted && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <h2 className="text-2xl font-bold text-white mb-4">Princess Amara's Quest</h2>
            <p className="text-white mb-6 text-center px-4">
              Help Princess Amara collect books, stars, and hearts!<br />
              Avoid the obstacles!
            </p>
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full hover:scale-105 transition-transform"
              data-testid="button-start-bonus-game"
            >
              Start Game
            </button>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
            <h2 className="text-xl font-bold text-red-400 mb-4">Oops!</h2>
            <p className="text-white mb-4 text-center px-4">{error}</p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full hover:scale-105 transition-transform"
              data-testid="button-retry-bonus-game"
            >
              Try Again
            </button>
          </div>
        )}

        {gameEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
            <h2 className="text-2xl font-bold text-white mb-2">Great Job!</h2>
            <p className="text-xl text-yellow-300 mb-2">Score: {score}</p>
            <p className="text-lg text-white mb-4">Items Collected: {collectibles}</p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full hover:scale-105 transition-transform"
              data-testid="button-restart-bonus-game"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {gameStarted && !gameEnded && !error && (
        <div className="flex gap-4 text-foreground">
          <span className="font-bold">Score: {score}</span>
          <span>Items: {collectibles}</span>
        </div>
      )}
    </div>
  );
}
