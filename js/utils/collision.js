let collision =
{
  boxes: function(boxA, boxB)
   {
    if(boxA === boxB)
    {
      return false;
    }
    return boxA.x < (boxB.x + boxB.width) &&
      (boxA.x + boxA.width) > boxB.x &&
      boxA.y < (boxB.y + boxB.height) &&
      (boxA.y + boxA.height) > boxB.y;
  },
  circles: function(circleA, circleB)
  {
    if(circleA === circleB)
     {
      return false;
    }
    return Math.abs(circleA.x - circleB.x) < (circleA.radius + circleB.radius) &&
      Math.abs(circleA.y - circleB.y) < (circleA.radius + circleB.radius);
  },
  boxAndCircle: function(box, circle) {
    let distX = Math.abs(circle.x - box.x) - box.width / 2;
    let distY = Math.abs(circle.y - box.y) - box.height / 2;
    if (distX > (box.width / 2 + circle.radius) || distY > (box.height / 2 + circle.radius))
    {
      return false;
    }
    if (distX <= (box.width / 2) || distY <= (box.height / 2))
    {
      return true;
    }
    let dx = distX - box.width / 2;
    let dy = distY - box.height / 2;
    return (dx * dx + dy * dy) <= (circle.radius * circle.radius);
  },
  boxesSide: function(boxA, boxB)
   {
    if(boxA === boxB)
    {
      return null;
    }
    let collision = null;
    let dx = (boxA.x + boxA.width / 2) - (boxB.x + boxB.width / 2);
    let dy = (boxA.y + boxA.height / 2) - (boxB.y + boxB.height / 2);
    let width = (boxA.width + boxB.width) / 2;
    let height = (boxA.height + boxB.height) / 2;
    let crossWidth = width * dy;
    let crossHeight = height * dx;
    if(Math.abs(dx) <= width && Math.abs(dy) <= height)
    {
      if(crossWidth > crossHeight)
      {
        collision = crossWidth > -crossHeight ? 'top' : 'right';
      } else {
        collision = crossWidth > -crossHeight ? 'left' : 'bottom';
      }
    }
    return collision;
  }
};
