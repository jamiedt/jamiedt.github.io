const stardust = document.querySelector("#stardust");

const play_video = document.querySelector("#play_video");

const pause_video = document.querySelector("#pause_video");

play_video.addEventListener("click", play_vid);

pause_video.addEventListener("click", pause_vid);

function play_vid() {
  stardust.play();
}

function pause_vid() {
  stardust.pause();
}
