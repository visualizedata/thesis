var fs = require('fs');
var cnidaria = [];


fs.readFile("Cnidaria.json", "utf8", function(err, data) {
    if (err) throw err;


    var cnidaria = JSON.parse(data);

    for (var i = 0; i < cnidaria.length; i++) {

        if (cnidaria[i].natureCount > 0) {
            for (var j = 0; j < cnidaria[i].natureTitles.length; j++) {
                if (cnidaria[i].natureTitles[j].indexOf('<i>') === -1) {
                    cnidaria[i].natureTitles[j].replace(/<i>/g, "");
                    console.log(cnidaria[i].natureTitles[j]);
                }
            }
        }
    }
    fs.writeFileSync("./test.json", JSON.stringify(cnidaria));
});