'use strict';

// Required modules.
var EventObserver = require( '../../mixins/Events.js' );
var BaseTransition = require( './BaseTransition' );
var fnBind = require( '../function-bind' ).bind;

// Exported constants.
var CLASSES = {
  BASE_CLASS: 'u-alpha-transition',
  ALPHA_100:  'u-alpha-100',
  ALPHA_0:    'u-alpha-0'
};

/**
 * AlphaTransition
 * @class
 *
 * @classdesc Initializes new AlphaTransition behavior.
 *
 * @param {HTMLNode} element
 *   DOM element to apply opacity transition to.
 * @returns {AlphaTransition} An instance.
 */
function AlphaTransition( element ) {

  var _baseTransition = new BaseTransition( element, CLASSES );

  /**
   * @returns {AlphaTransition} An instance.
   */
  function init() {
    _baseTransition.init();
    var _transitionCompleteBinded = fnBind( _transitionComplete, this );
    _baseTransition.addEventListener( BaseTransition.END_EVENT,
                                      _transitionCompleteBinded );
    return this;
  }

  /**
   * Handle the end of a transition.
   */
  function _transitionComplete() {
    this.trigger( BaseTransition.END_EVENT, { target: this } );
  }

  /**
   * Fade to 100% by applying a utility alpha class.
   * @returns {AlphaTransition} An instance.
   */
  function fadeIn() {
    _baseTransition.applyClass( CLASSES.ALPHA_100 );

    return this;
  }

  /**
   * Fade to nothing by applying a utility alpha class.
   * @returns {AlphaTransition} An instance.
   */
  function fadeOut() {
    _baseTransition.applyClass( CLASSES.ALPHA_0 );

    return this;
  }

  // Attach public events.
  var eventObserver = new EventObserver();
  this.addEventListener = eventObserver.addEventListener;
  this.trigger = eventObserver.trigger;
  this.removeEventListener = eventObserver.removeEventListener;

  this.animateOff = _baseTransition.animateOff;
  this.animateOn = _baseTransition.animateOn;
  this.halt = _baseTransition.halt;
  this.isAnimated = _baseTransition.isAnimated;
  this.remove = _baseTransition.remove;
  this.setElement = _baseTransition.setElement;

  this.fadeIn = fadeIn;
  this.fadeOut = fadeOut;
  this.init = init;

  return this;
}

// Public static properties.
AlphaTransition.CLASSES = CLASSES;

module.exports = AlphaTransition;