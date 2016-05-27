var x, y, m, old_second, index;
var imageWidth = 60;
var imgNames = [ "1f636", "1f600", "1f601", "263a", "1f625", "1f61f", "1f620"];
// var imgNames = ['angry', 'confused', 'disappointed_relieved','grimacing','grinning', 'neutral_face', 'no_mouth', 'stuck_out_tongue','worried'];
// var imgNames = ['angry', 'blush', 'confounded', 'confused', 'cry', 'disappointed_relieved','grimacing','grinning', 'hushed', 'neutral_face', 'no_mouth', 'stuck_out_tongue', 'unamused', 'wink', 'worried', 'pizza'];

var path = 'images/';
var ext = '.jpg';
// var ext = '.svg';
// var ext = '.png';
var count = 0;
var count2 = 0;
var margin = imageWidth/2;

var width, height;

var imgArray =[];
var faces = [];

function preload() {
  for(var i = 0; i < imgNames.length; i++){
    imgArray[i] = loadImage(path + imgNames[i] + ext);
    // console.log(path + imgNames[i] + ext);
  }
}

function setup() {
  var cnv = createCanvas(windowWidth, imageWidth);
  cnv.parent("emojiLanding");

  for (var i = 0; i < 17; i++){
    var index = floor(random(imgArray.length));
    var b = new face(imgArray[index], i);
    // console.log(imgArray[index]);
    faces.push(b);
  }

  // for (var h = faces.length-0; h >= 0; h--) {
  //   faces[h].display();
  // }
}

function draw() {
  // background(255);

  for (var h = faces.length-1; h >= 0; h--) {
    faces[h].display();
    faces[h].update();
  }



}


function face (img, i) {
    this.x = width + margin - imageWidth * i;
    this.y = imageWidth/2;
    this.img = img;

    this.display = function () {
        imageMode(CENTER);
        image(img, this.x, this.y, imageWidth, imageWidth);
    }

    this.update = function () {
      if (second() != old_second){
        count++;
        // console.log(count);
      }
      if (second() != old_second && count == 10){
        if (this.x < 0 || this.x > width){
          this.x = width + margin - imageWidth;
        }else{
          this.x = this.x - imageWidth;
        }
        count = 0;
      }
        // this.x = this.x - imageWidth*.015;
        // this.y = this.y + random(-1, 1);
    }
    background(255);
 }

function windowResized() {
  imageWidth = windowWidth/12;
  // console.log(imageWidth);
  resizeCanvas(windowWidth, imageWidth);
  faces = [];
  for (var i = 0; i < 17; i++){
    var index = floor(random(imgArray.length));
    var b = new face(imgArray[index], i);
    // console.log(imgArray[index]);
    faces.push(b);
  }
  console.log(width);
  // console.log(faces.length)

  // for (var i = 17; i < 0; i++){
  //   faces[i].display();
  //   faces[i].update();
  // }

}
