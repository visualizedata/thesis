var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

//var GBIFapiRequest = 'http://api.gbif.org/v1/species/search?q=Magnoliophyta&rank=SPECIES&limit=1000';
var seedPlant = new Object;
var plants = [];
var checkSub = [];
var nopes = [];
var file = 'cycadopsida';
var counter = 0;


//  Request all Cycadophyta species from the GBIF API 

// async.series([
//     process, write
// ], function(err, result) {
//     if (err) {
//         throw err;
//     }
//     console.log(result);
// });

process();
function process() {
    for (var j = 0; j < 2000; j = j + 1000) {
        fs.readFile(file + j + '.json', 'utf8', function(err, data) {
            if (err) throw err;
            //obj = JSON.parse(data);

            for (var i = 0; i < 1000; i++) {
                seedPlant.sciName = JSON.parse(data).results[i].species;

                //if there is no species listed, skip
                if (typeof seedPlant.sciName === 'undefined') {
                    //console.log("not a species");
                    nopes.push(seedPlant.sciName);
                }
                else {
                    if (seedPlant.sciName.length < 4) {
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
                                console.log(seedPlant.sciName);
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
            counter++;
            if (counter == 2) {
                write(plants);
            }
        });


    }
   
}

function write(array) {
    console.log("~~~~write function~~~~~~~~");
    fs.writeFileSync("./cycadopsida.json", JSON.stringify(array));
}
