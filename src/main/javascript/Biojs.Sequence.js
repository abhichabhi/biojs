/** 
 * Sequence component 
 * 
 * @class
 * @extends Biojs
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @requires <a href='http://jqueryui.com/download'>jQuery UI 1.8.16</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js"></script>
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, based on the code made 
 * by <a href="mailto:secevalliv@gmail.com">Jose Villaveces</a>
 * 
 * @param {Object} options An object with the options for Sequence component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string} sequence 
 *    The sequence to be displayed.
 *    
 * @option {string} [id] 
 *    Sequence identifier if apply.
 *    
 * @option {string} [format="FASTA"] 
 *    The display format for the sequence representation.
 *    
 * @option {Object[]} [highlights] 
 * 	  For highlighting multiple regions. Syntax: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}]
 * 
 * @option {Object} [columns={size:40,spacedEach:10}] 
 * 	  Options for displaying the columns. Syntax: { size: &lt;numCols&gt;, spacedEach: &lt;numCols&gt;}
 * 
 * @option {Object} [selection] 
 * 	  Positions for the current selected region. Syntax: { start: &lt;startValue&gt;, end: &lt;endValue&gt;}
 * 
 * @option {Object[]} [annotations] 
 *    Set of overlapping annotations. Must be an array of objects following the syntax:
 *     		<pre class="brush: js" title="Syntax:">
 *            [ 
 *              // An annotation:
 *              { name: &lt;name&gt;, 
 *                html: &lt;message&gt;, 
 *                color: &lt;color_code&gt;, 
 *                regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt; color: &lt;color_code&gt;}, ...,{ start: &lt;startValN&gt;, end: &lt;endValN&gt;, color: &lt;color_code&gt;}] 
 *              }, 
 *              
 *              // ...
 *              // more annotations here 
 *              // ...
 *            ]
 *    		 </pre>
 *    where:
 *      <ul>
 *        <li><b>name</b> is the unique name for the annotation</li>
 *        <li><b>html</b> is the message (can be HTML) to be displayed in the tool tip.</li>
 *        <li><b>color</b> is the default HTML color code for all the regions.</li>
 *        <li><b>regions</b> array of objects defining the intervals which belongs to the annotation.</li>
 *        <li><b>regions[i].start</b> is the starting character for the i-th interval.</li>
 *        <li><b>regions[i].end</b> is the ending character for the i-th interval.</li>
 *        <li><b>regions[i].color</b> is an optional color for the i-th interval.   
 *      </ul> 
 *       
 * @example 
 * var theSequence = 'mlpglallllaawtaralevptdgnagllaepqiamfcgrlnmhmnvqngkwdsdpsgtktcidtkegilqycqevypelqitnvveanqpvtiqnwckrgrkqckthphfvipyrclvgefvsdallvpdkckflhqermdvcethlhwhtvaketcsekstnlhdygmllpcgidkfrgvefvccplaeesdnvdsadaeeddsdvwwggadtdyadgsedkvvevaeeeevaeveeeeadddeddedgdeveeeaeepyeeaterttsiatttttttesveevvrevcseqaetgpcramisrwyfdvtegkcapffyggcggnrnnfdteeycmavcgsamsqsllkttqeplardpvklpttaastpdavdkyletpgdenehahfqkakerleakhrermsqvmreweeaerqaknlpkadkkaviqhfqekvesleqeaanerqqlvethmarveamlndrrrlalenyitalqavpprprhvfnmlkkyvraeqkdrqhtlkhfehvrmvdpkkaaqirsqvmthlrviyermnqslsllynvpavaeeiqdevdellqkeqnysddvlanmiseprisygndalmpsltetkttvellpvngefslddlqpwhsfgadsvpantenevepvdarpaadrglttrpgsgltnikteeisevkmdaefrhdsgyevhhqklvffaedvgsnkgaiiglmvggvviatvivitlvmlkkkqytsihhgvvevdaavtpeerhlskmqqngyenptykffeqmqn';
 * var mySequence = new Biojs.Sequence({
 * 		sequence : theSequence,
 * 		target : "YourOwnDivId",
 * 		format : 'CODATA',
 * 		id : 'P918283',
 * 		annotations: [
 *        { name:"CATH", 
 * 	  		color:"#F0F020", 
 * 	  		html: "Using color code #F0F020 ", 
 * 	  		regions: [{start: 122, end: 135}]
 * 		  },
 *        { name:"TEST", 
 *          html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
 *          color:"green", 
 *          regions: [
 *            {start: 285, end: 292},
 *            {start: 293, end: 314, color: "#2E4988"}]
 *        }
 *      ]
 * });	
 * 
 */

Biojs.Sequence = Biojs.extend(
/** @lends Biojs.Sequence# */
{	
	constructor: function (options) {
		var self = this;
		
		// Disable text selection
		jQuery("#"+self.opt.target).css({
                   '-moz-user-select':'none',
                   '-webkit-user-select':'none',
                   'user-select':'none'
        });
		
		self._headerDiv = jQuery('<div></div>').appendTo("#"+self.opt.target);
		self._headerDiv.css('font-family','"Heveltica Neue", Arial, "sans serif"').css('font-size','14px');
		
		self._contentDiv = jQuery('<div></div>').appendTo("#"+self.opt.target);
		self._contentDiv.css('font-family',this.opt.fontFamily).css('font-size',this.opt.fontSize);
		
		self._headerDiv.append('Format: ');

		var comboBox = jQuery('<select> '+
			'<option value="FASTA">FASTA</option>'+
			'<option value="CODATA">CODATA</option>'+
			'<option value="PRIDE">PRIDE</option>'+
			'<option value="RAW">RAW</option></select>').appendTo(self._headerDiv);

		jQuery(comboBox).change(function(e) {
			self.opt.format = comboBox.val();
			self._redraw();
		});
		
		for (var i in this.opt.highlights){
			this.highlight(this.opt.highlights[i].start, this.opt.highlights[i].end);
		}
		
		self._redraw();
	},
	
	
	/**
	 * Default values for the options
	 * @name Biojs.Sequence-opt
	 */
	opt : {
		
		sequence : "",
		id : "",
		target : "",
		format : "FASTA",
		selection: { startPos: 0, endPos: 0 },
		columns: { size: 35, spacedEach: 10 },
		highlights : [],
		annotations: [],
		
		// Styles 
		selectionColor : 'Yellow',
		highlightFontColor : 'red',
		highlightBackgroundColor : 'white',
		fontFamily: '"Andale mono", courier, monospace',
		fontSize: '12px',
		fontColor : 'black',
		backgroundColor : 'white'
		
	},
	
	/**
	 * Array containing the supported event names
	 * @name Biojs.Sequence-eventTypes
	 */
	eventTypes : [
		/**
		 * @name Biojs.Sequence#onSelectionChanged
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {int} start A number indicating the start of the selection.
		 * @eventData {int} end A number indicating the ending of selection.
		 * @example 
		 * mySequence.onSelectionChanged(
		 *    function( objEvent ) {
		 *       alert("Selected: " + objEvent.start + ", " + objEvent.end );
		 *    }
		 * ); 
		 * 
		 * */
		"onSelectionChanged",
		
		/**
		 * @name Biojs.Sequence#onSelectionChange
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {int} start A number indicating the start of the selection.
		 * @eventData {int} end A number indicating the ending of selection.
		 * @example 
		 * mySequence.onSelectionChange(
		 *    function( objEvent ) {
		 *       alert("Selection in progress: " + objEvent.start + ", " + objEvent.end );
		 *    }
		 * );  
		 * 
		 * 
		 * */
		"onSelectionChange",
		
		/**
		 * @name Biojs.Sequence#onAnnotationClicked
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {string} name The name of the selected annotation.
		 * @eventData {int} pos A number indicating the position of the selected amino acid.
		 * @example 
		 * mySequence.onAnnotationClicked(
		 *    function( objEvent ) {
		 *       alert("Clicked " + objEvent.name + " on position " + objEvent.pos );
		 *    }
		 * );  
		 * 
		 * */
		"onAnnotationClicked"
	],

	// internal members
	_headerDiv : null,
	_contentDiv : null,
	
	// Methods

	/**
    * Set the current selection in the sequence causing the event {@link Biojs.Sequence#onSelectionChanged}
    *
    * @example
    * // set selection from the position 100 to 150 
    * mySequence.setSelection(100, 150);
    * 
    * @param {int} start The starting character of the selection.
    * @param {int} end The ending character of the selection
    */
	setSelection : function(start, end) {
		if(start > end) {
			var aux = end;
			end = start;
			start = aux;

		}

		if(start != this.opt.selection.startPos || end != this.opt.selection.endPos) {
			this._setSelection(start, end);
			this.raiseEvent('onSelectionChanged', {
				start : start,
				end : end
			});
		}
	},
	
	/**
    * Highlights a region using the font color defined in {Biojs.Protein3D#highlightFontColor} by default is red.
    *
    * @example
    * // highlight the characters within the position 100 to 150, included.
    * mySequence.highlight(100, 150);
    * 
    * @param {int} start The starting character of the highlighting.
    * @param {int} end The ending character of the highlighting
    */
	highlight : function (start, end) {
		if ( start <= end ) {
			for ( var i=start; i <= end; i++ ){
				this._contentDiv.find('.sequence#'+i)
					.css("color", this.opt.highlightFontColor)
					.addClass("highlighted");
			}
		}
	},
	
	/**
    * Clear a highlighted region using.
    *
    * @example
    * // Clear the highlighted characters within the position 100 to 150, included.
    * mySequence.unHighlight(100, 150);
    * 
    * @param {int} start The starting character.
    * @param {int} end The ending character.
    */
	unHighlight : function (start, end) {	
		for( var i=start; i <= end; i++ ) {
			this._contentDiv.find('span.sequence.highlighted#'+i)
				.removeClass("highlighted")
				.css("color", this.opt.fontColor);
		}
	},
	
	/**
    * Clear the highlights of whole sequence.
    *
    */
	unHighlightAll : function () {
		this._contentDiv.find('span.sequence.highlighted').each( function() {
			jQuery(this).removeClass("highlighted").css("color", this.opt.fontColor);
		});
	},
	
	/**
    * Changes the current displaying format of the sequence.
    *
    * @example
    * // Set format to 'FASTA'.
    * mySequence.setFormat('FASTA');
    * 
    * @param {string} format The format for the sequence to be displayed.
    */
	setFormat : function(format) {
		if ( this.opt.format != format.toUpperCase() ) {
			this.opt.format = format.toUpperCase();
			this._redraw();
		}

		var self = this;
		// Changes the option in the combo box
		this._headerDiv.find('option').each(function() {
			if(jQuery(this).val() == self.opt.format.toUpperCase()) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	},
	
	/**
    * Changes the current number of columns in the displayed sequence.
    *
    * @example
    * // Set the number of columns to 70.
    * mySequence.setNumCols(70);
    * 
    * @param {int} numCols The number of columns.
    */
	setNumCols : function(numCols) {
		this.opt.columns.size = numCols;
		this._redraw();
	},
	
	/**
    * Set the visibility of the drop-down list of formats.
    * 
    * @param {boolean} visible true: show; false: hide.
    */
	formatSelectorVisible : function (visible){
		if (visible) {
			this._headerDiv.show();
		} else {
			this._headerDiv.hide();
		}
	},
	
	/**
    * This is similar to a {Biojs.Protein3D#formatSelectorVisible} with the 'true' argument.
    *
    * @example
    * // Shows the format selector.
    * mySequence.showFormatSelector();
    * 
    */
	showFormatSelector : function() {
		this._headerDiv.show();
	},
	
	/**
    * This is similar to a {Biojs.Protein3D#formatSelectorVisible} with the 'false' argument.
    * 
    * @example
    * // Hides the format selector.
    * mySequence.hideFormatSelector();
    * 
    */
	hideFormatSelector : function() {
		this._headerDiv.hide();
	},
	
	/**
    * Hides the whole component.
    * 
    */
	hide : function () {
		this._headerDiv.hide();
		this._contentDiv.hide();
	},

	/**
    * Shows the whole component.
    * 
    */
	show : function () {
		this._headerDiv.show();
		this._contentDiv.show();
	},
	
	_setSelection : function(start, end) {
		var self = this;
		
		self.opt.selection.startPos = start;
		self.opt.selection.endPos = end;

		var spans = this._contentDiv.find('.sequence');
		for(var i = 0; i < spans.length; i++) {
			if(i + 1 >= start && i + 1 <= end) {
				jQuery(spans[i]).css("background-color", self.opt.selectionColor);
			} else {
				jQuery(spans[i]).css("background-color", self.opt.backgroundColor);
			}
		}
	},
	
	_redraw : function() {
		var i = 0;	
		var self = this;
		var highlighted = [];

		this._contentDiv.find('.sequence.highlighted').each( function(){
			highlighted.push(jQuery(this).attr("id"));
		});
		
		// Reset the content
		this._contentDiv.text('');
		
		// Rebuild the spans of the sequence 
		// according to format
		if(this.opt.format == 'RAW') {
			this._drawRaw();
		} else if(this.opt.format == 'CODATA') {
			this._drawCodata();
		} else if (this.opt.format == 'FASTA'){
			this._drawFasta();
		} else {
			this.opt.format = 'PRIDE';
			this._drawPride();
		}
		this._setSelection(this.opt.selection.startPos, this.opt.selection.endPos);
		
		// Restore the highlighted regions
		for ( var i in highlighted ) {
			this._contentDiv.find('.sequence#'+highlighted[i]).each( function(){
				jQuery(this).css("color", self.opt.highlightFontColor).addClass("highlighted");
			});	
		}

		this._addSpanEvents();
	},
	
	_drawFasta : function() {
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);

		var i = 1;
		var arr = [];
	    var str = '>' + this.opt.id + ' ' + a.length + ' bp<br/>';
	    
	    var opt = {
			numCols: self.opt.columns.size,
		    numColsForSpace: self.opt.columns.spacedEach
		};

		str += this._drawSequence(a, opt);
		pre.html(str);
		
		this._drawAnnotations(opt);
	},
	
	_drawCodata : function() {
		
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre style="white-space:pre"></pre>').appendTo(this._contentDiv);

		var i = 0;
		var str = 'ENTRY           ' + this.opt.id + '<br/>';
		str += 'SEQUENCE<br/>';
		
		var opt = {
				numLeft: true,
				numLeftSize: 7,
				numLeftPad:' ',
				numTop: true,
				numTopEach: 5,
				numCols: self.opt.columns.size,
			    numColsForSpace: 0,
			    spaceBetweenChars: true
		};
		
		str += this._drawSequence(a, opt);

		str += '<br/>///'
		pre.html(str);
		
		this._drawAnnotations(opt);
	},
	
    _drawAnnotations: function(opt){ 
    	
    	var self = this;
    	var a = this.opt.sequence.toLowerCase().split('');    	
    	var annotations = this.opt.annotations;
    	var leftSpaces = '';
    	var row = '';
    	var annot = '';
    	
    	// Index at the left?
		if (opt.numLeft) {
			leftSpaces += this._formatIndex(' ', opt.numLeftSize+2, ' ');
		}

		for ( var i = 0; i < a.length; i += opt.numCols ){
			row = '';
			for ( var key in annotations ){
				annotations[key].id = key;
				annot = this._getHTMLRowAnnot(i+1, annotations[key], opt);				
				if (annot.length > 0) {
					row += '<br/>';
					row += leftSpaces;
					row += annot;
					row += '<br/>';
				} 
			}
			
			if ( opt.numRight ) {
				jQuery(row).insertAfter('div#'+self.opt.target+' div pre span#numRight'+ (i+opt.numCols) );
			} else {
				jQuery(row).insertAfter('div#'+self.opt.target+' div pre span#'+ (i+opt.numCols) );
			}
		}
		
		// add tool tips and background' coloring effect
		jQuery(this._contentDiv).find('.annotation').each(function(){
			self._addToolTip(jQuery(this), function(a) {
				var annotation = self.opt.annotations[a.attr("id")];
				return annotation.name + "<br/>" + ((annotation.html)? annotation.html : '');
			});
			
			jQuery(this).mouseover(function(e) {
				jQuery('.annotation.'+jQuery(e.target).attr("id")).each(function(){
					jQuery(this).css("background-color", jQuery(this).attr("color") );
				});
		    }).mouseout(function() {
		    	jQuery('.annotation').css("background-color", "white"); 
		    }).click(function(e) {
		    	self.raiseEvent('onAnnotationClicked', {
		    		name: self.opt.annotations[jQuery(e.target).attr("id")].name,
		    		pos: jQuery(e.target).attr("pos")
		    	});
		    });
			
		});

    },
    
    _getHTMLRowAnnot : function (currentPos, annotation, opt) {
    	var styleBegin = 'border-left:1px solid; border-bottom:1px solid; border-color:';
    	var styleOn = 'border-bottom:1px solid; border-color:';
    	var styleEnd = 'border-bottom:1px solid; border-right:1px solid; border-color:';
    	
    	var row = [];
    	var endPos = (currentPos + opt.numCols);
    	var spaceBetweenChars = (opt.spaceBetweenChars)? ' ' : '';    	
    	var defaultColor = annotation.color;
    	var id = annotation.id;
    	for ( var pos=currentPos; pos < endPos ; pos++ ) {
			// regions
			for ( var r in annotation.regions ) {
				region = annotation.regions[r];
				
				spaceAfter = '';
				spaceAfter += (pos % opt.numColsForSpace == 0 )? ' ' : '';
				spaceAfter += spaceBetweenChars;
				
				color = ((region.color)? region.color : defaultColor);
				data = 'class="annotation '+id+'" id="'+id+'" color="'+color+'" pos="'+pos+'"';
				
				if ( pos == region.start ) {
					row[pos] = '<span style="'+styleBegin+color+'" '+data+'> ';
					row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if ( pos == region.end ) {
					row[pos] = '<span style="'+styleEnd+color+' " '+data+'> ';
					//row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if ( pos > region.start && pos < region.end ) {
					row[pos] = '<span style="'+styleOn+color+'" '+data+'> ';
					row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if (!row[pos]) {
					row[pos] = ' ';
					row[pos] += spaceAfter;
				}
			}
		}

       	var str = row.join("");
    	
    	return ( str.indexOf("span") == -1 )? "" : str;
    },
	
	_drawRaw : function() {
		var self = this;
		var a = this.opt.sequence.toLowerCase().split('');
		var i = 0;
		var arr = [];
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);

		var opt = {
			numCols: self.opt.columns.size
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	
	_drawPride : function() {
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);
	
		opt = {
			numLeft: true,
			numLeftSize: 5,
			numLeftPad:'0',
			numRight: true,
			numRightSize: 5,
			numRightPad: '0',
			numCols: self.opt.columns.size,
		    numColsForSpace: self.opt.columns.spacedEach
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	
	_drawSequence : function(a, opt) {
		var str = '';

		var spaceStyle =  "white-space: pre;";
		
		// Index at top?
		if( opt.numTop )
		{
			str += '<span style="'+spaceStyle+'" class="numTop">'
			var size = (opt.spaceBetweenChars)? opt.numTopEach*2: opt.numTopEach;
			
			if (opt.numLeft) {
				str += this._formatIndex(' ', opt.numLeftSize, ' ');
			}
			
			str += this._formatIndex(' ', size, ' ');
			
			for(var x = opt.numTopEach; x < opt.numCols; x += opt.numTopEach) {
				str += this._formatIndex(x, size, ' ', true);
			}
			str += '</span><br/>'
		}
		
		
		// Index at the left?
		if (opt.numLeft) {
			str += this._formatIndex(1, opt.numLeftSize, opt.numLeftPad);
			str += '  ';
		}

		var j=1;
		for (var i=1; i <= a.length; i++) {

			if( i % opt.numCols == 0) {	
				str += '<span class="sequence" id="'+i+'">' + a[i-1] + '</span>';
				
				if (opt.numRight) {
					str += '<span style="'+spaceStyle+'" id="numRight'+i+'">';
					str += '  ';
					str += this._formatIndex(i, opt.numRightSize, opt.numRightPad);	
					str += '</span>';
				}
				
				str += '<br/>';
				
				if (opt.numLeft) {
					str += '<span id="numLeft'+i+'">';
					str += this._formatIndex(i+1, opt.numLeftSize, opt.numLeftPad);
					str += '  ';
					str += '</span>';
				}
				
				j = 1;
				
			} else {
				str += '<span class="sequence" style="'+spaceStyle+'" id="'+i+'">' + a[i-1];
				str += ( j % opt.numColsForSpace == 0)? ' ' : '';
				str += (opt.spaceBetweenChars)? ' ' : '';
				str += '</span>';
				j++;
			}
		}
		
		str += '<br/>'	
			
		if (jQuery.browser.msie) {
			str = "<pre>" + str + "</pre>";
		}	
			
		return str;
	},
	
	
	_formatIndex : function( number, size, fillingChar, alignLeft) {
		var str = number.toString();
		var filling = '';
		var padding = size - str.length;	
		if ( padding > 0 ) {
			while ( padding-- > 0 ) {
				filling += ("<span>"+fillingChar+"</span>");
			}
			if (alignLeft){
				str = number+filling;
			} else {
				str = filling+number;
			}
		}
		return str;
	},
	
	_addSpanEvents : function() {
		var self = this;
		var isMouseDown = false;
		var currentPos;

		self._contentDiv.find('.sequence').each( function () {	
			
			// Register the starting position
			jQuery(this).mousedown(function() {
				currentPos = parseInt(jQuery(this).attr('id'));
				clickPos = currentPos;
				self._setSelection(clickPos,currentPos);
				isMouseDown = true;
			
			}).mouseover(function() {
				// Update selection
				// Show tooltip containing the position
				
				currentPos = parseInt(jQuery(this).attr('id'));
				
				if(isMouseDown) {
					if( currentPos > clickPos ) {
						self._setSelection(clickPos, currentPos);
					} else {
						self._setSelection(currentPos, clickPos);
					}
					
					// Selection is happening, raise an event
					self.raiseEvent('onSelectionChange', {
						start : self.opt.selection.startPos,
						end : self.opt.selection.endPos
					});
				} 
				
			}).mouseup(function() {
				isMouseDown = false;
				// Selection is done, raise an event
				self.raiseEvent('onSelectionChanged', {
					start : self.opt.selection.startPos,
					end : self.opt.selection.endPos
				});
			});
			
			self._addToolTip(jQuery(this), function(e) {
				if (isMouseDown) {
	     			return "[" + self.opt.selection.startPos +", " + self.opt.selection.endPos + "]";
	     		} else {
	     			return currentPos;
	     		}
			});
		});
	},
	
	_addToolTip : function ( target, msgFunction ) {
		
		jQuery(target).mouseover(function(e) {
     		var tip = msgFunction( target );
	         
	        //Append the tooltip template and its value
	        jQuery(this).append('<div id="tooltip"><div class="tipHeader"></div><div class="tipBody">' + tip + '</div><div class="tipFooter"></div></div>');     
	         
	        //Set the X and Y axis of the tooltip
	        jQuery('#tooltip').css('top', e.pageY + 10 )
	        	.css('left', e.pageX + 20 );
	        
	        // Style values 
	        // Would be nice to have it in a css file 
	        jQuery('#tooltip').css('position', "absolute" )
	        	.css('z-index', "9999" )
	        	.css('color', "#fff" )
	        	.css('font-size', "10px" )
	        	.css('width', "auto");
	        
	        //console.log("Tip size: "+tip.length)
	        
	        jQuery('.tipHeader').css('background-color', "#000")
	        	.css('height', "8px"); 
	        //jQuery('.tipHeader').css('background', "images/tipHeader.gif");  
			
			jQuery('.tipBody').css('background-color', "#000")
				.css('padding', "3px 10px 3px 10px");

			jQuery('.tipFooter').css('background-color', "#000")
	        	.css('height', "8px"); 
	        //jQuery('.tipFooter').css('background', "images/tipHeader.gif no-repeat");  
	         
	        //Show the tooltip with faceIn effect
	        jQuery('#tooltip').animate({opacity: 'show'}, 500);
	        jQuery('#tooltip').animate({opacity: '0.8'}, 10);
	        
	        jQuery(this).css('cursor', "pointer");
	         
	    }).mouseout(function() {
	        //Remove the appended tooltip template
	        jQuery(this).children('div#tooltip').remove();	         
	    });
	},
	
   /**
    * Annotate a set of intervals provided in the argument.
    * 
    * @example
    * // Annotations using regions with different colors.
    * mySequence.setAnnotation({
	*    name:"UNIPROT", 
	*    html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
	*    color:"green", 
	*    regions: [
	*       {start: 540, end: 560},
	*       {start: 561, end:580, color: "#FFA010"}, 
	*       {start: 581, end:590, color: "red"}, 
	*       {start: 690, end:710}]
	* });
	* 
    * 
    * @param {Object} annotation The intervals belonging to the same annotation. 
    * Syntax: { name: &lt;value&gt;, color: &lt;HTMLColorCode&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
    */
	setAnnotation: function ( annotation ) {
		this.opt.annotations.push(annotation);
		this._redraw();
	},
	
	/**
    * Removes an annotation by means of its name.
    * 
    * @example 
    * // Remove the UNIPROT annotation.
    * mySequence.removeAnnotation('UNIPROT'); 
    * 
    * @param {string} name The name of the annotation to be removed.
    * 
    */
	removeAnnotation: function ( name ) {
		var a = [];
		
		for (var i=0; i < this.opt.annotations.length ; i++ ){
			if(name != this.opt.annotations[i].name){
				a.push(this.opt.annotations[i]);
			}
		}
		this.opt.annotations = a;
		this._redraw();
	}
	
	
	
});


