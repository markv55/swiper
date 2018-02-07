var eerstekeer = true;
var position_new = 0;	
var index_changed  ;

var Rotator = {

    targetImage: null,
    currentImageIndex: 1,
    maxImageIndex: 16,
    debug: false,
    debugElement: null,
    lastHorizontalInput: 0,
    offsetSteps: 550,
    highRes: false,



    preLoad: function() {
        for (var i = 1; i < (this.maxImageIndex + 1); i++) {
            var imagePath = './images/' + i + '.png';
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
		//console.log(direction); // de plek (links of rechts) tov het eerste 0-punt
           console.log("offset   " + offset);	// de afstand tov het eerste 0-punt
         //console.log(duration);	//het tijdstip tov het 0-punt		  
         // console.log(fingers);	// aantal vingers?		  
         //console.log(fingerData);	
         // deze  console.log(currentDirection);			

console.log("oude pos   " + position_new);
	


		 
      if (offset < 10){
            return;
        }

		
		if (currentDirection == 'left'){
			//console.log("gaat linksfffffffffff");	
			//console.log(offset);	
			//console.log(position_new);	
			//console.log(index_changed);				
		
			if ( (offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;			
				index_changed = true;
				direction.x = "left";
				this.currentImageIndex -= 1;
				console.log("gaat links");				
			}
		}else if (currentDirection == 'right'){
			if ((offset - position_new > 20) || (offset - position_new < -20)){
				position_new = offset;
				direction.x = "right";
				this.currentImageIndex += 1;
				console.log("gaat links");	
			}			
		}else{
			return;
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
		
        if (this.currentImageIndex > this.maxImageIndex) {
            this.currentImageIndex = 1;
        }else if (this.currentImageIndex < 1) {
            this.currentImageIndex = 16;
        }

        this.currentImageIndex = parseInt(this.currentImageIndex);

        if (this.targetImage !== null) {
            this.targetImage.attr('src', './images/' + this.currentImageIndex + '.png');
        }
    },

    setHighRes: function() {
        this.targetImage.attr('src', './images/high/' + this.currentImageIndex + '.png');
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