var fs = require('fs');

var plants = [];
var checkSub = [];
var nopes = [];
var seedPlant = {};
fs.readFile('/home/ubuntu/workspace/res0.json', 'utf8', function(err, data) {
  if (err) throw err;
  //obj = JSON.parse(data);

  for (var i = 0; i < 1000; i++) {
    seedPlant.sciName = JSON.parse(data).results[i].species;
    console.log(seedPlant.sciName);

    //if there is no species listed, skip
    if (typeof seedPlant.sciName === 'undefined') {
      //console.log("not a species");
      nopes.push(seedPlant.sciName);
    }
    else {
      if (seedPlant.sciName.length < 6) {
        //console.log("too short");
        nopes.push(seedPlant.sciName);
      }
      else {
        //check against running list of species to see if it is a repeat
        if (checkSub.indexOf(seedPlant.sciName) == -1) {
          //arr.indexOf('Jaime') 0 , if its not there, its -1
          var space = seedPlant.sciName.indexOf(" ");
          var species = seedPlant.sciName.substr(space + 1, 50);

          if (species == "spec." || species === "environmental sample" || typeof species === 'undefined') {
            nopes.push(seedPlant.sciName);
          }
          else {
            seedPlant.species = species;
            seedPlant.kingdom = JSON.parse(data).results[i].kingdom;
            seedPlant.phylum = JSON.parse(data).results[i].phylum;
            seedPlant.class = JSON.parse(data).results[i].class;
            seedPlant.order = JSON.parse(data).results[i].order;
            seedPlant.family = JSON.parse(data).results[i].family;
            seedPlant.genus = JSON.parse(data).results[i].genus;
            checkSub.push(seedPlant.sciName);
            plants.push({
              sciName: seedPlant.sciName,
              species: seedPlant.species,
              classification: {
                kingdom: seedPlant.kingdom,
                phylum: seedPlant.phylum,
                'class': seedPlant.class,
                order: seedPlant.order,
                family: seedPlant.family,
                genus: seedPlant.genus
              }
            });
          }
        }
        else {
          nopes.push(seedPlant.sciName);
        }
      }
    }
  }
  console.log("Check sub=" + checkSub.length + "  array length=" + plants.length + "  nopes length=" + nopes.length);
  console.log(plants);

  fs.writeFileSync("./plants1.txt", JSON.stringify(plants));
});