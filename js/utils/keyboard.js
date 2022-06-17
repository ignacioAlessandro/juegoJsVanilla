let keyboard =
 {
  up: false,
  left: false,
  right: false,
  p: false,
  press: function(evt)
   {
    let key = keyboardEnum[evt.code];
    if(key)
    {
      keyboard[key] = true;
    }
  },
  release: function(evt)
   {
    let key = keyboardEnum[evt.code];
    if(key)
    {
      keyboard[key] = false;
    }
  }
};

let keyboardEnum =
{
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyP: 'p',
  ArrowDown: 'down',
  KeyX: 'x',
};
