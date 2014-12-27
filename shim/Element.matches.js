(function () {
  'use strict';

  var ElementPrototype = Element.prototype;

  /**
   * Detect full support
   */

  var nativeMatches = ElementPrototype.matches = ElementPrototype.matches ||
      ElementPrototype.mozMatchesSelector ||
      ElementPrototype.msMatchesSelector ||
      ElementPrototype.oMatchesSelector ||
      ElementPrototype.webkitMatchesSelector;

  // determine if the browser supports matching orphan elements. IE 9's
  // vendor-specific implementation doesn't work with orphans.
  var isSupported = ('matches' in ElementPrototype) ?
      nativeMatches.call(document.createElement('a'), 'a') : false;

  if (isSupported) { return; }

  /**
   * Apply shim
   */

  ElementPrototype.matches = function (selector) {
    var indexOf = Array.prototype.indexOf;
    var parentElement = this.parentNode;

    // create a parent for orphans
    if (!parentElement) {
      parentElement = document.createDocumentFragment();
      parentElement.appendChild(this);
    }

    if (nativeMatches) {
      return nativeMatches.call(this, selector);
    } else {
      return indexOf.call(parentElement.querySelectorAll(selector), this) > -1;
    }
  };
}());
