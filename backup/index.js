module.exports = require('./lib');
var KlikAanKlikUit = module.exports;

//KlikAanKlikUit(11, 260, 7, 5).on('A', 1);
//KlikAanKlikUit(11, 260, 7, 5).on('M', 1);



var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);



//io.emit('message', '1');
io.on('connection', function(socket) {
	console.log ('userconnected' );

	socket.on('message', function(msg){
        if (msg[0] == 'photo') {
			io.emit('message', 'photo' , msg[1] );
		}
    });
});


app.use(express.static(__dirname + '/node_modules'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/swiper', function(req, res) {
	res.sendFile(path.join(__dirname+'/swiper/index.html'));
});


app.get('/photo/:id', function(req, res) {
	console.log('Sending photo id: ' + req.params.id + ' to unity.');
	io.emit('message', 'photo', req.params.id);
});


// 111111111111111111111111111111111
app.get('/on1', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'pi' , 'recenter' );
	res.redirect('/');
});

app.get('/off1', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 1);
	res.redirect('/');
});

// 22222222222222222222222222222222222
app.get('/on2', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 2);
	io.emit('message', 'pi', 'scene1_aan' );
	res.redirect('/');
});

app.get('/off2', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'scene1_uit' );	
	res.redirect('/');
});

// 3333333333333333333333333333333333333
app.get('/on3', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 3);
	io.emit('message', 'pi', 'scene2_aan' );
	res.redirect('/');
});

app.get('/off3', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 3);
	io.emit('message', 'pi', 'scene2_uit' );
	res.redirect('/');
});

// 44444444444444444444444444444444444444
app.get('/on4', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 4);
	io.emit('message', 'pi', 'scene3_aan' );
	res.redirect('/');
});

app.get('/off4', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 4);
	io.emit('message', 'pi', 'scene3_uit' );
	res.redirect('/');
	
});



// uri vanuit unity


// 11  let op kaku 1 1 is er niet!!!
app.get('/on11', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 2);
	res.redirect('/');
});

app.get('/off11', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	res.redirect('/');
});

// 12
app.get('/on12', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 2);
	res.redirect('/');
});

app.get('/off12', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	res.redirect('/');
});


// 13
app.get('/on13', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 3);
	res.redirect('/');
});

app.get('/off13', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 3);
	res.redirect('/');
});

// 14
app.get('/on14', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).on(1, 4);
	res.redirect('/');
});

app.get('/off14', function (req, res) {
	KlikAanKlikUit(11, 260, 7, 5).off(1, 4);
	res.redirect('/');
});


// swiper2
app.get('/left', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'pi' , 'left' );
	res.redirect('/');
});

app.get('/right', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'pi' , 'right' );
	res.redirect('/');
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});


server.listen(5000, function(){
	console.log("Running on 5000");
});
