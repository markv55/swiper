
var position_new = 0;	
var index_changed  ;

var Rotator = {

    targetImage: null,
    currentImageIndex: 1,
	
	x: 0,
	y: 0,
	
	yOffset: 16,
	
    maxImageIndex: 256,
    debug: false,
    debugElement: null,
    lastHorizontalInput: 0,
    offsetSteps: 550,
    highRes: false,
	currentDirections: [0, 0, 0, 0], //n, o, z, w (up, right, down, left) 


    preLoad: function() {
        for (var i = 1; i < (this.maxImageIndex + 1); i++) {
            var imagePath = './images2/' + i + '.jpg';
            var image = new Image();
            image.src = imagePath;
            //console.log('preloading..' + imagePath);
        }
    },

    resetHorizontalInput() {
      this.lastHorizontalInput = 0;
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

		 
		if (offset < 10){
            return;
        }

		//console.log("direction verder in code:  " + direction); // de plek (links of rechts) tov het eerste 0-punt
		if (currentDirection == 'left'){
			this.currentDirections[3] += 1;
			
			//console.log("gaat linksfffffffffff");	
			//console.log(offset);	
			//console.log(position_new);	
			//console.log(index_changed);				
		
			if ( (offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;			
				index_changed = true;
				direction.x = "left";  // wordt niet gebruikt
				this.currentImageIndex -= 1;
				//console.log("gaat links");				
			}
		}else if (currentDirection == 'right'){
			//console.log("gaat rechtssssssssssssssss");				
			this.currentDirections[1] += 1;
			
			if ((offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;
				direction.x = "right";  // wordt niet gebruikt
				this.currentImageIndex += 1;
				//console.log("gaat links");	
			}			
		}else if (currentDirection == 'up') {
			this.currentDirections[0] += 1;
			
			if ((offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;
				this.currentImageIndex += 16;
				
				if (this.currentImageIndex > )
			}
			
		}else if (currentDirection == 'down') {
			this.currentDirections[2] += 1;
			
			if ((offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;
				this.currentImageIndex -= 16;
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

        this.currentImageIndex = parseInt(this.currentImageIndex);

        if (this.targetImage !== null) {
			
			var imageIndexString = this.currentImageIndex;
			if (this.currentImageIndex < 100){
				imageIndexString = '0' + imageIndexString;
			}
			if (this.currentImageIndex < 10) {
				imageIndexString = '0' + imageIndexString;	
			}
			
            this.targetImage.attr('src', './images2/' + imageIndexString + '.jpg');
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
        this.targetImage.attr('src', './images2/high/' + imageIndexString + '.jpg');
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
                if (currentZoom > 3) {
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
});