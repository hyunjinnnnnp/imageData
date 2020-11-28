let canPlay;
let applyEffect;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("StartButton");
const toggleButton = document.getElementById("ToggleButton");
const video = document.getElementById("SourceVideo");

function init() {
  video.muted = true;

  if (video.readyState >= 3) {
    readyToPlay();
  } else {
    video.addEventListener("canplay", readyToPlay);
  }

  startButton.addEventListener("click", function () {
    console.log(canPlay);
    if (!canPlay) return;
    // Play video
    video.play();

    drawFrame(video);
  });

  toggleButton.addEventListener("click", function () {
    applyEffect = !applyEffect;
  });
}

function readyToPlay() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canPlay = true;
}
// canvas.addEventListener("move", (e) => {

// const x = e.layerX;
// const y = e.layerY;
// });
function drawFrame(video) {
  ctx.drawImage(video, 0, 0);

  if (applyEffect) {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    invertColors(imageData.data);

    ctx.putImageData(imageData, 0, 0);
  }

  setTimeout(function () {
    drawFrame(video);
  }, 10);
}

function invertColors(data) {
  for (let i = 0; i < data.length; i += 4) {
    // let r = data[i];
    // let g = data[i + 1];
    // let b = data[i + 2];
    // let brightness = (2 * r + 4 * g + b) >>> 3;
    // data[i] = brightness;
    // data[i + 1] = brightness;
    // data[i + 2] = brightness;
    data[i] = data[i] ^ 55; // Invert Red
    data[i + 1] = data[i + 1] ^ 255; // Invert Green
    data[i + 2] = data[i + 2] ^ 255; // Invert Blue
  }
}

window.addEventListener("load", init);
