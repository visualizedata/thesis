var imgNames = ['angry', 'confused', 'disappointed_relieved','grimacing','grinning', 'neutral_face', 'no_mouth', 'stuck_out_tongue','worried'];

var path = 'images/';
var ext = '.jpg';

var width, height;

var imageWidth = 64;

var imgArray =[];
var faces = [];

function preload() {
    for(var i = 0; i < imgNames.length; i++){
    imgArray[i] = loadImage(path + imgNames[i] + ext);
    // console.log(path + imgNames[i] + ext);
  }
}

function setup() {
  var cnv = createCanvas(64, 64);
  cnv.parent("mainuser");

  for (var i = 0; i < 17; i++){
    var index = floor(random(imgArray.length));
    var b = new face(imgArray[index], i);
    // console.log(imgArray[index]);
    faces.push(b);
  }


  for (var h = faces.length-1; h >= 0; h--) {
    faces[h].display();
    // faces[h].update();
  }

}



function face (img, i) {
    this.x = 0;
    this.y = 0;
    this.img = img;

    this.display = function () {
        // imageMode(CENTER);
        image(img, this.x, this.y, imageWidth, imageWidth);
    }

    background(255);
 }
