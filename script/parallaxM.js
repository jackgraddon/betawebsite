var main = document.querySelector('#main');
var backgrounds = document.querySelectorAll("#background");

function handleOrientation(event) {
  var y = event.beta - 90;  // In degree in the range [-180,180]
  var x = event.gamma; // In degree in the range [-90,90]

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;
  
  main.style.transform = `translateX(${x * .45 -41.5}px) translateY(${y * .45}px)`;
  background.style.backgroundPosition = `${-x * .45}px ${-y * .45}px`;
}

window.addEventListener('deviceorientation', handleOrientation, true);