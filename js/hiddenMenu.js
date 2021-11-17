window.addEventListener("load", () => {
  let nav = document.createElement("nav");
  nav.id = "headerNavbar";
  nav.style.opacity = "0";
  nav.style.display = "none";
  nav.innerHTML =
    '<div style="width: fit-content; z-index: 5;"> <ul class="nav justify-content-center"> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/">Home</a> </li> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/about">About</a></li> </ul> <h3 style="width: fit-content;" class="mx-auto my-2">Go To</h3> <ul class="nav justify-content-center"> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/projects/">Projects</a> </li> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/legals/">Legal</a> </li> </ul> </ul> </div> <div id="headerNavBG"></div>';
  document.querySelector("body").append(nav);
  gsap.registerPlugin(ScrollTrigger);
});

// Hidden Menu
document.onmousemove = handleMouseMove;
let mousePos = {
  x: 0,
  y: 0,
};
function handleMouseMove(e) {
  mousePos = {
    x: e.clientX,
    y: e.clientY,
  };
}
// setInterval(getMousePos, 100);
function getMousePos() {
  let elemWidth = document.getElementById("headerNavbar").clientWidth;
  let elemHeight = document.getElementById("headerNavbar").clientHeight;
  let pos = mousePos;
  gsap.to("#headerNavbar", {
    y: pos.y - elemHeight / 2,
    x: pos.x - elemWidth / 2,
    duration: 0,
  });
}
let hide,
  firstTime = true;

window.addEventListener("keypress", (e) => {
  if (e.key == "Escape") {
    clearTimeout(hide);
    let nav = document.getElementById("headerNavbar");

    nav.style.display = "block";
    if (firstTime) {
      getMousePos();
      gsap.to("#headerNavbar", { opacity: 1, duration: 1, ease: "power1" });
      firstTime = false;
    } else {
      gsap.to("#headerNavbar", { opacity: 0, duration: 0.3, ease: "power1" });
      setTimeout(() => {
        getMousePos();
        gsap.to("#headerNavbar", { opacity: 1, duration: 1, ease: "power1" });
      }, 300);
    }
    hide = setTimeout(() => {
      gsap.to("#headerNavbar", { opacity: 0, duration: 1, ease: "power1" });
      setTimeout(() => {
        nav.style.display = "none";
      }, 1000);
    }, 5000);
  }
});
function onLongTouch() {
  clearTimeout(hide);
  let nav = document.getElementById("headerNavbar");

  nav.style.display = "block";
  if (firstTime) {
    getMousePos();
    gsap.to("#headerNavbar", { opacity: 1, duration: 1, ease: "power1" });
    firstTime = false;
  } else {
    gsap.to("#headerNavbar", { opacity: 0, duration: 0.3, ease: "power1" });
    setTimeout(() => {
      getMousePos();
      gsap.to("#headerNavbar", { opacity: 1, duration: 1, ease: "power1" });
    }, 300);
  }
  hide = setTimeout(() => {
    gsap.to("#headerNavbar", { opacity: 0, duration: 1, ease: "power1" });
    setTimeout(() => {
      nav.style.display = "none";
    }, 1000);
  }, 5000);
}

var timer;

window.addEventListener("touchstart", (e) => {
  if (
    e.type == "touchstart" ||
    e.type == "touchmove" ||
    e.type == "touchend" ||
    e.type == "touchcancel"
  ) {
    var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    mousePos.x = touch.clientX;
    mousePos.y = touch.clientY;
  }
  timer = setTimeout(onLongTouch, 300);
});
window.addEventListener("touchend", touchend);

function touchend() {
  console.log("touch end");
  // Stops short touches from firing the event
  clearTimeout(timer);
}

window.addEventListener("scroll", () => {
  gsap.to("#headerNavbar", { opacity: 0, duration: 0.3, ease: "power1" });
});
