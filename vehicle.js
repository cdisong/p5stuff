function Vehicle(x,y) {
    this.pos = createVector(random(width),random(height));
    this.target = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 10;
    this.maxforce = 10;    
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel); 
    this.vel.add(this.acc); 
    this.acc.mult(0);
};

Vehicle.prototype.show = function () { 
    let a = Math.floor(Math.random() * Math.floor(255));
    let b = Math.floor(Math.random() * Math.floor(255));
    let c = Math.floor(Math.random() * Math.floor(255));
    
    stroke(a,b,c); 
    strokeWeight(8); 
    point(this.pos.x, this.pos.y);
     
};

Vehicle.prototype.behaviors = function() {
    // let seek = this.seek(this.target);
    let arrive = this.arrive(this.target); 
    var mouse = createVector(mouseX, mouseY); 
    var flee = this.flee(mouse);

    arrive.mult(2);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
};

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f);
};

Vehicle.prototype.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag(); 
    if (d < 90) { 
        desired.setMag(this.maxspeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(1);
        return steer;
    } else { 
        return createVector(0,0);
    }
};

Vehicle.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag(); 
    if (d < 90) {
        var speed = map(d, 0, 100, 0, this.maxspeed);
    } 
    // var speed = this.maxspeed;
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
};
