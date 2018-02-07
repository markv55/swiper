//module.exports = require('./lib');
//var KlikAanKlikUit = module.exports;

//KlikAanKlikUit(11, 260, 7, 5).on('A', 1);
//KlikAanKlikUit(11, 260, 7, 5).on('M', 1);



var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);



//io.emit('message', '1');
io.on('connection', function(socket) {
	//console.log ('userconnected' );

	socket.on('message', function(msg){  // deze functie ontvangt de socket van de client en zet ze door naar unity
        if (msg[0] == 'photo') {
			io.emit('message', 'photo' , msg[1] );
			console.log (msg[1]);
		}
    });
    
    socket.on('x', function(x) {
		console.log("The x is: " + x);
		io.emit('message', 'x', x);
	});

    socket.on('y', function(y) {
		console.log("The y is: " + y);
		io.emit('message', 'y', y);
	});
	
	// videos
	
   socket.on('aan', function(a) {
		console.log("video aan " + a);
		io.emit('message', 'aan', a);
	});
 
	socket.on('uit', function(u) {
		console.log("video uit " + u);
		io.emit('message', 'uit', u);
	});	
	
	
});


app.use(express.static(__dirname + '/node_modules'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/swiper', function(req, res) {
	res.sendFile(path.join(__dirname+'/swiper/index.html'));
});
app.get('/swiper3', function(req, res) {
	res.sendFile(path.join(__dirname+'/swiper3/index.html'));
});

///////nieuw 1      //////nieuw     ///////////nieuw   ///////// ///////nieuw       //////nieuw     ///////////nieuw   ////////////////nieuw       //////nieuw     ///////////nieuw   /////////

// deze pagina ontvangt:
// websocket 'start_film' en op film/index.html start een film
// websocket 'stop_film' en op film/index.html stopt een film

// eea op basis van onderstaande functie
app.get('/film', function(req, res) {
	res.sendFile(path.join(__dirname+'/film/index.html'));
});

/////////////////////////////////






app.get('/get_product', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'product_id', req.query.id );
	console.log ('get product: ' + req.query.id);		
	res.redirect('/');
});





app.get('/photo/:id', function(req, res) {
	console.log('Sending photo id: ' + req.params.id + ' to unity.');  // wat deze functie doet weet ik niet
	io.emit('message', 'photo', req.params.id);
	
});


// recenteren     // recenteren     // recenteren     // recenteren     
app.get('/on1', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'pi' , 'recenter' );
	console.log ('recenter');	
	res.redirect('/');
});

app.get('/off1', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 1);
	io.emit('message', 'pi' , 'leeg' );	
	console.log ('uit');	
	res.redirect('/');
});

// product 1         // product 1         // product 1         // product 1         
// product 1         // product 1         // product 1         // product 1         
// product 1         // product 1         // product 1         // product 1       
  
app.get('/on2', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 2);
	//io.emit('message', 'pi', 'scene1_aan' );
	io.emit('message', 'pi', 'product1_aan' );	
	console.log ('product1_aan');	
	res.redirect('/');
});

app.get('/uit2', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 2);
	io.emit('message', 'pi', 'product1_uit' );
	console.log ('product1_uit');	
	res.redirect('/');
});


app.get('/off2', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product1_camera' );
	console.log ('product1_camera');		
	res.redirect('/');
});

app.get('/off3', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product1_wereld' );
	console.log ('product1_wereld');		
	res.redirect('/');
});




app.get('/camera', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'camera' );
	console.log ('camera');		
	res.redirect('/');
});


// nieuwe // nieuwe // nieuwe // nieuwe // nieuwe // nieuwe // nieuwe // nieuwe // nieuwe // nieuwe 



app.get('/ad_product', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'ad_product' );
	console.log ('ad_product');		
	res.redirect('/');
});

app.get('/change_product', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'change_product' );
	console.log ('change_product');		
	res.redirect('/');
});


app.get('/select_product', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'select_product' );
	console.log ('select_product');		
	res.redirect('/');
});

app.get('/volgende', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'volgende' );
	console.log ('volgende');		
	res.redirect('/');
});

app.get('/play_modus', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'play_modus' );
	console.log ('play_modus');		
	res.redirect('/');
});














app.get('/scale_100', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product1_scale', req.query.val );
	console.log ('product1_scale_' + req.query.val);		
	res.redirect('/');
});

app.get('/scale_video', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'scale_video', req.query.val );
	console.log ('scale_video' + req.query.val);		
	res.redirect('/');
});




app.get('/scale_66', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product1_scale', '0.66' );
	console.log ('product1_scale_0.66');		
	res.redirect('/');
});

app.get('/scale_33', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product1_scale', '0.33' );
	console.log ('product1_scale_0.33');		
	res.redirect('/');
});





// product 2      // product 2      // product 2      // product 2      
app.get('/on3', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 3);
	io.emit('message', 'pi', 'scene2_aan' );
	console.log ('product 2');		
	res.redirect('/');
});

app.get('/off3', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 3);
	io.emit('message', 'pi', 'scene2_uit' );
	console.log ('product 2_parkeer');		
	res.redirect('/');
});

// product 3      // product 3      // product 3      // product 3      
app.get('/on4', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 4);
	io.emit('message', 'aan', 'video_aan' );
	console.log ('video_aan');		
	res.redirect('/');
});

app.get('/off4', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 4);
	io.emit('message', 'uit', 'video_uit' );
	console.log ('video_uit');		
	res.redirect('/');
	
});



// uri vanuit unity


// 11  let op kaku 1 1 is er niet!!!
app.get('/on11', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 2);
	res.redirect('/');
});

app.get('/off11', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	res.redirect('/');
});

// 12
app.get('/on12', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 2);
	res.redirect('/');
});

app.get('/off12', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	res.redirect('/');
});


// 13
app.get('/on13', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 3);
	res.redirect('/');
});

app.get('/off13', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 3);
	res.redirect('/');
});

// 14
app.get('/on14', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 4);
	res.redirect('/');
});

app.get('/off14', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 4);
	res.redirect('/');
});


// weet niet wat dit is   // weet niet wat dit is    // weet niet wat dit is

// swiper2
app.get('/left', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'pi' , 'left' );
	console.log ('left');		
	res.redirect('/');
});

app.get('/right', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'pi' , 'right' );
	console.log ('right');		
	res.redirect('/');
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});


server.listen(3000, function(){
	console.log("Running on IP laptop on port 3000 ");
});
