// mark hoe kan ik de startfoto instellen. nu is die startfoto 001, maar ik wil 128 als startfoto hebben!!!
// mark op regel 248 zit de socket. deze moet pas sturen bij 1 graad verschil



var position_new = 0;	
var index_changed  ;

var Rotator = {

    targetImage: null,
    currentImageIndex: 1,  
	
	
	// onderstaand de startpositie. x is kolom, en y is rij nummer.
	x: 1,
	y: 1,
	
	yOffset: 16, 
	
	playingToLabel: false,
	xToLabelTarget: 0,
	yToLabelTarget: 0,
	playToLabelInterval: null,
	
    maxImageIndex: 256,
    debug: false,
    debugElement: null,
    lastHorizontalInput: 0,
    offsetSteps: 550,
    highRes: false,
	currentDirections: [0, 0, 0, 0], //n, o, z, w (up, right, down, left) 

	socket: null,

	create: function() {
    	this.socket = io();
	},

    preLoad: function() {

	/*   let op preloaden uitgezet! zodat hij voor de AR afstandbediening niet alle fotos inlaad!
        for (var i = 1; i < (this.maxImageIndex + 1); i++) {

            var imageIndexString = i;
            if (i < 100){
                imageIndexString = '0' + imageIndexString;
            }
            if (i < 10) {
                imageIndexString = '0' + imageIndexString;
            }

            var imagePath = '/static/images3/' + imageIndexString + '.jpg';  // probleem?? laad hij wel de 001.jpg of alleen de 1.jpg????
            var image = new Image();
            image.src = imagePath;
            console.log('preloading..' + imagePath);
        }*/
    },

    resetHorizontalInput() {
      this.lastHorizontalInput = 0;
    },

	
	playToLabel(x, y, currentPz, px, py) {
		
		this.playingToLabel = true;
		this.xToLabelTarget = x;
		this.yToLabelTarget = y;
		
		this.playToLabelInterval = setInterval(function() {
		
					
			if (Rotator.x != Rotator.xToLabelTarget) {
				Rotator.x += (Rotator.x < Rotator.xToLabelTarget) ? 1 : -1;
				
				Rotator.currentImageIndex = parseInt(Rotator.x + ((Rotator.y -1) * Rotator.yOffset));
				Rotator.refreshImageIndex();
				
			}else if (Rotator.y != Rotator.yToLabelTarget) {
				Rotator.y += (Rotator.y < Rotator.yToLabelTarget) ? 1 : -1;
				
				
				Rotator.currentImageIndex = parseInt(Rotator.x + ((Rotator.y -1) * Rotator.yOffset));
				Rotator.refreshImageIndex();
			}else {
					
				Rotator.currentImageIndex = parseInt(Rotator.x + ((Rotator.y -1) * Rotator.yOffset));
				Rotator.refreshImageIndex();
				
				Rotator.playingToLabel = false;
				clearInterval(Rotator.playToLabelInterval);
				
			
				if (currentPz != null) {
					currentPz.zoom(3, 1);
					currentPz.x(px, 1);
					currentPz.y(py, 1);
				}
			}
		
		}, 100);
			
	},

	
// Swipe status binnen halen en naar volgende en vorige foto!////////////////////////////////////////////////////////////	
    getSwipe: function(event, phase, direction, offset, duration, fingers, fingerData, currentDirection ) {
			// console.log(event);	// alleen null?
			//console.log(phase); // move of cancel
			//console.log("direction:  " + direction); // de plek (links of rechts) tov het eerste 0-punt
			console.log("offset   " + offset);	// de afstand tov het eerste 0-punt
			//console.log(duration);	//het tijdstip tov het 0-punt		  
			// console.log(fingers);	// aantal vingers?		  
			//console.log(fingerData);	
			console.log("currentdirection:  "+ currentDirection);			
			//console.log("oude pos   " + position_new);
			console.log(this.currentDirections);

		if (this.playingToLabel) {
			return;
		}
		 
		if (offset < 10){
            return;
        }
		

		if (currentDirection == 'left'){
			this.currentDirections[3] += 1;
			//console.log(offset);	
			//console.log(position_new);	
			//console.log(index_changed);				
		
			if ( (offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;			
				index_changed = true;
				direction.x = "left";  // wordt niet gebruikt
				//this.currentImageIndex -= 1;
				
				this.x -= 1;
				//console.log("gaat links");				
			}
		}else if (currentDirection == 'right'){
			//console.log("gaat rechtssssssssssssssss");				
			this.currentDirections[1] += 1;
			
			if ((offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;
				direction.x = "right";  // wordt niet gebruikt
				//this.currentImageIndex += 1;
				this.x += 1;
				//console.log("gaat rechts");	
			}			
		}else if (currentDirection == 'up') {
			this.currentDirections[0] += 1;
			
			if ((offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;
				//this.currentImageIndex += 16;
				this.y += 1
			}
			
		}else if (currentDirection == 'down') {
			this.currentDirections[2] += 1;
			
			if ((offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;
				//this.currentImageIndex -= 16;
				this.y -= 1;
			}
		}
		
		
		
	/*	
        var horizontal_offset = offset;

        if (horizontal_offset - this.lastHorizontalInput > this.offsetSteps) {
            direction.x = "left";
        }else if (horizontal_offset - this.lastHorizontalInput < -this.offsetSteps) {
            direction.x = "right";
        }else {
            return;
        }
*/		
		
		
		
// tijdelijk uitgezet		
/*		
        direction = { x: direction, y: 0};
*/
		
// nieuwe regel
      //  direction = { x: currentDirection, y: 0};
// einde nieuwe regel		

        //this.lastHorizontalInput = horizontal_offset;

     /*   if (direction.x == 'left') {
            this.currentImageIndex -= 1;
        }else if (direction.x == 'right') {
            this.currentImageIndex += 1;
        }
*/
		/*
        if (this.currentImageIndex > this.maxImageIndex) {
            this.currentImageIndex = 1;
        }else if (this.currentImageIndex < 1) {
            this.currentImageIndex = 256;
        }
		*/
		
		if (this.x < 1) {
			this.x = this.yOffset;
		}else if (this.x > this.yOffset) {
			this.x = 1;
		}
		
		if (this.y < 1) {
			this.y = this.yOffset;
		}else if (this.y > this.yOffset) {
			this.y = 1;
		}

		this.currentImageIndex = parseInt(this.x + ((this.y -1) * this.yOffset));
		
        //this.currentImageIndex = parseInt(this.currentImageIndex);

        this.refreshImageIndex();
    },
	
// nieuwe code: rotatie informatie van smartphone gebruiken voor left/right en up/down	
	current_gamma: 0,
	current_alpha: 0,
	current_beta: 0,
	last_dev: 0,
	
	old_alpha: 0,
	old_beta: 0,
	old_gamma: 0,
	
	getByMobileOrientation() {		
		if(window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', function(event) {		
				var alpha = event.alpha;
				var beta = event.beta;
				var gamma = event.gamma;
				
				//alert ("test");
				
				
				// 7 maart werkt!!!  hier sturen we de alpha en beta als socket naar nodejs
				//this.socket.emit('alpha', alpha); // alpha is de rotation (kompaswaarde) van een vliegtuig
				//this.socket.emit('beta', beta);	// beta is de stijghoek van een vliegtuig			
				
				
				if (alpha - this.old_alpha > 1 || alpha - this.old_alpha < -1) {	
					this.old_alpha = alpha;
					this.socket.emit('alpha', alpha); // alpha is de rotation (kompaswaarde) van een vliegtuig
				}
				
				if (beta - this.old_beta > 1 || beta - this.old_beta < -1) {				
					this.old_beta = beta;
					this.socket.emit('beta', beta);	// beta is de stijghoek van een vliegtuig					
				}				


				if (gamma - this.old_gamma > 1 || gamma - this.old_gamma < -1) {				
					this.old_gamma = gamma;
					this.socket.emit('gamma', gamma);	// gamma is nieuw					
				}					
				
	

	
				if (this.current_alpha === null){
					this.current_alpha = alpha;
				}

				if (this.current_gamma === null){
					this.current_gamma = gamma;
				}

				if (this.current_beta === null){
					this.current_beta = beta;
				}
				
					/*alert ('he im moving right');
					
				var date = new Date();
				if (date.getTime() > this.last_dev){
					this.last_dev = date.getTime()+20;
				}else{
					return;
				}*/
				
				var dif_alpha = alpha - this.current_alpha;

				//if(alpha!=null || beta!=null || gamma!=null) 
				//	dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
				
				
				//return if zoomed or anything else
					
				if (beta > 85 && beta < 95){
					return;
				}
				
								
				var move_right = false;
				var move_left = false;

				var move_down = false;
				var move_up = false;
				
				if (dif_alpha > 2 && dif_alpha < 200){  // let op stond op 10 voor de normale spinner dat hij 1 op 1 volgt. met een 1 is het reageren op de laser
					move_right = true;
				}else{
					if (dif_alpha > 200){
						move_left = true;
					}
				}
				
				if (dif_alpha < -2 && dif_alpha > -200){  // let op stond op 10
					this.current_alpha = alpha;
					move_left = true;
				}else{
					if (dif_alpha < -200){
						move_right = true;
					}
				}
				
				var dif_beta = beta - this.current_beta;  //let op stond op 10 en -10
				if (dif_beta > 2){
					move_down = true;  // let op deze stond origineel op move_up =true. maar voor de laser heb ik hem op move down = true gezet 
				}else if (dif_beta < -2){
					move_up = true;  // let hier stond origineel move_down = true
				}  
				
				
				
				if (move_right){
				
					this.current_gamma = gamma;
					this.current_alpha = alpha;
				
					//Move right
					this.x += 1;

				}else if(move_left){
					this.current_gamma = gamma;
					this.current_alpha = alpha;
					//Move left
					this.x -= 1;
				}

				if (move_up){
					this.current_beta = beta;
					//Move up
					//this.y += 1;  // origineel
					this.y -= 1;  // let op ik het up en down omgerdraaid!!!	 dit is voor AR omdat hij de smartphone niet goed volgde				

				}else if (move_down){
					this.current_beta = beta;
					//Move down
					//this.y -= 1; // origineel
					this.y += 1;  // let op up en down omgedraaid!!	dit is voor AR omdat hij de smartphone niet goed volgde	 			
				}
				
				if (this.x < 1) {
					this.x = this.yOffset;
				}else if (this.x > this.yOffset) {
					this.x = 1;
				}
				
				if (this.y < 1) {
					this.y = this.yOffset;
				}else if (this.y > this.yOffset) {
					this.y = 1;
				}

				this.currentImageIndex = parseInt(this.x + ((this.y -1) * this.yOffset));
			
				this.refreshImageIndex();
			}.bind(this));
		}
	},

	
	
	lastImageImageCall: 0,

	refreshImageIndex() {
		if (this.targetImage !== null) {
			
			var imageIndexString = this.currentImageIndex;
			if (this.currentImageIndex < 100){
				imageIndexString = '0' + imageIndexString;
			}
			if (this.currentImageIndex < 10) {
				imageIndexString = '0' + imageIndexString;	
			}

            if (this.currentImageIndex != this.lastImageImageCall) {
                this.socket.emit('message', [ 'photo', imageIndexString ]);
                this.lastImageImageCall = this.currentImageIndex;
            }
			
            this.targetImage.attr('src', '/static/images3/' + imageIndexString + '.jpg');

        }
	},
	


    setHighRes: function() {
		var imageIndexString = this.currentImageIndex;
		if (this.currentImageIndex < 100){
			imageIndexString = '0' + imageIndexString;

		}
		if (this.currentImageIndex < 10) {
			imageIndexString = '0' + imageIndexString;	

		}
        this.targetImage.attr('src', '/static/images3/high/' + imageIndexString + '.jpg');

	
    },

    log: function(line) {
        if (this.debug) {
            current_val = this.debugElement.html();
            this.debugElement.html(line + "\r\n" + current_val );
        }
    },

    setTargetImage: function(target) {
        this.targetImage = target;
    },

    setDebug: function(element) {
        this.debug = true;
        this.debugElement = element;
    },

    setOffsetSteps: function(boxWidth) {
        this.offsetSteps = parseInt(boxWidth / this.maxImageIndex);
        this.log("Offset steps: " + this.offsetSteps);
    }
}
									

$(function() {


    Rotator.preLoad();
    Rotator.create();
    /*
    function updateZoomEvent(e) {
        if (e.type == PinchZoomer.ZOOM.split(".")[0]){
            if (currentPz.zoom() <= 1 && didZoom) {
                didZoom = false;
                $('#start-drag').click();
            } else if (currentPz.zoom() >= 1.1){
                didZoom = true;
            }
        }
    }*/

    var target = $('#targetImage');
    target.pinchzoomer();
    var currentPz = false;
    var currentZoom = 1;
	
	// hier kun je ook variabele neerzetten
	

    function updateZoomEvent(e) {
        if (e.type == PinchZoomer.ZOOM.split(".")[0]) {
            if (currentPz) {
                currentZoom = currentPz.zoom();
                if (currentZoom > 1.5) {
                    Rotator.setHighRes();
                }
            }
        }
    }

    $.each(PinchZoomer.objs, function (key, value) {
        currentPz = PinchZoomer.get(key);
        currentPz.on(PinchZoomer.ZOOM, updateZoomEvent);
    });

    $('img').on('dragstart', function(event) { event.preventDefault(); });

    $('html').on('touchstart click', function() {
       Rotator.resetHorizontalInput();
    });

	
// ophalen van de swipe informatie /////////////////////////
    $("html, body").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            if (currentZoom <= 1) {
                Rotator.getSwipe(event, phase, direction, distance, duration, fingers, fingerData, currentDirection);
            }
        },
        fingers:'all'
    });
	
	
	$('.js-play-to-label').on('click', function(e){
		e.preventDefault();
		
		if (!Rotator.playingToLabel) {
			currentPz.zoom(1, 1);
			Rotator.playToLabel(4, 4, currentPz, -220 - 110, -220 - 110);
		}
	});
	
	$('.js-play-to-label2').on('click', function(e){
		e.preventDefault();
		if (!Rotator.playingToLabel) {
			currentPz.zoom(1, 1);
			Rotator.playToLabel(10, 10, currentPz, -220 - 110, -220 + 110);
		}
	});
    /*
    var delays = {};

    $(document).on('touchend touchcancel', 'body, html', function(){
        for (var i = 0; i < delays.count; i++) {
            clearTimeout(delays[i]);
        }
        $('#imageContainer').hide();
    });

    $("html, body").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            Rotator.getSwipe(direction, 10);

            if (fingers == 1) {
                delays.push(setTimeout(function() {
                    $('#imageContainer').show();
                }, 500));

            } else {
                for (var i = 0; i < delays.count; i++) {
                    clearTimeout(delays[i]);
                }
                $('#imageContainer').hide();
            }

            if (phase == "end" || phase == 'cancel') {
                for (var i = 0; i < delays.count; i++) {
                    clearTimeout(delays[i]);
                }
                $('#imageContainer').hide();
            }

        },
        triggerOnTouchLeave: true,
        fingers:'all'
    });
    */



    Rotator.setTargetImage($('#targetImage'));
    Rotator.setDebug($('#debug'));
    Rotator.setOffsetSteps($('#targetImage').width() * 0.5);
	Rotator.getByMobileOrientation();

	
});
