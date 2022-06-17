let resize = function(evt)
{
  let canvas = document.getElementById('game');
  let w = window.innerWidth / canvas.width;
  let h = window.innerHeight / canvas.height;
  let scale = Math.min(h, w);
  canvas.style.width = (canvas.width * scale) + 'px';
  canvas.style.height = (canvas.height * scale) + 'px';
};

let load = function()
{
  resize();
  document.onkeydown = keyboard.press;
  document.onkeyup = keyboard.release;
  let canvas = document.getElementById('game');
  let data = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop,
    width: canvas.width,
    height: canvas.height,
    context: canvas.getContext('2d')
  };
  game.start(data);
};

window.onload = load;
window.onresize = resize;
