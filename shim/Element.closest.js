(function () {
  'use strict';

  var ElementPrototype = Element.prototype;

  /**
   * Detect full support
   */

  if ('closest' in ElementPrototype) { return; }

  /**
   * Apply shim
   */

  ElementPrototype.closest = function (selector) {
    var element = this;

    while (element) {
      if (element.matches(selector)) {
        return element;
      } else {
        element = element.parentElement;
      }
    }

    return null;
  };
}());
