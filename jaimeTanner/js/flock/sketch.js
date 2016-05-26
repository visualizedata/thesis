// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var ps;
var repeller;

function setup() {
  createCanvas(1240, 760);
  ps = new ParticleSystem(createVector(width/2, 50));
  repeller = new Repeller(width/5, height/2);
  frameRate(120);
  for (var i = 0; i < obj.length; i ++){
  ps.addParticle(i);
  }
}

function draw() {
  background(51);


  // Apply gravity force to all Particles
  var gravity = createVector(0,0);
  ps.applyForce(gravity);

  ps.applyRepeller(repeller);

  repeller.display();
  ps.run();

}

function mousePressed() {
  console.log(frameRate());
  console.log(ps.particles.length);
  console.log(ps.particles[1]);
}