/** 
 * This is the description of the HelloWorld component. Here you can set any HTML text 
 * for putting on the generated documentation.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @param {Object} options An object with the options for HelloWorld component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string} [fontFamily=��Andale mono�, courier, monospace�] 
 *    Font list to be applied to the component content.
 *  
 * @option {string} [fontColor="white"] 
 *    HTML color code for the font.
 *    
 * @option {string} [backgroundColor="#7BBFE9"] 
 * 	  Background color for the entire div content.
 * 
 * @option {Object} [selectionFontColor="white"] 
 * 	  This color will be used to change the font color of selected text.
 * 
 * @option {Object} [ selectionBackgroundColor="yellow"] 
 * 	  This color will be used to change the background of selected text.
 *     
 * @example 
 * var instance = new Biojs.HelloWorld({
 * 		target : "YourOwnDivId",
 * 		selectionBackgroundColor : '#99FF00'
 * });	
 * 
 */
Biojs.HelloWorld = Biojs.extend (
/** @lends Biojs.HelloWorld# */
{
  constructor: function (options) {
	  var self = this;
	  
	  // Apply options values
	  jQuery("#"+self.opt.target).css({
		  'font-family': self.opt.fontFamily,
		  'background-color': self.opt.backgroundColor,
		  'color': self.opt.fontColor,
		  'font-size': '36px',
		  'text-align': 'center',
		  'vertical-align':'middle',
		  'display': 'table-cell',
		  'width': '597px',
		  'height': '300px'		  
	  });
	
	  // Disable text selection and
	  // Change the selection mouse pointer  
	  // from text to hand.
	  jQuery("#"+self.opt.target).css({
		  '-moz-user-select':'none',
		  '-webkit-user-select':'none',
		  'user-select':'none'
	  });

	  // Set the content
	  text = 'Hello World!';
	  contentHTML = '';
	  for( i=0; i< text.length; i++ ) {
		  contentHTML += '<span>' + text[i] + '</span>';
	  }	  
	  jQuery( contentHTML ).appendTo( "#"+self.opt.target );  

	  // Internal method to initialize mouse events
	  self._addSelectionTrigger();
  },

  /**
   *  Default values for the options
   *  @name Biojs.HelloWorld-opt
   */
  opt: {
     target: "YourOwnDivId",
     fontFamily: '"Andale mono", courier, monospace',
     fontColor: "white",
     backgroundColor: "#7BBFE9",
     selectionFontColor: "black",
     selectionBackgroundColor: "yellow"
  },
  
  /**
   * Array containing the supported event names
   * @name Biojs.HelloWorld-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.HelloWorld#onHelloSelected
	 * @event
	 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	 * @eventData {Object} source The component which did triggered the event.
	 * @eventData {string} type The name of the event.
	 * @eventData {int} textSelected Selected text, will be 'Hello' obviously.
	 * @example 
	 * instance.onHelloSelected(
	 *    function( objEvent ) {
	 *       alert("The word " + objEvent.textSelected + " was selected.");
	 *    }
	 * ); 
	 * 
	 * */
     "onHelloSelected"      
  ], 
  
  /**
   * Change the font size. Do nothing it no value is provided.
   * 
   * @param {string} [size] The new font size in pixels.
   *
   * @example 
   * instance.setSize("72px");
   */
  setSize: function(size) {
	  if ( size != undefined ){
		  jQuery("#"+this.opt.target).css('font-size', size);
	  }
  },
  
  _addSelectionTrigger: function() {

	  var self = this;
	  var isMouseDown = false;
	  
	  /**
	   * @private
	   * @function
	   */
	  var toggleClass = function (span) {
		  span.toggleClass( 'selected' );
			if ( span.hasClass('selected') ) {
				span.css('color', self.opt.selectionFontColor)
					.css("background-color", self.opt.selectionBackgroundColor);
			} else {
				span.css('color', self.opt.fontColor)
					.css("background-color", self.opt.backgroundColor);
			}
	  };

	  jQuery( '#' + self.opt.target ).find('span')
	  	.mousedown(function() {
			isMouseDown = true;
			jQuery('#' + self.opt.target + ' span' ).each( function() {
				jQuery(this).removeClass('selected')
					.css('color', self.opt.fontColor)
					.css("background-color", self.opt.backgroundColor);
			});
			toggleClass( jQuery(this) );
		})
		.mouseover(function() {
			if (isMouseDown) {
				toggleClass( jQuery(this) );
			}	
		})
		.mouseup(function() {
			isMouseDown = false;
			var textSelected = '';
			
			jQuery('#' + self.opt.target + ' span.selected' )
			.each(function(){
				textSelected += jQuery(this).text();
			});
			
			if (textSelected == 'Hello') {
				self.raiseEvent('onHelloSelected', {
					textSelected : textSelected
				})
			}
		});
  }
  
});