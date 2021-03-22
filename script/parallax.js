const title = document.querySelectorAll(".title");
const body = document.querySelectorAll(".body");
const buttons = document.querySelectorAll(".btn");
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

      // [].forEach.call(backgrounds, (input) => {
      //   input.style.backgroundPosition = `${-xValue * 0.1 - 5}vw ${
      //     -yValue * 0.1 - 5
      //   }vh`;
      // });
    });
  },
  false
);
