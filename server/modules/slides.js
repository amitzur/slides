var fs = require("fs");

module.exports = function(app, opts) {
    console.log("module slides");
    
    app.get("/slides/:name", function(req, res) {
        var path = opts.baseDir + "/html/" + req.params.name + ".html";
        fs.exists(path, function(exists) {
            if (exists) {
                res.writeHead(200);
                fs.createReadStream(path).pipe(res);
            }
            else {
                res.writeHead(404);
                res.end();
            }
        });
    });
};