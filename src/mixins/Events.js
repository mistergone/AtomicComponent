
/* ==========================================================================
   Events

   Mixin to add basic event callback functionality.
   ========================================================================== */

'use strict';


var Events = {

  /**
   * Function used to add events to an event stack.
   *
   * @param {string} eventName - The name of the event to add to the event stack.
   * @param {Function} callback - Function to callback when event is triggered.
   * @returns {object} An instance.
   */
  on: function( eventName, callback ) {
    var events = this.events = this.events || {};
    events[eventName] = this.events[eventName] || [];
    events[eventName].push( callback );

    return this;
  },

  /**
   * Function used to remove events from an event stack.
   *
   * @param {string} eventName - The name of the event to remove from the event stack.
   * @returns {object} An instance.
   */
  off: function( eventName ) {
    if ( this.events && this.events[eventName] ) delete this.events[eventName];

    return this;
  },

  /**
   * Function used to trigger events that exist on the event stack.
   *
   * @param {string} eventName - The name of the event to trigger.
   * @returns {object} An instance.
   */
  trigger: function( eventName ) {
    var events = this.events = this.events || {};
    events[eventName] = events[eventName] || [];
    for ( var i = 0, len = events[eventName].length; i < len; i++ ) {
      this.events[eventName][i].apply( this, arguments );
    }

    return this;
  }

};

module.exports = Events;
