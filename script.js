document.title = "Eppo";
let maxtitle = 6;
let possition = maxtitle / 2;
let filchar = ":";
const typehere = document.querySelector(".type--here");

let movetitle = function () {
  let output = "";
  for (let i = 0; i < possition; i++) output += filchar;
  output += ".Eppo.";
  for (let i = 0; i < maxtitle - possition; i++) output += filchar;
  document.title = output;
  if (possition < maxtitle) possition++;
  if (possition === maxtitle) possition = 1;
};

movetitle();
setInterval(() => {
  movetitle();
}, 2000);

document.addEventListener("keydown", function (e) {
  console.log(e.key.length);
  if (e.key === "Escape")
    document.querySelector(".type--here").textContent = "";
  if (e.key.length === 1)
    document.querySelector(".type--here").textContent += e.key;
  if (e.key === "Backspace")
    document.querySelector(".type--here").textContent = document
      .querySelector(".type--here")
      .textContent.slice(0, -1);
});
