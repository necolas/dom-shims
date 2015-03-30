(function () {
  'use strict';

  /**
   * Detect full support
   */

  var isSupported = (
    'CustomEvent' in window &&
    // in Safari, typeof CustomEvent == 'object' but it works
    (typeof window.CustomEvent === 'function' ||
        (window.CustomEvent.toString().indexOf('CustomEventConstructor') > -1))
  );

  if (isSupported) { return; }

  /**
   * Apply shim
   */

  /**
   * http://www.w3.org/TR/dom/#customevent
   * @param {string} type
   * @param {{bubbles: (boolean|undefined),
   *          cancelable: (boolean|undefined),
   *          detail: *}=} eventInitDict
   */
  function CustomEvent(type, eventInitDict) {
    if (typeof type != 'string') {
      throw new TypeError(
        'Failed to construct "CustomEvent": An event name must be provided.');
    }

    var event = document.createEvent('CustomEvent');
    var defaultInitDict = { bubbles: false, cancelable: false, detail: null };
    eventInitDict = eventInitDict || defaultInitDict;
    event.initCustomEvent(
      type,
      eventInitDict.bubbles,
      eventInitDict.cancelable,
      eventInitDict.detail
    );
    return event;
  }

  window.CustomEvent = CustomEvent;
}());
