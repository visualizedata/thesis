var request = require('request');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var seedPlant = new Object;
var plants = [];
var checkSub = [];
var nopes = [];
var counter = 0;
var apiRequest = "http://api.gbif.org/v1/species/search?q=Tracheophyta&rank=SPECIES&limit=1000&offset=";
var currentNumber = 2;

process();

function process() {
    for (var j = 0; j < (currentNumber * 1000); j = j + 1000) {
        request(apiRequest + j, function(err, resp, data) {
            if (err) {
                console.log(data);
                throw err;
            }

            for (var i = 0; i < 1000; i++) {
                seedPlant.sciName = JSON.parse(data).results[i].species;

                //if there is no species listed, skip
                if (typeof seedPlant.sciName === 'undefined') {
                    nopes.push(seedPlant.sciName);
                }
                else {
                    if (seedPlant.sciName.length < 4) {
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
            writeMongo(plants);
            if (counter == currentNumber) {
                //writeMongo(plants);
                console.log("tada!");
                write(plants);
            }
        });
    }
}

function writeMongo(array) {
    var url = 'mongodb://localhost:27017/thesis';

    //retrieve
    MongoClient.connect(url, function(err, db) {
        if (err) {
            return console.dir(err);
        }

        var collection = db.collection('first');

        // THIS IS WHERE THE DOCUMENT(S) WHERE INSERTED TO MONGO:

        collection.insertMany(array);
        console.log("Inserted " + array.length + " into the document collection");
        db.close();
        collection.aggregate()
    }); //MongoClient.connect
}

function write(array) {
    console.log("~~~~write function~~~~~~~~");
    for (var z = 0; z < currentNumber * 1000; z++) {
        fs.writeFileSync("./tracheophyta.json", JSON.stringify(array[z]));
    }
}