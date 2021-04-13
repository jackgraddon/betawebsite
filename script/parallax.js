var md = new MobileDetect(window.navigator.userAgent);

if (md.mobile() != null) {
  const titleCont = document.querySelectorAll("#titleContainer");
  const titleText = document.querySelectorAll("#aboutText");
  const body = document.querySelectorAll(".body");
  // const buttons = document.querySelectorAll(".btn");
  const background = document.querySelectorAll("#background");
  const backgroundInfo = document.querySelectorAll("#backgroundInfo");

  function handleOrientation(event) {
    var yValue = event.beta - 90; // In degree in the range [-180,180]
    var xValue = event.gamma; // In degree in the range [-90,90]
    // To make computation easier we shift the range of
    // x and y to [0,180]
    xValue += 90;
    yValue += 180;

    [].forEach.call(titleCont, (input) => {
      input.style.transform = `translateX(${-xValue * 0.7}px) translateY(${
        -yValue * 0.7
      }px)`;
      // input.style.transform = `translateX(0) translateY(0)`;
    });
    [].forEach.call(titleText, (input) => {
      input.style.transform = `translateX(${-xValue * 0.5}px) translateY(${
        -yValue * 0.5
      }px)`;
    });
    [].forEach.call(body, (input) => {
      input.style.transform = `translateX(${-xValue * 0.3}px) translateY(${
        -yValue * 0.3
      }px)`;
    });

    // Backround
    [].forEach.call(background, (input) => {
      input.style.backgroundPosition = `${xValue * 0.02}vw ${yValue * 0.02}vh`;
    });
    [].forEach.call(backgroundInfo, (input) => {
      input.style.transform = `translateX(${xValue * 0.3}px) translateY(${
        yValue * 0.3
      }px)`;
    });
  }
  window.addEventListener("deviceorientation", handleOrientation, true);
} else {
  const titleCont = document.querySelectorAll("#titleContainer");
  const titleText = document.querySelectorAll("#aboutText");
  const body = document.querySelectorAll(".body");
  // const buttons = document.querySelectorAll(".btn");
  const background = document.querySelectorAll("#background");
  const backgroundInfo = document.querySelectorAll("#backgroundInfo");
  const range = 20;

  const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

  let timeout;
  document.addEventListener(
    "mousemove",
    ({ x, y }) => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);

        [].forEach.call(titleCont, (input) => {
          input.style.transform = `translateX(${-xValue * 0.7}px) translateY(${
            -yValue * 0.7
          }px)`;
          // input.style.transform = `translateX(0) translateY(0)`;
        });
        [].forEach.call(titleText, (input) => {
          input.style.transform = `translateX(${-xValue * 0.5}px) translateY(${
            -yValue * 0.5
          }px)`;
        });
        [].forEach.call(body, (input) => {
          input.style.transform = `translateX(${-xValue * 0.3}px) translateY(${
            -yValue * 0.3
          }px)`;
        });

        // Backround
        [].forEach.call(background, (input) => {
          input.style.backgroundPosition = `${xValue * 0.02}vw ${
            yValue * 0.02
          }vh`;
        });
        [].forEach.call(backgroundInfo, (input) => {
          input.style.transform = `translateX(${xValue * 0.3}px) translateY(${
            yValue * 0.3
          }px)`;
        });
      });
    },
    false
  );
}
