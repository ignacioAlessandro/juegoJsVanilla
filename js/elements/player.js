let player =
{
  x: 100,
  y: 0,
  width: 45,
  height: 100,
  backgroundColor: '#0C0',
  jumpForce: null,
  maxJumpForce: 9,
  inven : false,
  pepe : 0,
 // image: new Image(),
  checkCollision: function()
  {
    let i, collisionSide, hasCollisionBottom = false;
    for (i = 0; i < game.elements.length; i++)
    {
      collisionSide = collision.boxesSide(player, game.elements[i]);
      if(collisionSide)
      {
        switch (collisionSide) {
          case 'left':
 
              switch (game.elements[i].type)
               {
                case 'enemy':
                  if(this.inven == false) 
                  {
                    game.over();
                  }
                  else
                  {
                    if(this.pepe < 10)
                    {
                      this.pepe ++
                    }
                    else
                    {
                      this.inven = false;
                      this.pepe = 0;
                    }
                  }
                  break;
                case 'powerUps':
                    this.inven = true
                  break;
                case 'moneda':
                    game.win();
                  break;
                default:
                  break;
              }
 
            break;
          case 'right':
              
              console.log(this.pepe)
 
              switch (game.elements[i].type)
               {
                case 'enemy':
                  if(this.inven == false) 
                  {
                    game.over();
                  }
                  else
                  {
                    if(this.pepe < 10)
                    {
                      this.pepe ++
                    }
                    else
                    {
                      this.inven = false;
                      this.pepe = 0;
                    }
                  }
                  break;
                case 'powerUps':
                    this.inven = true
                  break;
                case 'moneda':
                    game.win();
                  break;
                default:
                  break;
              }
          break;
          case 'top':
              if(this.jumpForce >= 0)
              {
                this.jumpForce = -0.2;
              }
          break;
          case 'bottom':
              this.jumpForce = null;
              this.y = game.elements[i].y - this.height;
              hasCollisionBottom = true;
          break;
          default:
            break;
        }

      }
    }
    if(!hasCollisionBottom && this.jumpForce === null)
    {
      this.jumpForce = -0.5;
    }
  },
  move: function()
  {
    if(keyboard.down)
    {
    this.height = 50;
    this.width = 90;
    this.jumpForce = -10;
    }
    if(typeof this.jumpForce === 'number')
    {
      this.y -= this.jumpForce;
      if(this.jumpForce >= -this.maxJumpForce)
       {
        this.jumpForce -= 0.2;
      }
    }
  },
  checkJump: function()
  {
    if(keyboard.up && this.jumpForce === null)
    {
      this.jumpForce = this.maxJumpForce;
      this.height = 100;
      this.width = 45;
    }
  },
  fixNumbers: function()
  {
    if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
    if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
    if(typeof this.jumpForce === 'number') this.jumpForce = Math.round(this.jumpForce * 100) / 100;
  },
  init: function()
  {
    this.y = wall.list['bottom'].y - this.height;
   // this.image.src = 'img/sonic.png';
  },
  update: function()
  {
    this.fixNumbers();
    this.checkJump();
    this.move();
    this.checkCollision();
  },
  render: function()
  {
    //game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    game.context.fillStyle = this.backgroundColor;
    game.context.fillRect(this.x, this.y, this.width, this.height);
  }
};
