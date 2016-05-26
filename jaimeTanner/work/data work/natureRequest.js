var request = require('request'); // npm install request
var async = require('async');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var obj = JSON.parse(fs.readFileSync('Thesis/Anthozoa.json', 'utf8'));
var url = 'mongodb://localhost:27017/thesis';

//retrieve
MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }
    ////////
    var collection = db.collection('Cnidaria');
    async.forEachOfSeries(obj, function(object, i, callback) {
        var name1 = obj[i].classification.genus;
        var name2 = obj[i].species;
        var natureRequest = 'http://www.nature.com/opensearch/request?query=' + name1 + "+" + name2 + '&httpAccept=application/json';

        console.log(natureRequest);

        request(natureRequest, function(err, resp, body) {
            if (err) {
                console.log(body);
                throw err;
            }

            obj[i].natureCount = JSON.parse(body).feed['opensearch:totalResults'];
            console.log(JSON.parse(body).feed['opensearch:totalResults']);
            if (JSON.parse(body).feed['opensearch:totalResults'] > 0) {
                var doi = [];
                var titles = [];
                for (var j = 0; j < JSON.parse(body).feed.entry.length; j++) {

                    titles.push(JSON.parse(body).feed.entry[j].title);
                    doi.push(JSON.parse(body).feed.entry[j].link);
                }
                obj[i].natureArticles = doi;
                obj[i].natureTitles = titles;

                if (obj[i].natureArticles.length != obj[i].natureTitles.length) {
                    obj[i].ALERT = "NOT EQUAL";
                }
                //plantsANDpubs.push(object);
                collection.insertOne(obj[i]);
                console.log("Inserted " + obj[i].length + " into the document collection");
            }
            else {
                console.log("failed!");
            }

        });
        setTimeout(callback, 150);

        fs.writeFileSync("./anthozoaNature.json", JSON.stringify(obj));
    });
    /////

    db.close();
    collection.aggregate();
}); //MongoClient.connect
