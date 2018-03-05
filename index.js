//module.exports = require('./lib');
//var KlikAanKlikUit = module.exports;

//KlikAanKlikUit(11, 260, 7, 5).on('A', 1);
//KlikAanKlikUit(11, 260, 7, 5).on('M', 1);



var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// onderstaand ontvangen sockets niet-zijnde-van-ajax request

//io.emit('message', '1');
io.on('connection', function(socket) {
	//console.log ('userconnected' );

	socket.on('message', function(msg){  // deze functie ontvangt de socket van de client en zet ze door naar unity
        if (msg[0] == 'photo') {
			io.emit('message', 'photo' , msg[1] );
			console.log (msg[0]);
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
	
   socket.on('video_aan', function(a) {
		console.log("video aan " + a);
		io.emit('message', 'video_aan', a);
	});
 
	socket.on('video_uit', function(u) {
		console.log("video uit " + u);
		io.emit('message', 'video_uit', u);
	});	

	// kaku
	
   socket.on('aan', function(a) {
		console.log("video aan " + a);
		io.emit('message', 'aan', a);
	});
 
	socket.on('uit', function(u) {
		console.log("video uit " + u);
		io.emit('message', 'uit', u);
	});	
	
	
	
	
	
	
	socket.on('alpha', function(u) {
		console.log("alpha " + u);
		io.emit('message', 'alpha', u);
	});	
	
	socket.on('beta', function(u) {
		console.log("beta " + u);
		io.emit('message', 'beta', u);
	});	

///////////////////

	socket.on('timo1', function(u) {
		console.log("timo1 " + u);
		io.emit('message', 'videotimo1', u);
	});	

		socket.on('timo2', function(u) {
		console.log("timo2 " + u);
		io.emit('message', 'videotimo2', u);
	});	
	
		socket.on('timo3', function(u) {
		console.log("timo3 " + u);
		io.emit('message', 'videotimo3', u);
	});	
	
});


app.use(express.static(__dirname + '/node_modules'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//////////////

// Roep deze aan als /return/{MESSAGE} en hij verstuurd de MESSAGE door naar unity. (socket)
// ik hoef nu niet iedere nieuwe input naar nodejs opnieuw aan te maken!
app.get('/return/:rec', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', req.params.rec);
	console.log (req.params.rec);		
	res.redirect('/');
});


//////////////////

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


app.get('/foto_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/foto_html/index.html'));
});






/////////////////////////////////




app.get('/ad_product_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/ad_product_html/index.html'));
});


app.get('/change_product_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/change_product_html/index.html'));
});

app.get('/delete_product_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/delete_product_html/index.html'));
});


/////////////////////////////////



app.get('/timo1_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/timo1_html/index.html'));
});

app.get('/timo2_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/timo2_html/index.html'));
});

app.get('/timo3_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/timo3_html/index.html'));
});

//////////////////////////////


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
app.get('/recenter', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'pi' , 'recenter' );
	console.log ('recenter');	
	res.redirect('/');
});


// video     // video     // video     // video     
app.get('/aan', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'aan' , 'aan' );
	console.log ('aan');	
	res.redirect('/');
});

    
app.get('/uit', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'uit' , 'uit' );
	console.log ('uit');	
	res.redirect('/');
});

app.get('/home', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'home' , 'home' );
	console.log ('home');	
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

app.get('/ad_ready', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'ad_ready' );
	console.log ('ad_ready');		
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

app.get('/change_ready', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'change_ready' );
	console.log ('change_ready');		
	res.redirect('/');
});

app.get('/delete_product', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'delete_product' );
	console.log ('delete_product');		
	res.redirect('/');
});


app.get('/delete_product_now', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'delete_product_now' );
	console.log ('delete_product_now');		
	res.redirect('/');
});



app.get('/ready', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'ready' );
	console.log ('ready');		
	res.redirect('/');
});

app.get('/play_modus', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'play_modus' );
	console.log ('play_modus');		
	res.redirect('/');
});


/*  let op uitgezet!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*  let op uitgezet!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*  let op uitgezet!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.get('/objecten_aan', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'objecten_aan' );
	console.log ('objecten_aan');		
	res.redirect('/');
});

app.get('/objecten_uit', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'objecten_uit' );
	console.log ('objecten_uit');		
	res.redirect('/');
});
*/


///////////////////
////////////////// input is output
/////////////////


///////////////////
///////////////////
//////////////////

app.get('/product1', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product1' );
	console.log ('product1');		
	res.redirect('/');
});

app.get('/product2', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product2' );
	console.log ('product2');		
	res.redirect('/');
});

app.get('/product3', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product3' );
	console.log ('product3');		
	res.redirect('/');
});

app.get('/product4', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product4' );
	console.log ('product4');		
	res.redirect('/');
});

app.get('/product5', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product5' );
	console.log ('product5');		
	res.redirect('/');
});

app.get('/product6', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product6' );
	console.log ('product6');		
	res.redirect('/');
});

app.get('/product7', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product7' );
	console.log ('product7');		
	res.redirect('/');
});

app.get('/product8', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'product8' );
	console.log ('product8');		
	res.redirect('/');
});

// oude code    ///////////////////////////   oude code  ///////////////////////
// oude code    ///////////////////////////   oude code  ///////////////////////
// oude code    ///////////////////////////   oude code  ///////////////////////


app.get('/scale_100', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'scale_video', req.query.val );
	console.log ('scale_video' + req.query.val);		
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


server.listen(80, function(){
	console.log("Running on IP laptop on port 80 ");
});
