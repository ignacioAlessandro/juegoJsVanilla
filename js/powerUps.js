let powerUps =
{
  list: {},
  create: function( id,x, y, width, height,direction)
  {
    powerUps.list[id] =
    {
      id: id,
      x: x,
      y: y,
      type: "powerUps",
      width: width,
      height: height,
      direction: direction,
      backgroundColor: '#4Ff',
      //image: new Image(),
      checkCollision: function()
      {
        let i, collisionSide, hasCollisionBottom = false;
        for (i = 0; i < game.elements.length; i++)
        {
          collisionSide = collision.boxesSide(powerUps, game.elements[i]);
          if(collisionSide)
          {
            if(collisionSide === 'left' && this.direction == 'left')
            {
            }
          }
        }
      },
      move: function()
      {
        if(this.direction == 'left')
        {
          this.x -= game.enemySpeed;
        }
      },
      fixNumbers: function()
      {
        if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
        if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
      },
      init: function()
      {
        //this.image.src = 'img/trampa.png';
      },
      update: function()
      {
        this.fixNumbers();
        this.move();
        this.checkCollision();
      },
      render: function()
      {
        //game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        game.context.fillStyle = this.backgroundColor;
        game.context.fillRect(this.x, this.y, this.width, this.height);
      },
    };
  }
};
