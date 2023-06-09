const paper = document.querySelector("#paper"),
      pen = paper.getContext("2d");

let startTime = new Date().getTime();
const draw =() =>{
  const currentTime = new Date().getTime(),
    elapsedTime = (currentTime - startTime) / 1000;
  paper.width = paper.clientWidth;
  paper.height = paper.clientHeight;
  
  const start = {
    x: paper.width * 0.1,
    y: paper.height * 0.9
  }
  const end = {
    x: paper.width * 0.9,
    y: paper.height * 0.9
  }
  
  //draw base line
  pen.strokeStyle = "#dcdcdc";
  pen.lineWidth = 6;
  
  pen.beginPath();
  pen.moveTo(start.x, start.y);
  pen.lineTo(end.x, end.y);
  pen.stroke();
  
  const center = {
    x: paper.width * 0.5,
    y: paper.height * 0.9,
  }
  
 
  const arcs = Array.from(Array(16).keys())
  const length = end.x - start.x;
  const initialArcRadius = length * 0.05;
  const spacing = (length / 2 - initialArcRadius)/ arcs.length;
  arcs.forEach((arc, index) => {
    const arcRadius = initialArcRadius + (index * spacing)
     //draw arc
  pen.beginPath();
  pen.arc(center.x, center.y, arcRadius, Math.PI, 2 * Math.PI)
  pen.stroke();  
    
    //draw circle
    const oneFullLoop = 2 * Math.PI, 
          numberOfLoops = 50 - index,
          velocity = (oneFullLoop * numberOfLoops) / 900,
          maxAngle = 2 * Math.PI,
          distance =  Math.PI + (elapsedTime * velocity),
          modDistance = distance % maxAngle,
          adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;
  
  const x = center.x + arcRadius * Math.cos(adjustedDistance),
        y = center.y + arcRadius * Math.sin(adjustedDistance);
  
 
  pen.fillStyle = "#ffb100";
  pen.beginPath();
  pen.arc(x, y, length * 0.0065, 0, 2 * Math.PI)
  pen.fill();
  })
  
 
  requestAnimationFrame(draw);
}

draw();