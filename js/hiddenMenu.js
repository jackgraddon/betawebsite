window.addEventListener("load", () => {
  let nav = document.createElement("nav");
  nav.id = "floatingNav";
  nav.style.opacity = "0";
  nav.style.display = "none";
  // nav.innerHTML =
  //   '<div style="width: fit-content; z-index: 5;"> <ul class="nav justify-content-center"> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/">Home</a> </li> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/about">About</a></li> </ul> <h3 style="width: fit-content;" class="mx-auto my-2">Go To</h3> <ul class="nav justify-content-center"> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/projects/">Projects</a> </li> <li class="nav-item"> <a class="nav-link" href="https://beta.jackgraddon.page/legals/">Legal</a> </li> </ul> </ul> </div> <div id="headerNavBG"></div>';

  let mainURL = window.location.protocol + "//" + window.location.hostname;
  if (mainURL.includes("localhost")) {
    mainURL = mainURL + ":" + window.location.port;
  }
  console.log(mainURL);

  let navDiv = document.createElement("div");
  navDiv.style.width = "fit-content";
  navDiv.style.zIndex = "5";
  nav.appendChild(navDiv);

  let navbartop = document.createElement("ul");
  navbartop.classList.add("nav");
  navbartop.classList.add("justify-content-center");
  navDiv.appendChild(navbartop);

  let title = document.createElement("h3");
  title.classList.add("mx-auto");
  title.classList.add("my-2");
  title.style.width = "fit-content";
  title.innerHTML = "Go To";
  navDiv.appendChild(title);

  let navbarbottom = document.createElement("ul");
  navbarbottom.classList.add("nav");
  navbarbottom.classList.add("justify-content-center");
  navDiv.appendChild(navbarbottom);

  let linkContainers = [];
  for (let i = 0; i < 4; i++) {
    linkContainers[i] = document.createElement("li");
    linkContainers[i].classList.add("nav-item");
  }

  let homeLink = document.createElement("a");
  homeLink.classList.add("nav-link");
  homeLink.href = mainURL;
  homeLink.innerHTML = "Home";

  let aboutLink = document.createElement("a");
  aboutLink.classList.add("nav-link");
  aboutLink.href = mainURL + "/about/";
  aboutLink.innerHTML = "About";

  let projectsLink = document.createElement("a");
  projectsLink.classList.add("nav-link");
  projectsLink.href = mainURL + "/projects/";
  projectsLink.innerHTML = "Projects";

  let legalsLink = document.createElement("a");
  legalsLink.classList.add("nav-link");
  legalsLink.href = mainURL + "/legal/";
  legalsLink.innerHTML = "Legals";

  linkContainers[0].appendChild(homeLink);
  linkContainers[1].appendChild(aboutLink);
  linkContainers[2].appendChild(projectsLink);
  linkContainers[3].appendChild(legalsLink);

  for (let i = 0; i < 4; i++) {
    if (i < 2) {
      navbartop.appendChild(linkContainers[i]);
    } else {
      navbarbottom.appendChild(linkContainers[i]);
    }
    console.log(linkContainers[i]);
  }
  let headerNavBG = document.createElement("div");
  headerNavBG.id = "floatingNavBG";
  nav.appendChild(headerNavBG);
  try {
    document.querySelector("body").append(nav);
    console.log("nav appended");
  } catch (e) {
    console.log("nav not appended");
  }
  gsap.registerPlugin(ScrollTrigger);
});

// Hidden Menu
document.addEventListener("mousemove", (e) => {
  handleMouseMove(e);
});
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

function getmousePos() {
  let elemWidth = document.getElementById("floatingNav").clientWidth;
  let elemHeight = document.getElementById("floatingNav").clientHeight;
  gsap.to("#floatingNav", {
    y: mousePos.y - elemHeight / 2,
    x: mousePos.x - elemWidth / 2,
    duration: 0,
  });
}
let hidden,
  firstNavTrigger = true;

window.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (e.key == "Escape") {
    console.log("yo");
    clearTimeout(hidden);
    let nav = document.querySelector("#floatingNav");

    nav.style.display = "block";
    if (firstNavTrigger) {
      getmousePos();
      gsap.to(nav, { opacity: 1, duration: 1, ease: "power1" });
      firstNavTrigger = false;
    } else {
      gsap.to(nav, { opacity: 0, duration: 0.3, ease: "power1" });
      setTimeout(() => {
        getmousePos();
        gsap.to(nav, { opacity: 1, duration: 1, ease: "power1" });
      }, 300);
    }
    hidden = setTimeout(() => {
      gsap.to(nav, { opacity: 0, duration: 1, ease: "power1" });
      setTimeout(() => {
        nav.style.display = "none";
      }, 1000);
    }, 5000);
  }
});
function onLongTouch() {
  clearTimeout(hidden);
  let nav = document.getElementById("floatingNav");

  nav.style.display = "block";
  if (firstNavTrigger) {
    getmousePos();
    gsap.to(nav, { opacity: 1, duration: 1, ease: "power1" });
    firstNavTrigger = false;
  } else {
    gsap.to(nav, { opacity: 0, duration: 0.3, ease: "power1" });
    setTimeout(() => {
      getmousePos();
      gsap.to(nav, { opacity: 1, duration: 1, ease: "power1" });
    }, 300);
  }
  hidden = setTimeout(() => {
    gsap.to(nav, { opacity: 0, duration: 1, ease: "power1" });
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
  timer = setTimeout(onLongTouch, 600);
});
window.addEventListener("touchend", touchend);

function touchend() {
  console.log("touch end");
  // Stops short touches from firing the event
  clearTimeout(timer);
}

window.addEventListener("scroll", () => {
  let nav = document.getElementById("floatingNav");
  gsap.to(nav, { opacity: 0, duration: 0.3, ease: "power1" });
});
