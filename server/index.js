var express		= require('express');
var fs			= require('fs');
var io			= require('socket.io');

var app			= express.createServer();
var staticDir	= express.static;

io				= io.listen(app);

var opts = {
	port: 1948,
	baseDir : __dirname + '/../'
};

io.sockets.on('connection', function(socket) {
	socket.on('slidechanged', function(slideData) {
		if (typeof slideData.secret == 'undefined' || slideData.secret == null || slideData.secret === '') return;
		if (createHash(slideData.secret) === slideData.socketId) {
			slideData.secret = null;
			socket.broadcast.emit(slideData.socketId, slideData);
		}
	});
});

app.configure(function() {
	[ 'css', 'js', 'plugin', 'img', 'public'].forEach(function(dir) {
		app.use('/' + dir, staticDir(opts.baseDir + dir));
	});
});

app.get("/", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.createReadStream(opts.baseDir + '/index.html').pipe(res);
});

var modules = fs.readdir(opts.baseDir + "server/modules", function(err, files) {
    if (err) {
        console.log("error listing directory 'modules' :\n\t==> " + err);
        return;
    }
    
    files.filter(function(file){ return file.indexOf(".js") === file.length - 3; }).forEach(function(file) {
        console.log("loading module [" + file + "]");
        require("./modules/" + file)(app, opts);
    });
});

// Actually listen
app.listen(opts.port || null);

var brown = '\033[33m',
	green = '\033[32m',
	reset = '\033[0m';

console.log( brown + "reveal.js:" + reset + " Multiplex running on port " + green + opts.port + reset );