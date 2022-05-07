var dateFull = new Date();
var date = {
  year: dateFull.getFullYear(),
  month: dateFull.getMonth() + 1,
  calDay: dateFull.getDate(),
  day: dateFull.getUTCDay(),
  hour: dateFull.getHours(),
};
console.log(date.year, date.month, date.calDay, date.day, date.hour);
let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;

function colorSchemeSet() {
  let elems = {
    body: document.querySelector("body"),
    title: document.querySelector("#title"),
    subtitle: document.querySelector("#subtitle"),
    background: document.querySelector("#background"),
    condition: document.querySelector("#condition"),
    cloud: document.querySelector("#cloud"),
    stars: {
      morning: document.querySelector("#stars-morning"),
      night: document.querySelector("#stars-night"),
    },
  };
  let metadata = {
    theme: document.querySelector('meta[name="theme-color"]'),
    styles: document.querySelector('link[href="./css/style.css"]'),
  };

  // date.hour = 19;
  if (date.hour >= 5 && date.hour < 9) {
    elems.body.style.backgroundColor = "#33004f";
    elems.background.style.backgroundImage =
      "linear-gradient(180deg, rgba(51,0,79,1) 0%, rgba(177,72,38,1) 100%)";
    metadata.theme.setAttribute("content", "#33004f");
    elems.stars.morning.fadeIn(6000);
  } else if (date.hour >= 9 && date.hour < 12) {
    elems.body.style.backgroundColor = "#067bbb";
    elems.background.style.backgroundImage =
      "linear-gradient(180deg, rgba(6,123,187,1) 0%, rgba(174,207,219,1) 100%)";
    metadata.theme.setAttribute("content", "#067bbb");
  } else if (date.hour >= 12 && date.hour < 18) {
    elems.body.style.backgroundColor = "#067bbb";
    elems.background.style.backgroundImage =
      "linear-gradient(180deg, rgba(6,123,187,1) 0%, rgba(174,207,219,1) 100%)";
    metadata.theme.setAttribute("content", "#067bbb");
  } else if (date.hour >= 18 && date.hour < 22) {
    elems.body.style.backgroundColor = "#2a6ca1";
    elems.background.style.backgroundImage =
      "linear-gradient(0deg, rgba(255,177,177,1) 0%, rgba(226,218,187,1) 25%, rgba(184,214,228,1) 40%, rgba(42,108,161,1) 100%)";
    metadata.theme.setAttribute("content", "#2a6ca1");
  } else if (date.hour >= 22 || date.hour < 5) {
    elems.body.style.backgroundColor = "#13001d";
    elems.background.style.backgroundImage =
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)";
    elems.stars.night.fadeIn(6000);
    metadata.theme.setAttribute("content", "#13001d");
  }

  if (matched && date.hour < 22 && date.hour > 5) {
    elems.body.style.backgroundColor = "#13001d";
    elems.background.style.backgroundImage =
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)";
    metadata.theme.setAttribute("content", "#13001d");
    elems.stars.night.fadeIn(6000);
    console.log("Browser in dark mode, night color scheme applied.");
  } else if (matched) {
    console.log(
      "Browser in dark mode, but the default color scheme was applied."
    );
  } else {
    console.log("Browser in light mode, default color scheme applied.");
  }
}

function setDarkMode() {
  if (date.hour < 22 && date.hour > 5) {
    elems.body.style.backgroundColor = "#13001d";
    elems.background.style.backgroundImage =
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)";
    metadata.theme.setAttribute("content", "#13001d");
    elems.stars.night.fadeIn(400);
    console.log(
      "Browser in dark mode during the day, so the night color scheme applied."
    );
  } else {
    elems.body.style.backgroundColor = "#13001d";
    elems.background.style.backgroundImage =
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)";
    metadata.theme.setAttribute("content", "#13001d");
    elems.stars.night.fadeIn(400);
    console.log(
      "Browser in light mode at night, so the night color scheme was applied."
    );
  }
}
function setLightMode() {
  colorSchemeSet();
  elems.stars.night.fadeOut(400);
}
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => e.matches && setDarkMode());
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (e) => e.matches && setLightMode());

window.addEventListener("DOMContentLoaded", (event) => {
  colorSchemeSet();

  let rand = Math.floor(Math.random() * 3) + 1;
  // console.log(rand);

  let mainURL = window.location.protocol + "//" + window.location.hostname;
  if (window.location.port) {
    mainURL = mainURL + ":" + window.location.port;
  }
  switch (rand) {
    case 1:
      document.querySelector("#cloud").src =
        mainURL + "/images/png/front/cloud1.png";
      break;
    case 2:
      document.querySelector("#cloud").src =
        mainURL + "/images/png/front/cloud2.png";
      break;
    case 3:
      document.querySelector("#cloud").src =
        mainURL + "/images/png/front/cloud3.png";
      break;
  }
});

let i = 0;
let j = 0;

window.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  let loadtl = gsap.timeline({ delay: 0.5 });
  loadtl.fromTo("#background", { opacity: 0 }, { opacity: 1, duration: 4 });
  // loadtl.fromTo("#scrollDown", { opacity: 0 }, { opacity: 1, duration: 2 }, "<");
  // loadtl.to("#header", { overflow: "hidden", duration: 0 }, "<");
  loadtl.fromTo(
    "#title, #subtitle, #condition, #cloudContainer, #scrollDown",
    { opacity: 0, filter: "blur(20px)", transform: "scale(1.1)", y: 0 },
    {
      opacity: 1,
      filter: "blur(0px)",
      transform: "scale(1)",
      y: 0,
      duration: 2,
      ease: "power3.out",
    },
    "<"
  );

  window.addEventListener("scroll", finishAnimation, false);
  function finishAnimation() {
    loadtl.timeScale(10);
    console.log("Finishing animation...");
    window.removeEventListener("scroll", finishAnimation, false);
  }
});
