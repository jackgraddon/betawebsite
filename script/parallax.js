if (
  /Android|webOS|iPhone|iPod|iPad|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // var title = document.querySelectorAll(".title");
  // var body = document.querySelectorAll(".body");
  // // const buttons = document.querySelectorAll(".btn");
  // function handleOrientation(event) {
  //   var y = event.beta - 90; // In degree in the range [-180,180]
  //   var x = event.gamma; // In degree in the range [-90,90]
  //   // To make computation easier we shift the range of
  //   // x and y to [0,180]
  //   x += 90;
  //   y += 90;
  //   title.style.transform = `translateX(${-xValue * 0.5}px) translateY(${
  //     -yValue * 0.5
  //   }px)`;
  //   body.style.transform = `translateX(${-xValue * 0.3}px) translateY(${
  //     -yValue * 0.3
  //   }px)`;
  // }
  // window.addEventListener("deviceorientation", handleOrientation, true);
} else {
  const title = document.querySelectorAll("#titleContainer");
  const body = document.querySelectorAll(".body");
  // const buttons = document.querySelectorAll(".btn");
  const background = document.querySelectorAll("#background");
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

        [].forEach.call(title, (input) => {
          input.style.transform = `translateX(${-xValue * 0.5}px) translateY(${
            -yValue * 0.5
          }px)`;
          // input.style.transform = `translateX(0) translateY(0)`;
        });
        [].forEach.call(body, (input) => {
          input.style.transform = `translateX(${-xValue * 0.3}px) translateY(${
            -yValue * 0.3
          }px)`;
          // input.style.transform = `translateX(0) translateY(0)`;
        });

        [].forEach.call(background, (input) => {
          input.style.backgroundPosition = `${xValue * 0.02}vw ${
            yValue * 0.02
          }vh`;
        });
      });
    },
    false
  );
}
