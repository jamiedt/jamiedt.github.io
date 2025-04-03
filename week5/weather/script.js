function checkWeather() {
  let temp = document.querySelector("#myTemp").value;
  let body = document.querySelector("body");
  if (temp > 20) {
    console.log(temp + "? woah thats hot");
    body.style.backgroundColor = "red";
  } else if (temp <= 20 && temp > 0) {
    console.log(temp + "? niceeeeee");
    body.style.backgroundColor = "green";
  } else {
    console.log(temp + "? yikers bit cold innit");
    body.style.backgroundColor = "blue";
  }
}
