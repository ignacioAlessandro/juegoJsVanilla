let game =
{
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  enemySpeed: 3,
  playerJump: 1,
  backgroundColor: '#333',
  image: new Image(),
  context: null,
  state: null,
  lastStateChange: 30,
  elements: [],
  maxPuntos: localStorage.getItem("maxPuntuacion"),
  start: function(canvas)
  {
    this.image.src = 'img/pared.png';
    this.x = canvas.x;
    this.y = canvas.y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.context;
    this.state = gameStatesEnum.menu;
    wall.create('top', 0, -980, this.width, 1000);
    wall.create('bottom', 0, this.height-20, this.width, 1000);
    //wall.create('middle', 0, (this.height/2)-20 , this.width, 4);
    for (let key in wall.list) {
      if (wall.list.hasOwnProperty(key))
      {
        this.elements.push(wall.list[key]);
      }
    }
 
    powerUps.create("1", 1000, 200, 50, 50, "left");
    
    this.randomiseEnemis();
    // enemy.create('1', 1000, 310,  50, 50,'left');
    // enemy.create('2', 1200, 390,  50, 50,'left');
    // enemy.create('3', 1650, 310,  50, 50,'left');
    // enemy.create('4', 1950, 390,  50, 50,'left');
    // enemy.create('5', 2100, 390,  50, 50,'left');
    // enemy.create('6', 2400, 310,  50, 50,'left');
    // enemy.create('7', 2850, 310,  50, 50,'left');
    // enemy.create('8', 3150, 390,  50, 50,'left');
    // enemy.create('9', 3300, 310,  50, 50,'left');
    // enemy.create('10', 3750, 390,  50, 50,'left');
    // enemy.create('11', 3900, 310,  50, 50,'left');
    // enemy.create('12', 4200, 310,  50, 50,'left');
    // enemy.create('13', 4650, 390,  50, 50,'left');
    // enemy.create('14', 4950, 310,  50, 50,'left');
    // enemy.create('15', 5250, 390,  50, 50,'left');
    // enemy.create('16', 5350, 390,  50, 50,'left');
    // enemy.create('17', 5700, 390,  50, 50,'left');
    // enemy.create('18', 6250, 310,  50, 50,'left');
    // enemy.create('19', 6300, 390,  50, 50,'left');
    // enemy.create('20', 6750, 390,  50, 50,'left');
    // enemy.create('21', 7050, 310,  50, 50,'left');
    // enemy.create('22', 7350, 390,  50, 50,'left');
    // enemy.create('23', 7500, 310,  50, 50,'left');
    // enemy.create('24', 7950, 310,  50, 50,'left');
    // enemy.create('25', 8100, 390,  50, 50,'left');
    // enemy.create('26', 8550, 390,  50, 50,'left');
    // enemy.create('27', 8700, 310,  50, 50,'left');
    // enemy.create('28', 9150, 390,  50, 50,'left');
    // enemy.create('29', 9300, 310,  50, 50,'left');
    // enemy.create('30', 9750, 390,  50, 50,'left');
    // enemy.create('31', 9900, 390,  50, 50,'left');
    // enemy.create('32', 10000, 310,  50, 50,'left');
    // enemy.create('33', 10300, 390,  50, 50,'left');
    // enemy.create('34', 10600, 310,  50, 50,'left');

    for (let key in enemy.list)
    {
      if (enemy.list.hasOwnProperty(key))
      {
        this.elements.push(enemy.list[key]);
      }
    }
    for (let key in powerUps.list)
    {
      if (powerUps.list.hasOwnProperty(key))
      {
        this.elements.push(powerUps.list[key]);
      }
    }
    this.elements.push(player);
    this.elements.push(moneda);
    this.elements.push(puntos);
    for (let i = 0; i < this.elements.length; i++)
    {
      this.elements[i].init();
    }
    setInterval(this.update.bind(this), 1000/60);
  },
  
  randomiseEnemis: function(){
    for (let counter = 0; counter < 33; counter++) {
      this.randomisePosEnemi(counter);  
    }
  },

  randomisePosEnemi: function(counter){
      this.counter = counter;
      this.posX = (1000+(200*this.counter));

      switch (Math.floor(Math.random()*(3-1)+1)) {
      
        case 1:
          enemy.create(`${this.counter}`, this.posX, 310,  50, 50, 'left');
          console.log(`${this.posX} ${this.counter}`);
          break;
          
        case 2:
          enemy.create(`${this.counter}`, this.posX, 390,  50, 50,'left');
          console.log(`${this.posX} ${this.counter}`);
          break;

        default:
          console.log("fallo jej");
          break;
    }
     
  },

  pause: function()
  {
    if(this.state === gameStatesEnum.pause)
    {
      this.state = gameStatesEnum.playing;
    } else if(this.state === gameStatesEnum.playing)
    {
      this.state = gameStatesEnum.pause;
    }
    this.lastStateChange = 0;
  },


  win: function()
  {
    this.state = gameStatesEnum.win;
  },


  over: function()
  {
    this.state = gameStatesEnum.over;
  },


  update: function()
  {
    ++this.lastStateChange;
    if(this.state === gameStatesEnum.playing)
    {

      for (let i = 0; i < this.elements.length; i++)
      {
        this.elements[i].update();
      }
    }
    if(keyboard.p && this.lastStateChange > 30)
    {
      this.pause();
    }
    if(keyboard.x && this.state === gameStatesEnum.menu)
    {
      this.state = gameStatesEnum.playing;
     
    }
    this.render();
  },


  render: function()
  {
    if(this.state === gameStatesEnum.playing)
    {
      game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      for (let i = 0; i < this.elements.length; i++)
      {
        this.elements[i].render();
      }
    } else
    {
      this.context.fillStyle = 'rgba(50, 50, 50, 0.01)';
      this.context.fillRect(this.x, this.y, this.width, this.height);
      switch(this.state) {
        case gameStatesEnum.pause:
          text.draw('Pausa', '#000000');
          break;
          case gameStatesEnum.win:
            text.draw('Has ganado', '#000000');
            break;
        case gameStatesEnum.over:
          text.draw('Game Over, Puntos:' + puntos.score, '#000000');

          
          (this.maxPuntos<puntos.score) && localStorage.setItem("maxPuntuacion",`${puntos.score}`)

          




          break;
          case gameStatesEnum.menu:
            text.draw('flecha arriba: Salto, flecha abajo: Agacharse', '#fff');
            text.draw('x: Para empezar','#000000', 30, 'monospace', 'center', 'center', 150, 100);
            text.draw('puntuacion maxima, Puntos:' +this.maxPuntos , '#000000', 30, 'monospace', 'center', 'center', 250, 150);
            break;
      }
    }
  }
};

let gameStatesEnum =
 {
  menu: 'menu',
  win: 'win',
  playing: 'playing',
  pause: 'pause',
  win: 'w',
  over: 'o'
};
