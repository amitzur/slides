var crypto		= require('crypto');

var createHash = function(secret) {
    var cipher = crypto.createCipher('blowfish', secret);
    return(cipher.final('hex'));
};

module.exports = function(app, opts) {
    app.get("/token", function(req,res) {
        var ts = new Date().getTime();
        var rand = Math.floor(Math.random()*9999999);
        var secret = ts.toString() + rand.toString();
        res.send({secret: secret, socketId: createHash(secret)});
    });
};