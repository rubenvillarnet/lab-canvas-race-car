window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  
  function Game(){
    this.h = undefined
    this.w = undefined
    this.gameCanvas = undefined
    this.ctx = undefined
    this.car = undefined
    this.carPosition = undefined
    this.eval = true
    this.obstacles = []
    this.gap = 0

  }
  
  Game.prototype.init = function(){
    this.h = 500
    this.w = 300
    this.carPosition = 125
    this.gameCanvas = document.getElementById("gameCanvas")
    this.ctx = gameCanvas.getContext("2d")
    this.gameCanvas.setAttribute("width", "300px")
    this.gameCanvas.setAttribute("height", "500px")
    this.car = new Image()
    this.car.src = "images/car.png"
    this.obstacles.push(new Obstacle)
    this.gap = getRand(130,230)

    
    setInterval(function(){
      this.movecar()
      this.drawBackground()
      this.generateObstacles()
      this.ctx.drawImage(this.car, this.carPosition, 350, 50,100)

    }.bind(this),1000/60)
  }

  function getRand(min, max){
    return Math.floor(Math.random()* (max - min -1 ) + min)
  }

  Game.prototype.movecar = function(){
    var limitLeft = 45
    var limitRight = 205
    document.onkeydown = function(e){
      switch(e.keyCode){
        case 37:
        if(this.carPosition >= limitLeft) this.carPosition -= 10
        break
        case 39:
        if(this.carPosition <= limitRight) this.carPosition += 10
        break
      }
    }.bind(this)
  }

  Game.prototype.drawBackground = function(){
    ctx = this.ctx
    ctx.clearRect(0,0,300,500)

    ctx.fillStyle = "#00811C"
    ctx.fillRect(0,0,300,500)
    ctx.fillStyle = "#808080"
    ctx.fillRect(30,0,240,500)
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(45,0)
    ctx.lineTo(45,500)
    ctx.lineWidth = 4
    ctx.strokeStyle = "#fff"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(255,0)
    ctx.lineTo(255,500)
    ctx.lineWidth = 4
    ctx.strokeStyle = "#fff"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    
    if(this.eval === true){
      ctx.moveTo(150,0)
      ctx.lineTo(150,500)
      this.eval = false
    } 
    else{
      ctx.moveTo(150,8)
      ctx.lineTo(150,500)
      this.eval = true
    } 
    ctx.lineWidth = 4
    ctx.strokeStyle = "#fff"
    ctx.setLineDash([16, 8]);

    ctx.stroke()
    ctx.closePath()
    ctx.setLineDash([]);

  }

  Game.prototype.generateObstacles = function(){
    ctx = this.ctx
    if (this.gap == 0){
      this.obstacles.push(new Obstacle)
      this.gap = getRand(130,230)
    }

    this.gap--

    this.obstacles.forEach(function(obstacle, index) {

      ctx.beginPath()
      console.log(obstacle.posXStart, obstacle.posY)
      ctx.moveTo(obstacle.posXStart, obstacle.posY)
      ctx.lineTo(obstacle.posXEnd, obstacle.posY)
      ctx.lineWidth = 10
      ctx.strokeStyle = "red"
      ctx.stroke()
      ctx.closePath()

      obstacle.posY ++
      if(obstacle.posY == 0){
        this.obstacles.splice(index, 1)
      }
    });
  }

  function Obstacle(){
    this.wide = getRand(50, 160)
    this.posXStart = getRand(45, 255 - this.wide)
    this.posXEnd = this.posXStart + this.wide
    this.posY = 0
  }

  
  function startGame() {
    cars = new Game

    cars.init()
  }
};
