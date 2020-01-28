//module.exports = require('./lib');
//var KlikAanKlikUit = module.exports;

//KlikAanKlikUit(11, 260, 7, 5).on('A', 1);
//KlikAanKlikUit(11, 260, 7, 5).on('M', 1);



var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);


///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////
///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////
///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////
///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////      ONTVANGT SOCKETS EN STUURT DEZE 1-OP-1 DOOR        ///////

// onderstaand ontvangen sockets niet-zijnde-van-ajax request / als het geen knopppen in de html zijn!!

//io.emit('message', '1');
io.on('connection', function(socket) {
	//console.log ('userconnected' );

// nieuwe code voor de vakantiebeurs

// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////       IN DE SOFTWARE WORDT DE SET GEMAAKT     (SET_ID)                               //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// tablet tb1 stuurt een socket 
	//"laad_foto17_1", "ontvangen_van", "device_id" , "location_id"
	// "laad_foto17_1", "ontvangen_van", "tb1" , "vt1"
	// er wordt een doorsturen_aan socket verstuurd naar diverse ontvangers welke bij deze location_id horen.
	

// TABLET DEVICE_ID: TB1 
		socket.on('stuur', function(param0, param1, param2, param3) {
        if( (param1 == 'ontvangen_van') && (param2== 'tb1') && (param3== 'vt1')){

		console.log ( "TABLET DEVICE_ID: TB1 / LOCATION_ID: VT1 " + param0 ,    param1 , "device_id: "+ param2  , "location_id: "+  param3  );
		
		io.emit('message', param0, "doorsturen_aan", "tv1", param3);	// televisie 1
		io.emit('message', param0, "doorsturen_aan", "tb1", param3);	// tablet 1
		io.emit('message', param0, "doorsturen_aan", "vr1", param3);	// VR bril 1
		io.emit('message', param0, "doorsturen_aan", "vr2", param3);	// VR bril 2	
		io.emit('message', param0, "doorsturen_aan", "wb1", param3);	// website 1
		
		}
	});	

// TABLET DEVICE_ID TB2 
		socket.on('stuur', function(param0, param1, param2, param3) {
        if( (param1 == 'ontvangen_van') && (param2== 'tb2') && (param3== 'vt1')){

		console.log ( "TABLET DEVICE_ID TB2 / LOCATIE_ID: VT1 " + param0 ,    param1 , "device_id: "+ param2  , "location_id: "+  param3  );
		
		io.emit('message', param0, "doorsturen_aan", "tv2", param3);	
		io.emit('message', param0, "doorsturen_aan", "tb2", param3);	
		io.emit('message', param0, "doorsturen_aan", "vr3", param3);	
		io.emit('message', param0, "doorsturen_aan", "wb2", param3);			

		}
	});		
	
// VR headset	 DEVICE_ID: VR1   
		socket.on('stuur', function(param0, param1, param2, param3) {
        if(  (param2== 'vr1') && (param3== 'vt1')){

		console.log ( "van VR headset data doorsturen " + param0 ,    param1 , "device_id: "+ param2  , "location_id: "+  param3  );
		
		io.emit('message', param0, param1, "tv1", param3);	
		io.emit('message', param0, param1, "tb1", param3);	
		io.emit('message', param0, param1, "wb1", param3);	

		}
	});	
	
// VR headset    DEVICE_ID: VR3   
		socket.on('stuur', function(param0, param1, param2, param3) {
        if(  (param2== 'vr3') && (param3== 'vt1')){

		console.log ( "van VR headset data doorsturen " + param0 ,    param1 , "device_id: "+ param2  , "location_id: "+  param3  );
		
		io.emit('message', param0, param1, "tv2", param3);	
		io.emit('message', param0, param1, "tb2", param3);	
		io.emit('message', param0, param1, "wb2", param3);		

		}
	});	






	
	
	
	socket.on('message', function(msg){  // deze functie ontvangt de socket van de client en zet ze door naar unity
        if (msg[0] == 'photo') {
			io.emit('message', 'photo' , msg[1] );
			console.log (msg[0]);
			console.log (msg[1]);
		}
    });
    

	
// uitleg: onderstaand ontvangt eerste socket x, en daarna een 2e waarde. deze tweede waarde wordt opgeslagen in variable (x). vervolgens wordt deze variable als 3e socket meegestuurd
// onderstaande x en y ontvangt hij van unity script readCameraAndSendXYendXY.cs. dit script stuurt de x en y variable en deze index.js stuurt het 1 op 1 door!

// ONDERSTAANDE IS ESSENTIEEL VOOR 2.0 ALERT ONLINE (VGZ GAME) WAAR VANUIT UNITY DE SOCKETS X EN Y KOMEN!!!!
// ONDERSTAANDE SOCKET BESTAAT UIT 3 VARIABLE: MESSAGE, X, WAARDE (BIJVOORBEELD 223). DEZE OPBOUW IS IN UNITY GEMAAKT EN DEZE 3 WAARDEN STUURT UNITY DOOR NAAR DE  NODE.JS SERVER. ONDERSTAANDE SCRIPT
// STUURT DEZE 3 WAARDE 1 OP 1 DOOR NAAR KRPANO WAARDOOR DE WEBSITE MEE BEWEEGT

    socket.on('x', function(x) {
		//console.log("The x is: " + x);
		io.emit('message', 'x', x);
	});

    socket.on('y', function(y) {
		//console.log("The y is: " + y);
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
	
	socket.on('gamma', function(u) {
		console.log("gamma " + u);
		io.emit('message', 'gamma', u);
	});		

/////////////////// nieuw 6 juni  //////////////////////////

	socket.on('hlookat', function(u) {
		console.log("hlookat " + u);
		io.emit('message', 'hlookat', u);
	});		
	
		socket.on('vlookat', function(u) {
		console.log("vlookat " + u);
		io.emit('message', 'vlookat', u);
	});		
	

///////////////////////////////////////////////////////////


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
	
		socket.on('spinnerObject1', function(u) {
		console.log("spinnerObject1 " + u);
		io.emit('message', 'spinnerObject1', u);
	});	
	
	// op 28 maart nieuw met mark gemaakt
	// deze ontvangt een socket met 4 variabele en stuurt hem 1 op 1 door!
	
	socket.on('stuur', function(param1, param2, param3, param4) {
		io.emit('message', param1, param2, param3, param4);
		
		//console.log (param1);
		//console.log (param2);
		//console.log (param3);
		//console.log (param4);
	
	});
	
	
	
///////////////////  vanuit krpano_html komt een scene nummer. dit is 1 of 2. hij ontvangt 2 variable. scene en scene1_krpano. scene_krpano is msg. 
// vervolgens stuurt hij 3 variable. voor unity is message altijd nodig (dacht ik?). message is in unity arg[0] (dacht ik?)
// hij stuurt dus message / scene / scene1_krpano als voorbeeld 

	socket.on('scene', function(msg) {
		console.log('Receiving socket on scene: ' + msg);
		io.emit('message', 'scene', msg);   
	});
		
	socket.on('vraag', function(msg) {
		console.log('Receiving socket on vraag: ' + msg);
		io.emit('message', 'vraag', msg);   
	});	
	
	
	
});  // einde sockets ontvangen


app.use(express.static(__dirname + '/node_modules'));
app.use('/static', express.static(path.join(__dirname, 'public')));

///////    NIEUWE CODE. IN HTML KOMT EEN KNOP EN HIERBIJ STAAT /RETURN: DAN HOEF JE NIET IEDERE KNOP OPNIEUW TE DEFINIEREN HIER !!!              //////    NIEUWE CODE. IN HTML KOMT /RETURN;     /////////////////
///////    NIEUWE CODE. IN HTML KOMT EEN KNOP EN HIERBIJ STAAT /RETURN: DAN HOEF JE NIET IEDERE KNOP OPNIEUW TE DEFINIEREN HIER !!!              //////    NIEUWE CODE. IN HTML KOMT /RETURN;     /////////////////
///////    NIEUWE CODE. IN HTML KOMT EEN KNOP EN HIERBIJ STAAT /RETURN: DAN HOEF JE NIET IEDERE KNOP OPNIEUW TE DEFINIEREN HIER !!!              //////    NIEUWE CODE. IN HTML KOMT /RETURN;     /////////////////
///////    NIEUWE CODE. IN HTML KOMT EEN KNOP EN HIERBIJ STAAT /RETURN: DAN HOEF JE NIET IEDERE KNOP OPNIEUW TE DEFINIEREN HIER !!!              //////    NIEUWE CODE. IN HTML KOMT /RETURN;     /////////////////

// Roep deze aan als /return/{MESSAGE} en hij verstuurd de MESSAGE door naar unity. (socket)
// ik hoef nu niet iedere nieuwe input naar nodejs opnieuw aan te maken!

app.get('/return/:rec', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', req.params.rec);
	console.log (req.params.rec);		
	res.redirect('/');
});



// nieuw  28 maart  // onderstaand ontvangt vanuit index.html de code return2. deze zit op een knop. en stuurt 4 variabele mee

app.get('/return2/:param_1/:param_2/:param_3/:param_4', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	
	var param_1 = req.params.param_1;
	var param_2 = req.params.param_2;
	var param_3 = req.params.param_3;
	var param_4 = req.params.param_4;
	
	io.emit('message', param_1, param_2, param_3, param_4);
	console.log (param_1 + ' - ' + param_2 + ' - ' + param_3 + ' - ' + param_4);		
	res.redirect('/');
});






/////   LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA     
/////   LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA     
/////   LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA     
/////   LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA         /////////LINKEN VAN EEN SUB WEBPAGINA     


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



app.get('/longjpg_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/longjpg_html/index.html'));
});


app.get('/tablet_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/tablet_html/index.html'));
});



//// catapult



app.get('/catapult_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/catapult_html/index.html'));
});


//// einde catapult


app.get('/krpano_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/krpano_html/index.html'));
});


app.get('/feesttimo_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/feesttimo_html/index.html'));
});




app.get('/AR_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/AR_html/index.html'));
});


app.get('/krpanoControl_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/krpanoControl_html/index.html'));
});


app.get('/krpanoSlave_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/krpanoSlave_html/index.html'));
});


//  ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       
//  ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       ZEILEN       

app.get('/zeilenSlaveSocket_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/zeilenSlaveSocket_html/index.html'));
});

app.get('/zeilenSlave_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/zeilenSlave_html/index.html'));
});

app.get('/zeilenScherm_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/zeilenScherm_html/index.html'));
});


app.get('/zeilenControl_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/zeilenControl_html/index.html'));
});


// VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       
// VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL       VIRTUAL TRAVEL     


app.get('/VirtualTravel_1_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_html/VirtualTravel_1_html/index.html'));
});

app.get('/VirtualTravel_2_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_html/VirtualTravel_2_html/index.html'));
});

app.get('/VirtualTravel_3_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_html/VirtualTravel_3_html/index.html'));
});


app.get('/VirtualTravel_4_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_html/VirtualTravel_4_html/index.html'));
});


// ITB		ITB		 ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		   
// ITB		ITB		 ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		ITB		   

app.get('/VirtualTravel_itb_1_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_itb_html/VirtualTravel_itb_1_html/index.html'));
});

app.get('/VirtualTravel_itb_2_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_itb_html/VirtualTravel_itb_2_html/index.html'));
});

app.get('/VirtualTravel_itb_3_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_itb_html/VirtualTravel_itb_3_html/index.html'));
});


app.get('/VirtualTravel_itb_4_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/VirtualTravel_itb_html/VirtualTravel_itb_4_html/index.html'));
});



//  VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020     
//  VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020       VAKANTIEBEURS 2020   


app.get('/webcontroller_1_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/webcontroller_html/webcontroller_1_html/index.html'));
});

app.get('/webcontroller_2_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/webcontroller_html/webcontroller_2_html/index.html'));
});

app.get('/webcontroller_3_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/webcontroller_html/webcontroller_3_html/index.html'));
});

app.get('/webcontroller_4_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/webcontroller_html/webcontroller_4_html/index.html'));
});

app.get('/webcontroller_5_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/webcontroller_html/webcontroller_5_html/index.html'));
});

app.get('/webcontroller_6_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/webcontroller_html/webcontroller_6_html/index.html'));
});


app.get('/murdergame_dock_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/public/murdergame_dock_html/index.html'));
});

app.get('/murdergame_vr_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/public/murdergame_vr_html/index.html'));
});












//  EINDE    EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE      
//  EINDE    EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE     EINDE 









app.get('/ad_product_html', function(req, res) {
	res.sendFile(path.join(__dirname+'/ad_product_html/index.html'));
});

app.get('/ad_product_html_rotterdam', function(req, res) {
	res.sendFile(path.join(__dirname+'/ad_product_html_rotterdam/index.html'));
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/scene_1_load360_from_internet', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'scene_1_load360_from_internet' );
	console.log ('scene_1_load360_from_internet');	
	res.redirect('/');
});

app.get('/scene_1_load360_from_default', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'scene_1_load360_from_default' );
	console.log ('scene_1_load360_from_default');	
	res.redirect('/');
});


app.get('/scene_1_load360_from_internet_360', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'scene_1_load360_from_internet_360' );
	console.log ('scene_1_load360_from_internet_360');	
	res.redirect('/');
});

app.get('/scene_1_load360_from_default_360', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'scene_1_load360_from_default_360' );
	console.log ('scene_1_load360_from_default_360');	
	res.redirect('/');
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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


///// REMOTE AFSTANDBEDIENING   //   VIDEO AAN OF UIT      ///// REMOTE AFSTANDBEDIENING   //   VIDEO AAN OF UIT      ///// REMOTE AFSTANDBEDIENING   //   VIDEO AAN OF UIT      ///// REMOTE AFSTANDBEDIENING   

app.get('/remote_play_timo1', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'remote_play_timo1' , 'remote_play_timo1' );
	console.log ('remote_play_timo1');	
	res.redirect('/');
});   


app.get('/remote_stop_timo1', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).on(1, 1);
	io.emit('message', 'remote_stop_timo1' , 'remote_stop_timo1' );
	console.log ('remote_stop_timo1');	
	res.redirect('/');
});   

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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











app.get('/ad_product', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'ad_product' );
	console.log ('ad_product');		
	res.redirect('/');
});



app.get('/ad_product_rotterdam', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	

	console.log ('wat staat hier');		
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

app.get('/rotterdam_aan', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	
	io.emit('message', 'reset_headset', 'doorsturen_aan', 'vr1', 'vt1' );	
	
	io.emit('message', 'laad_foto0', 'doorsturen_aan', 'tb1', 'vt1' );	
	io.emit('message', 'laad_foto0', 'doorsturen_aan', 'vr1', 'vt1' );
	io.emit('message', 'laad_foto0', 'doorsturen_aan', 'vr2', 'vt1' );	
	io.emit('message', 'laad_foto0', 'doorsturen_aan', 'tv1', 'vt1' );
	io.emit('message', 'laad_foto0', 'doorsturen_aan', 'wb1', 'vt1' );

	res.redirect('/');
});

app.get('/rotterdam_uit', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'tb2', 'vt1' );	
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'vr3', 'vt1' );
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'tv2', 'vt1' );
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'wb2', 'vt1' );
	
	res.redirect('/');
});



// knoppen vanuit webcontroller_3_html

app.get('/tv1_aan_webcontroller_3', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	
	io.emit('message', 'reset_headset', 'doorsturen_aan', 'vr1', 'vt1' );	
	
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'tb1-test', 'vt1' );	
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'vr1-test', 'vt1' );
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'vr2-test', 'vt1' );	
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'tv1-test', 'vt1' );
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'wb1-test', 'vt1' );

	res.redirect('/');
});

app.get('/tv1_uit_webcontroller_3', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	
	io.emit('message', 'laad_foto17_1', 'doorsturen_aan', 'vr1', 'vt1' );	
	
	io.emit('message', 'laad_foto17_2', 'doorsturen_aan', 'tb2-test', 'vt1' );	
	io.emit('message', 'laad_foto17_2', 'doorsturen_aan', 'vr3-test', 'vt1' );
	io.emit('message', 'laad_foto17_2', 'doorsturen_aan', 'tv2-test', 'vt1' );
	io.emit('message', 'laad_foto17_2', 'doorsturen_aan', 'wb2-test', 'vt1' );
	
	res.redirect('/');
});













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

app.get('/speed_kogel', function (req, res) {
	//KlikAanKlikUit(11, 260, 7, 5).off(1, 2);
	io.emit('message', 'pi', 'speed_kogel', req.query.val );
	console.log ('speed_kogel' + req.query.val);		
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
