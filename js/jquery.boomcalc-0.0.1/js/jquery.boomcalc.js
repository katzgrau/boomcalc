/**
  * boomcalc - A simple calculator plugin for jQuery.
  *
  * Written by Kenny Katzgrau <katzgrau@gmail.com> - http://codefury.net
  *
  * Written purely as an exercise, and somewhat of a foray into plugin
  *  development. Best efforts were made to stick to standard jQuery
  *  conventions.
  *
  * The heart of the functionality of this calc is very simple: Keep track
  *  of the values and operations in an array/stack, and when '=' is clicked,
  *  join the elements and call evaluate on it.
  */
(function($){

 
    /* Initialize vars */
    var calc, display, status, in_op, has_dec, stack = [], settings = {
        width: 200,
        height: 300,
        type: 'simple'
    };

    /**
     * Initialize the specified element as a calculator.
     * Build the DOM and add the handlers
     */
    function initialize(el) {

        /* Is this being called on multiple elements?
         *  Call individually on each
         */
        if(el.length > 1) {
            el.each(function(i, e) {
                $(e).boomCalc(settings);
            });
            return;
        }

        /* Empty the DOM element that we'll be using as a calc */
        calc = el;
        calc.empty();

        /* Which calc was requested? Keep in mind that this is intentionally
         *  open-ended so a value like 'custom' can be specified. Ie, build
         *  your own DOM in HTML and add class="boomcalc" to the root element
         */
        if(settings.type == 'advanced') {
            buildAdvancedCalc();
        } else if(settings.type == 'simple') {
            buildSimpleCalc();
        }

        /* Hold on to any elements we'll be using often */
        display = calc.find('.display');
        status  = calc.find('.status-text');

        addHandlers();
    }

    /**
     * Set up the DOM required for the simple calc
     *  Based partly off the Windows standard calc, with the layout of the
     *  one from OSX
     */
    function buildSimpleCalc() {
            calc.addClass('boomcalc')
              .append($('<div>').addClass('display').text('0'))
              .append($('<div>').addClass('buttons')
                                      .append($('<div>').addClass('memory-buttons')
                                        .append($('<input>').attr('type', 'button').val('m+').addClass('memory'))
                                        .append($('<input>').attr('type', 'button').val('m-').addClass('memory'))
                                        .append($('<input>').attr('type', 'button').val('mc').addClass('memory'))
                                        .append($('<input>').attr('type', 'button').val('mr').addClass('memory'))
                                        .append($('<div>').addClass('status-box').append('<span>').addClass('status-text'))
                                      )
                                      .append($('<div>').addClass('primary-buttons')
                                            .append($('<input>').attr('type', 'button').val('1').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('2').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('3').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('4').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('5').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('6').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('7').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('8').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('9').addClass('number'))
                                            .append($('<input>').attr('type', 'button').val('0').addClass('number'))    
                                            .append($('<input>').attr('type', 'button').val('.').addClass('decimal'))    
                                            .append($('<input>').attr('type', 'button').val('c').addClass('clear'))    
                                      )
                                      .append($('<div>').addClass('op-buttons')
                                        .append($('<input>').attr('type', 'button').val('/').addClass('operation'))
                                        .append($('<input>').attr('type', 'button').val('*').addClass('operation'))
                                        .append($('<input>').attr('type', 'button').val('-').addClass('operation'))
                                        .append($('<input>').attr('type', 'button').val('+').addClass('operation'))
                                        .append($('<input>').attr('type', 'button').val('=').addClass('evaluate'))
                                      )
                        )
              .width(settings.width)
              .height(settings.height)
              .find('*')
              .each(function(i, e) {
                  $(e).css('font-size', settings.height / 225 * 12);
              });
    }

	/**
	 * Not implemented
	 */
	function buildAdvancedCalc() {
		alert('Not implemented');
	}

	/**
	 * Add all the event handlers required for the calc
	 */
	function addHandlers() {
		calc.find('.number').click(clickNumber);
		calc.find('.clear').click(clickClear);
		calc.find('.operation').click(clickOperation);
		calc.find('.evaluate').click(clickEvaluate);
	}

	/**
	 * The event handler when a number is clicked
	 */
	function clickNumber(ev) {
		var num = $(ev.target).val();
		
		if(in_op) {
			display.text(0);
			in_op = false;
		}

		if(display.text() == '0')
			display.text(num);
		else
			display.append(num);
	}

	/**
	 * The event handler when 'c' is clicked
	 */
	function clickClear() {
		display.text(0);
	}

	/**
	 * The event handler when an op is clicked (*,/,-,+)
	 */
	function clickOperation(ev) {
		var op = $(ev.target).val();
		stack.push(display.text());
		stack.push(op);
		in_op = true;
	}

	/**
	 * The event handler when the '=' button is pushed. Compute.
	 *  Just use javascript's eval() functionality to handle this.
	 *  No need to build a recursive decent parser =P
	 */
	function clickEvaluate() {
		stack.push(display.text());
		var result = eval(stack.join(''));
		display.text(result);
		stack = [];
	}

	/**
	 * Register on effin'
	 */
	$.fn.boomCalc = function(options) {
		if(options) {
			$.extend(settings, options);
		}
		initialize(this);
	}
})(jQuery);

