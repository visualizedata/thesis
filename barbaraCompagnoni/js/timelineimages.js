var x, y, m, old_second, index;
var imageWidth = 30;
var imgNames = ['angry', 'confused', 'disappointed_relieved','grimacing','grinning', 'neutral_face', 'no_mouth', 'stuck_out_tongue','worried'];
// var imgNames = ['angry', 'blush', 'confounded', 'confused', 'cry', 'disappointed_relieved','grimacing','grinning', 'hushed', 'neutral_face', 'no_mouth', 'stuck_out_tongue', 'unamused', 'wink', 'worried', 'pizza'];

var path = 'images/';
var ext = '.jpg';
// var ext = '.png';
var count = 0;
var count2 = 0;
var margin = imageWidth/width;

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
  var cnv = createCanvas(windowWidth*.8, imageWidth);
  cnv.parent("emojichart");

  for (var i = 0; i < 24; i++){
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
    // faces[h].update();
  }



}


function face (img, i) {
    this.x = width - imageWidth * i;
    this.y = imageWidth/2;
    this.img = img;

    this.display = function () {
        imageMode(CENTER);
        image(img, this.x - imageWidth/2, this.y, imageWidth, imageWidth);
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
