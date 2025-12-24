// ===== CONFIGURATION (EASY TO MODIFY) =====
const CONFIG = {
  // ⭐ EASILY CHANGE THESE VALUES ⭐
  photos: [
    { src: "images/pic1.png", caption: "Christmas Party 2023" },
    { src: "images/pic2.jpeg", caption: "Best Friends Forever" },
    { src: "images/pic3.jpeg", caption: "Santa Visit" },
    { src: "images/pic4.png", caption: "Christmas Dinner" },
    { src: "images/pic5.jpeg", caption: "Gift Exchange" },
    { src: "images/pic6.jpeg", caption: "Gift Exchange" },
    { src: "images/pic7.jpeg", caption: "Gift Exchange" },
    { src: "images/pic8.jpeg", caption: "Gift Exchange" },
    { src: "images/pic9.jpeg", caption: "Gift Exchange" },
    { src: "images/pic10.jpeg", caption: "Gift Exchange" },
    { src: "images/pic11.jpeg", caption: "Gift Exchange" },
    { src: "images/pic12.png", caption: "Gift Exchange" },
    { src: "images/vid1.mp4", caption: "Gift Exchange", type: "video" },
    { src: "images/vid2.mp4", caption: "Gift Exchange", type: "video" },
    { src: "images/vid3.mp4", caption: "Gift Exchange", type: "video" },
  ],

  // ⭐ ADJUST SLIDESHOW SPEED HERE ⭐
  slideshowSpeed: 500,
  slideshowDuration: 6000,

  // ⭐ ADJUST ANIMATION TIMING HERE ⭐
  bounceDuration: 2500,
  openDelay: 800,
  surpriseDuration: 2000,

  // Christmas colors
  colors: {
    red: "#e63946",
    green: "#2d6a4f",
    gold: "#ffd166",
    blue: "#4361ee",
    purple: "#560bad",
  },
};

// ===== DOM ELEMENTS =====
const giftBox = document.getElementById("giftBox");
const boxElement = document.querySelector(".box");
const surpriseContainer = document.getElementById("surpriseContainer");
const confettiContainer = document.getElementById("confettiContainer");
const slideshowContainer = document.getElementById("slideshowContainer");
const slideshowTrack = document.getElementById("slideshowTrack");
const snowfall = document.getElementById("snowfall");
const currentCount = document.getElementById("currentCount");
const totalCount = document.getElementById("totalCount");

// Audio elements
const openSound = document.getElementById("openSound");
const celebrationSound = document.getElementById("celebrationSound");

// ===== STATE MANAGEMENT =====
let currentStage = 1;
let slideshowInterval;
let currentPhotoIndex = 0;

// ===== INITIALIZATION =====
function init() {
  totalCount.textContent = CONFIG.photos.length;

  setTimeout(() => {
    giftBox.classList.add("centered");

    giftBox.addEventListener("animationend", function handleBounceEnd(e) {
      if (e.animationName === "bounceToCenter") {
        giftBox.classList.add("bounce-complete");
        currentStage = 2;
        giftBox.style.cursor = "pointer";
        giftBox.addEventListener("click", openGift);
        giftBox.removeEventListener("animationend", handleBounceEnd);
      }
    });
  }, 500);
  
}


// ===== STAGE 2: OPEN GIFT =====
// ===== STAGE 2: OPEN GIFT =====
function openGift() {
  if (currentStage !== 2) return;

  currentStage = 3;
  giftBox.style.cursor = "default";
  giftBox.removeEventListener("click", openGift);

  openSound.currentTime = 0;
  openSound.volume = 0.8;
  openSound.play().catch((e) => console.log("Audio play failed:", e));

  boxElement.classList.add("opened");

  const sparklesContainer = document.createElement("div");
  sparklesContainer.className = "sparkles";
  giftBox.appendChild(sparklesContainer);

  const sparkleCount = 20;
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const distance2 = distance + 50 + Math.random() * 100;

    sparkle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty("--dy", `${Math.sin(angle) * distance - 50}px`);
    sparkle.style.setProperty("--dx2", `${Math.cos(angle) * distance2}px`);
    sparkle.style.setProperty(
      "--dy2",
      `${Math.sin(angle) * distance2 - 100}px`
    );

    const delay = Math.random() * 0.2;
    const duration = 0.8 + Math.random() * 0.6;
    sparkle.style.animation = `sparkleBurst ${duration}s ease-out ${delay}s forwards`;

    sparklesContainer.appendChild(sparkle);
  }

  setTimeout(() => {
    if (sparklesContainer.parentNode) sparklesContainer.remove();
  }, 1500);

  setTimeout(() => {
    // ===== REMOVED: celebrationSound.play() =====
    // celebrationSound.currentTime = 0;
    // celebrationSound.play().catch((e) => console.log("Audio play failed:", e));

    // ===== CONFETTI BURST =====
    createConfettiBurst();

    // ===== 🎵 MUSIC AUTO-PLAY (IMMEDIATELY AFTER CONFETTI) =====
    playChristmasMusicAuto(); // Music starts here!

    // ===== SLIDESHOW AFTER MUSIC =====
    setTimeout(() => {
      startPhotoSlideshow();
    }, CONFIG.surpriseDuration);
  }, CONFIG.openDelay);
}

// ===== STAGE 3: CREATE SURPRISES =====
function createSurprises() {
  const balloonColors = ["red", "green", "gold", "blue", "purple"];
  const balloonCount = 15;

  for (let i = 0; i < balloonCount; i++) {
    setTimeout(() => {
      const balloon = document.createElement("div");
      balloon.className = `balloon ${balloonColors[i % balloonColors.length]}`;

      const startX = Math.random() * 100;
      balloon.style.left = `${startX}%`;

      const duration = 2 + Math.random() * 2;
      const floatDistance = 80 + Math.random() * 40;
      const swayAmount = Math.random() * 100 - 50;

      balloon.style.animation = `
                floatUp ${duration}s ease-out forwards,
                sway ${duration / 2}s ease-in-out infinite alternate
            `;

      balloon.style.setProperty("--float-distance", `-${floatDistance}vh`);
      balloon.style.setProperty("--sway-amount", `${swayAmount}px`);

      surpriseContainer.appendChild(balloon);

      setTimeout(() => balloon.remove(), duration * 1000);
    }, i * 100);
  }

  // createConfettiBurst();
}

// Music
// Add this function - GUARANTEED AUTO-PLAY
// Replace your playChristmasMusicAuto() with this test:
function playChristmasMusicAuto() {
  console.log("🎵 Playing Christmas music...");
  
  const music = new Audio();
  let fileLoaded = false;
  
  // Try your local file first
  music.src = "sounds/jingleBell.mp3";
  
  // If local file fails, use backup URL
  music.addEventListener('error', function() {
    if (!fileLoaded) {
      console.log("Local file failed, using backup URL...");
      music.src = "https://assets.mixkit.co/music/preview/mixkit-jingle-bells-311.mp3";
      fileLoaded = true;
      music.load(); // Reload with new source
      
      // Try to play again
      setTimeout(() => {
        music.play().catch(e => {
          console.log("Backup also failed, showing button");
          showMusicButton(music);
        });
      }, 100);
    }
  });
  
  // Try to play
  music.loop = true;
  music.volume = 0.4;
  
  music.play().then(() => {
    console.log("✅ Music playing!");
    window.christmasMusic = music;
  }).catch(e => {
    console.log("Play rejected:", e);
    showMusicButton(music);
  });
}

function createConfettiBurst() {
  if (typeof confetti !== "function") return;

  const christmasColors = ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"];

  confetti({
    particleCount: 65,
    spread: 100,
    // ADJUST Y HERE: 
    // 0.4 moves the "pop" higher up so it clears the box body
    origin: { x: 0.5, y: 0.4 }, 
    colors: christmasColors,
    startVelocity: 50, // More "boom" to push it higher
    gravity: 0.9,      // Lower gravity so it stays in the air longer
    ticks: 300,
    shapes: ['square'],
    scalar: 1.2,
    zIndex: 999
  });
}

// CSS for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes floatUp {
        from {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        to {
            opacity: 0.8;
            transform: translateY(var(--float-distance)) rotate(360deg);
        }
    }
    
    @keyframes sway {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(var(--sway-amount));
        }
    }
`;
document.head.appendChild(styleSheet);

// ===== STAGE 4: PHOTO SLIDESHOW =====
function startPhotoSlideshow() {
  currentStage = 4;

  giftBox.style.transition = "opacity 1s ease";
  giftBox.style.opacity = "0";

  surpriseContainer.style.transition = "opacity 1s ease";
  surpriseContainer.style.opacity = "0";

  slideshowContainer.style.transition = "opacity 1.2s ease";
  slideshowContainer.style.opacity = "0";
  slideshowContainer.classList.add("active");
  setTimeout(() => {
    slideshowContainer.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    giftBox.style.display = "none";
    surpriseContainer.innerHTML = "";
  }, 1500);

  slideshowContainer.classList.add("active");

  // Filter out videos for slideshow
  const imageItems = CONFIG.photos.filter(photo => {
    const src = photo.src.toLowerCase();
    return !src.endsWith('.mp4') && 
           !src.endsWith('.webm') && 
           !src.endsWith('.mov');
  });

  // Store videos separately for scatter stage
  const videoItems = CONFIG.photos.filter(photo => {
    const src = photo.src.toLowerCase();
    return src.endsWith('.mp4') || 
           src.endsWith('.webm') || 
           src.endsWith('.mov');
  });

  // Display only images in slideshow
  imageItems.forEach((photo, index) => {
    const frame = document.createElement("div");
    frame.className = "photo-frame";
    frame.dataset.index = index;
    
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;
    img.onerror = function () {
      this.src = "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80";
    };
    
    frame.appendChild(img);
    slideshowTrack.appendChild(frame);
  });

  showPhoto(0);

  // Use only image count for slideshow
  const totalImages = imageItems.length;
  
  // If there are no images but we have videos, show a special message
  if (totalImages === 0 && videoItems.length > 0) {
    const messageFrame = document.createElement("div");
    messageFrame.className = "photo-frame active";
    messageFrame.style.display = "flex";
    messageFrame.style.alignItems = "center";
    messageFrame.style.justifyContent = "center";
    messageFrame.style.flexDirection = "column";
    messageFrame.style.gap = "20px";
    messageFrame.innerHTML = `
      <div style="font-size: 3rem;">🎬</div>
      <div style="text-align: center;">
        <div style="font-size: 1.8rem; font-weight: bold; color: #e63946; margin-bottom: 10px;">
          Video Memories Coming Up!
        </div>
        <div style="font-size: 1.2rem; color: #555;">
          Your Christmas videos will play in the next stage
        </div>
      </div>
    `;
    slideshowTrack.appendChild(messageFrame);
  }

  const photosToShow = Math.min(
    totalImages || 1, // At least 1 even if no images
    Math.floor(CONFIG.slideshowDuration / CONFIG.slideshowSpeed)
  );

  let photoCounter = 0;
  let currentPhotoIndex = 0;
  
  slideshowInterval = setInterval(() => {
    photoCounter++;
    
    if (totalImages > 0) {
      currentPhotoIndex = (currentPhotoIndex + 1) % totalImages;
      showPhoto(currentPhotoIndex);
    }
    
    currentCount.textContent = Math.min(photoCounter + 1, totalImages || 0);

    if (photoCounter >= photosToShow) {
      clearInterval(slideshowInterval);

      setTimeout(() => {
        slideshowContainer.classList.remove("active");
        startScatterStage();
      }, 500);
    }
  }, CONFIG.slideshowSpeed);
}

// ===== STAGE 4.5: SCATTER STAGE =====
function startScatterStage() {
  currentStage = 4.5;

  const scatterContainer = document.getElementById("scatterStage");
  scatterContainer.style.opacity = "1";
  scatterContainer.style.display = "block";
  scatterContainer.style.position = "relative";
  scatterContainer.innerHTML = "";

  // Add greeting in the center
  const greeting = document.createElement("div");
greeting.className = "enhanced-greeting"; // use your CSS class
greeting.innerHTML = `
  <div class="greeting-main">Merry Christmas!</div>
  <div class="greeting-sub">Wishing you joy and laughter 🎄</div>
`;
scatterContainer.appendChild(greeting);

  if (window.innerWidth < 480) {
    greeting.style.fontSize = "2.5rem";
  } else if (window.innerWidth < 768) {
    greeting.style.fontSize = "3rem";
  } else if (window.innerWidth < 1024) {
    greeting.style.fontSize = "3.5rem";
  } else {
    greeting.style.fontSize = "4rem";
  }

  scatterContainer.appendChild(greeting);

  setTimeout(() => {
  greeting.classList.add("show");
}, 100);

  setTimeout(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mediaItems = CONFIG.photos;

    // Define media size based on screen
    let mediaWidth;
    if (vw < 480) {
      mediaWidth = vw * 0.3;
    } else if (vw < 768) {
      mediaWidth = vw * 0.25;
    } else if (vw < 1024) {
      mediaWidth = vw * 0.22;
    } else {
      mediaWidth = Math.min(250, vw / 5);
    }
    
    const mediaHeight = mediaWidth * 0.75;
    
    // Create a spiral layout
    const centerX = vw / 2;
    const centerY = vh / 2;
    
    const angleStep = (2 * Math.PI) / 8;
    const radiusStep = Math.max(mediaWidth, mediaHeight) * 1.5;
    
    // Generate spiral positions
    const spiralPositions = [];
    let radius = radiusStep * 2;
    let angle = 0;
    
    for (let i = 0; i < mediaItems.length * 2; i++) {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (x >= mediaWidth/2 && x <= vw - mediaWidth/2 && 
          y >= mediaHeight/2 && y <= vh - mediaHeight/2) {
        spiralPositions.push({
          x: x - mediaWidth/2,
          y: y - mediaHeight/2,
          radius: Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
        });
      }
      
      angle += angleStep;
      if (i % 8 === 0 && i > 0) {
        radius += radiusStep;
        angle += Math.PI / 16;
      }
    }
    
    spiralPositions.sort((a, b) => b.radius - a.radius);
    
    // Shuffle media items
    const shuffledItems = [...mediaItems];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }
    
    // Track placed media for overlap check
    const placedMedia = [];
    
    shuffledItems.forEach((item, index) => {
      setTimeout(() => {
        let mediaElement;
        const rotation = Math.random() * 20 - 10;
        
        // Check if it's a video by file extension
        const isVideo = item.src && item.src.toLowerCase().endsWith('.mp4');
        
        if (isVideo) {
          // Create video element
          mediaElement = document.createElement("video");
          mediaElement.src = item.src;
          mediaElement.muted = true; // Required for autoplay in most browsers
          mediaElement.loop = true;
          mediaElement.playsInline = true; // Important for mobile
          mediaElement.controls = true; // Show controls for user interaction
          
          // Style the video
          mediaElement.style.objectFit = "cover";
          mediaElement.style.backgroundColor = "#000";
          mediaElement.style.width = `${mediaWidth}px`;
          mediaElement.style.height = `${mediaHeight}px`;
          mediaElement.style.transform = `rotate(${rotation}deg)`;
          mediaElement.style.borderRadius = "8px";
          mediaElement.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
          mediaElement.style.border = "4px solid white";
          mediaElement.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.2))";
          mediaElement.style.opacity = "0";
          mediaElement.style.transition = "opacity 0.8s ease, transform 0.5s ease";
          mediaElement.style.zIndex = "5";
          
          // Try to autoplay (muted)
          setTimeout(() => {
            mediaElement.play().catch(e => {
              console.log("Video autoplay prevented:", e);
              // Add a play button overlay if autoplay fails
              const playOverlay = document.createElement("div");
              playOverlay.style.position = "absolute";
              playOverlay.style.top = "0";
              playOverlay.style.left = "0";
              playOverlay.style.width = "100%";
              playOverlay.style.height = "100%";
              playOverlay.style.background = "rgba(0,0,0,0.3)";
              playOverlay.style.display = "flex";
              playOverlay.style.alignItems = "center";
              playOverlay.style.justifyContent = "center";
              playOverlay.style.cursor = "pointer";
              playOverlay.style.borderRadius = "4px";
              
              const playIcon = document.createElement("div");
              playIcon.innerHTML = "▶";
              playIcon.style.fontSize = "2rem";
              playIcon.style.color = "white";
              playIcon.style.textShadow = "0 2px 5px rgba(0,0,0,0.5)";
              
              playOverlay.appendChild(playIcon);
              mediaElement.parentNode.style.position = "relative";
              mediaElement.parentNode.appendChild(playOverlay);
              
              playOverlay.addEventListener("click", function() {
                mediaElement.play();
                playOverlay.remove();
              });
            });
          }, 1000);
          
        } else {
          // Create image element
          mediaElement = document.createElement("img");
          mediaElement.src = item.src;
          mediaElement.alt = item.caption || "";
          
          // Style for image
          mediaElement.style.objectFit = "cover";
          mediaElement.style.objectPosition = "center";
          mediaElement.style.backgroundColor = "#f0f0f0";
          mediaElement.style.width = `${mediaWidth}px`;
          mediaElement.style.height = `${mediaHeight}px`;
          mediaElement.style.transform = `rotate(${rotation}deg)`;
          mediaElement.style.borderRadius = "8px";
          mediaElement.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
          mediaElement.style.border = "4px solid white";
          mediaElement.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.2))";
          mediaElement.style.opacity = "0";
          mediaElement.style.transition = "opacity 0.8s ease, transform 0.5s ease";
          mediaElement.style.zIndex = "5";
        }
        
        // Common styles
        mediaElement.style.position = "absolute";
        
        // Get position from spiral or calculate fallback
        let posX, posY;
        
        if (index < spiralPositions.length) {
          posX = spiralPositions[index].x;
          posY = spiralPositions[index].y;
        } else {
          const gridCols = Math.floor(vw / (mediaWidth * 1.5));
          const gridRows = Math.floor(vh / (mediaHeight * 1.5));
          const col = index % gridCols;
          const row = Math.floor(index / gridCols);
          
          if (row < gridRows) {
            posX = (col + 0.5) * (vw / gridCols) - mediaWidth/2;
            posY = (row + 0.5) * (vh / gridRows) - mediaHeight/2;
          } else {
            posX = Math.random() * (vw - mediaWidth - 40) + 20;
            posY = Math.random() * (vh - mediaHeight - 40) + 20;
          }
        }
        
        // Final adjustment to avoid overlaps
        let adjustedX = posX;
        let adjustedY = posY;
        
        for (const placed of placedMedia) {
          const dx = Math.abs(adjustedX - placed.x);
          const dy = Math.abs(adjustedY - placed.y);
          
          if (dx < mediaWidth && dy < mediaHeight) {
            const pushDistance = Math.max(mediaWidth, mediaHeight) * 1.1;
            
            if (dx < dy) {
              adjustedX += (adjustedX < placed.x ? -1 : 1) * pushDistance;
            } else {
              adjustedY += (adjustedY < placed.y ? -1 : 1) * pushDistance;
            }
            
            adjustedX = Math.max(20, Math.min(vw - mediaWidth - 20, adjustedX));
            adjustedY = Math.max(20, Math.min(vh - mediaHeight - 20, adjustedY));
          }
        }
        
        // Store position
        placedMedia.push({ x: adjustedX, y: adjustedY, width: mediaWidth, height: mediaHeight });
        
        // Set position
        mediaElement.style.left = `${adjustedX}px`;
        mediaElement.style.top = `${adjustedY}px`;
        
        // Add to container
        scatterContainer.appendChild(mediaElement);
        
        // Fade in
        setTimeout(() => {
          mediaElement.style.opacity = "1";
        }, 50 + (index % 5) * 50);
        
      }, index * 150);
    });

    // AFTER SCATTER, GO STRAIGHT TO SNOWFALL
    setTimeout(() => {
      startSnowfall();
    }, mediaItems.length * 200 + 1500);
  }, 500);
}


// Optional: Adjust positions on resize
window.addEventListener("resize", () => {
  if (currentStage === 4.5) startScatterStage();
});

function showPhoto(index) {
  document.querySelectorAll(".photo-frame").forEach((frame) => {
    frame.classList.remove("active");
  });

  const currentFrame = document.querySelector(
    `.photo-frame[data-index="${index}"]`
  );
  if (currentFrame) {
    currentFrame.classList.add("active");
  }
}

// ===== FINAL EFFECT: SNOWFALL =====
function startSnowfall() {
  currentStage = 6;

  // Ensure snowfall is above scatter images
  snowfall.style.display = "block";
  snowfall.style.opacity = "1";
  snowfall.style.zIndex = "999"; // Above scatter images (z-index: 5)
  snowfall.style.pointerEvents = "none";

  // Optional: Add dim background for snow contrast
  const snowBg = document.createElement("div");
  snowBg.style.position = "fixed";
  snowBg.style.top = "0";
  snowBg.style.left = "0";
  snowBg.style.width = "100%";
  snowBg.style.height = "100%";
  snowBg.style.background =
    "linear-gradient(rgba(10, 46, 54, 0.3), rgba(10, 46, 54, 0.6))";
  snowBg.style.zIndex = "998";
  snowBg.style.pointerEvents = "none";
  document.body.appendChild(snowBg);

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";

    const size = Math.random() * 5 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.top = "-10px";

    snowflake.style.opacity = Math.random() * 0.7 + 0.3;
    snowflake.style.position = "absolute";
    snowflake.style.zIndex = "1000";

    snowfall.appendChild(snowflake);

    const duration = Math.random() * 5 + 5;
    const drift = (Math.random() - 0.5) * 100;

    snowflake.animate(
      [
        { transform: `translate(0, 0)`, opacity: snowflake.style.opacity },
        { transform: `translate(${drift}px, 100vh)`, opacity: 0 },
      ],
      {
        duration: duration * 1000,
        easing: "linear",
      }
    );

    setTimeout(() => {
      if (snowflake.parentNode) snowflake.remove();
    }, duration * 1000);
  }

  // Create initial snowflakes
  for (let i = 0; i < 60; i++) {
    setTimeout(() => createSnowflake(), i * 100);
  }

  // Continue creating snowflakes
  setInterval(() => {
    if (Math.random() > 0.3) {
      createSnowflake();
    }
  }, 300);
}

// ===== SCATTER STEADY BIGGER PINK BOWS =====
const bowContainer = document.createElement("div");
bowContainer.id = "backgroundBows";
bowContainer.style.position = "fixed";
bowContainer.style.top = "0";
bowContainer.style.left = "0";
bowContainer.style.width = "100%";
bowContainer.style.height = "100%";
bowContainer.style.pointerEvents = "none";
bowContainer.style.zIndex = "1"; // behind main content
document.body.appendChild(bowContainer);

const bowImages = [
  "images/bow1.png",
  "images/Teddy1.png",
  "images/Teddy2.png",
  "images/bow2.png"
]; // add more PNGs if needed

function scatterBowPNGs(count = 30, extraLargeCount = 5) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Determine spacing to spread evenly
  const cols = Math.ceil(Math.sqrt(count * (vw / vh)));
  const rows = Math.ceil(count / cols);
  const cellWidth = vw / cols;
  const cellHeight = vh / rows;

  let bowIndex = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (bowIndex >= count) break;

      const bow = document.createElement("img");
      bow.src = bowImages[Math.floor(Math.random() * bowImages.length)];
      bow.className = "bg-bow";
      bow.style.position = "absolute";

      // Randomize position inside each grid cell
      const x = c * cellWidth + Math.random() * (cellWidth - 50);
      const y = r * cellHeight + Math.random() * (cellHeight - 50);

      bow.style.left = `${x}px`;
      bow.style.top = `${y}px`;

      // Decide scale
      let scale;
      if (bowIndex < extraLargeCount) {
        scale = 2.5 + Math.random() * 1.0; // extra-large bows
      } else {
        scale = 1.2 + Math.random() * 1.5; // normal bows
      }

      const rotation = Math.random() * 360;
      bow.style.transform = `rotate(${rotation}deg) scale(${scale})`;

      bowContainer.appendChild(bow);
      bowIndex++;
    }
  }
}

// ===== START THE EXPERIENCE =====
document.addEventListener("DOMContentLoaded", () => {
  init();
  scatterBowPNGs(30, 5);
});
