var dateFull = new Date(); // Get full date
var date = {
  // Turn this in to an Array
  year: dateFull.getFullYear(),
  month: dateFull.getMonth() + 1,
  calDay: dateFull.getDate(),
  day: dateFull.getUTCDay(),
  hour: dateFull.getHours(),
};
console.log(date.year, date.month, date.calDay, date.day, date.hour);
let matched = window.matchMedia("(prefers-color-scheme: dark)").matches; // Get if dark mode is set

function colorSchemeSet() {
  // Getting element targets
  // let condition = document.getElementById("condition");
  let meta = document.querySelector('meta[name="theme-color"]');

  // date.hour = 2;
  if (date.hour >= 5 && date.hour < 9) {
    // If the hour is between 5am and 9am, set the background gradient to a sunrise

    $("body").css("background-color", "#33004f"); // Set background colour (in case gradient fails)
    $("#background").css(
      "background-image",
      "linear-gradient(180deg, rgba(51,0,79,1) 0%, rgba(177,72,38,1) 100%)"
    ); // Sunrise colours
    meta.setAttribute("content", "#33004f"); // Tell Safari (and other supported browsers) what the theme color is
    $("#starsMorn").fadeIn(6000); // Fade in morning stars (only active on morning and night)
    // The same format is applied to all below.
  } else if (date.hour >= 9 && date.hour < 12) {
    // Between 9am and Noon
    $("body").css("background-color", "#067bbb");
    $("#background").css(
      "background-image",
      "linear-gradient(180deg, rgba(6,123,187,1) 0%, rgba(174,207,219,1) 100%)"
    );
    meta.setAttribute("content", "#067bbb");
  } else if (date.hour >= 12 && date.hour < 18) {
    // Between Noon and 5pm
    $("body").css("background-color", "#067bbb");
    $("#background").css(
      "background-image",
      "linear-gradient(180deg, rgba(6,123,187,1) 0%, rgba(174,207,219,1) 100%)"
    );
    meta.setAttribute("content", "#067bbb");
  } else if (date.hour >= 18 && date.hour < 22) {
    // Between 5pm and 10pm
    $("body").css("background-color", "#2a6ca1");
    $("#background").css(
      "background-image",
      "linear-gradient(0deg, rgba(255,177,177,1) 0%, rgba(226,218,187,1) 25%, rgba(184,214,228,1) 40%, rgba(42,108,161,1) 100%)"
    );
    meta.setAttribute("content", "#2a6ca1");
  } else if (date.hour >= 22 || date.hour < 5) {
    // Between 10pm and 5am
    $("body").css("background-color", "#13001d");
    $("#background").css(
      "background-image",
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)"
    );
    $("#stars").fadeIn(6000);
    meta.setAttribute("content", "#13001d");
  }

  if (matched && date.hour < 22 && date.hour > 5) {
    // If in dark mode and it isnt night, set night theme
    $("body").css("background-color", "#13001d");
    $("#background").css(
      "background-image",
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)"
    );
    meta.setAttribute("content", "#13001d");
    $("#stars").fadeIn(6000);
    console.log("Browser in dark mode, night color scheme applied.");
  } else {
    // Logs that the theme was set in light mode
    console.log("Browser in light mode, default color scheme applied.");
  }
}

function setDarkMode() {
  // Function to call on theme change post-load
  // Getting target elements
  let title = document.getElementById("title");
  let subtitle = document.getElementById("subtitle");
  let body = document.getElementById("background");
  let condition = document.getElementById("condition");
  let meta = document.querySelector('meta[name="theme-color"]');
  if (date.hour < 22 && date.hour > 5) {
    // If dark mode during the day
    $("body").css("background-color", "#13001d");
    $("#background").css(
      "background-image",
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)"
    );
    meta.setAttribute("content", "#13001d");
    $("#stars").fadeIn(400);
    console.log(
      "Browser in dark mode during the day, so the night color scheme applied."
    );
  } else {
    // If dark mode during the night
    $("body").css("background-color", "#13001d");
    $("#background").css(
      "background-image",
      "linear-gradient(180deg, rgba(19,0,29,1) 0%, rgba(51,0,79,1) 100%)"
    );
    meta.setAttribute("content", "#13001d");
    $("#stars").fadeIn(400);
    console.log(
      "Browser in light mode at night, so the night color scheme was applied."
    );
  }
}

// Calls the larger function above and fades out stars if they were faded in
function setLightMode() {
  colorSchemeSet();
  $("#stars").fadeOut(400);
}

// Detect if the theme changes after the page loaded
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => e.matches && setDarkMode());
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (e) => e.matches && setLightMode());

// Onload things
window.addEventListener("DOMContentLoaded", (event) => {
  colorSchemeSet();

  // Get random number to choose which cloud image is loaded
  let rand = Math.floor(Math.random() * 3) + 1;
  console.log(rand);

  switch (
    rand // Set cloud
  ) {
    case 1:
      $("#cloud").attr("src", "../../images/png/front/cloud1.png");
      break;
    case 2:
      $("#cloud").attr("src", "../../images/png/front/cloud2.png");
      break;
    case 3:
      $("#cloud").attr("src", "../../images/png/front/cloud3.png");
      break;
  }
});

let i = 0;
let j = 0;
window.onscroll = function () {
  scrollFunction();
};

// Change between having scroll down and scroll up links visible
function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    while (i < 1) {
      $("#scrollDown").attr("opacity", "1").animate({ opacity: "0" }, 400);
      $("#downArrow").attr("opacity", "1").animate({ opacity: "0" }, 400);
      $("#scrollToTop").attr("opacity", "0").animate({ opacity: "1" }, 400);
      i++;
      j = 0;
    }
  } else if (
    document.body.scrollTop == 0 ||
    document.documentElement.scrollTop == 0
  ) {
    while (j < 1) {
      $("#scrollToTop").attr("opacity", "1").animate({ opacity: "0" }, 400);
      $("#scrollDown").attr("opacity", "0").animate({ opacity: "1" }, 400);
      $("#downArrow").attr("opacity", "0").animate({ opacity: "1" }, 400);
      j++;
      i = 0;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let loadtl = gsap.timeline({ delay: 0.5 });
  loadtl.fromTo("#background", { opacity: 0 }, { opacity: 1, duration: 4 });
  // loadtl.fromTo("#scrollDown", { opacity: 0 }, { opacity: 1, duration: 2 }, "<");
  loadtl.to("#header, body", { overflow: "hidden", duration: 0 }, "<");
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
  loadtl.to("#header, body", { overflowY: "scroll", duration: 0 }, "<+=2");
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.key == "Enter") {
        // alert('press enter');
        loadtl.timeScale(10);
        clearTimeout(scrollByTimer);
      }
    },
    false
  );
  window.addEventListener(
    "touchstart",
    () => {
      loadtl.timeScale(10);
      clearTimeout(scrollByTimer);
    },
    false
  );
});