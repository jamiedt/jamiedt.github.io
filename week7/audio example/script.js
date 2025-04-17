const airport = document.querySelector("#airport");
console.log(airport);

const play_airport = document.querySelector("#play_airport");
console.log(play_airport);

const pause_airport = document.querySelector("#pause_airport");
console.log(pause_airport);

play_airport.addEventListener("click", play_audio);

pause_airport.addEventListener("click", pause_audio);

function play_audio() {
  airport.play();
}

function pause_audio() {
  airport.pause();
}

const pop = document.querySelector("#pop");
console.log(pop);

const play_pop = document.querySelector("#play_pop");
console.log(play_pop);

play_pop.addEventListener("click", play_pop_audio);

function play_pop_audio() {
  pop.play();
}
