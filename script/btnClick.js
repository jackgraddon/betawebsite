function click(id) {
  let click = new Audio("./media/mp3/click.mp3");
  click.volume = 0.2;
  click.play();
  $(`#${id}`).addClass("clicked");
  setTimeout(() => {
    $(`#${id}`).removeClass("clicked");
  }, 250);
}
