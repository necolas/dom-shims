(function () {
  'use strict';

  /**
   * Detect full support
   */

  var testHTMLElement = document.createElement('x');
  var testSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  var isSupported = function (element) {
    return ('classList' in element) ?
      element.classList.toggle('a', false) && !element.className : false;
  };

  /**
   * Apply classList shim
   */

  // Element.prototype.classList
  // provide SVG support in IE 9-11
  if (!isSupported(testSVGElement)) {
    var DOMTokenListShim = require('../lib/DOMTokenList');

    Object.defineProperty(Element.prototype, 'classList', {
      get: function () {
        function ClassList() {}
        ClassList.prototype = new DOMTokenListShim(this, 'class');
        return new ClassList();
      }
    });
  }

  // Fix incomplete add/remove/toggle implementations in IE 10-11, iOS 5, Android 4.3
  if (!isSupported(testHTMLElement)) {
    var classList = testHTMLElement.classList;
    // no other way to reach original methods in iOS 5.1
    var ElementPrototype = classList.constructor.prototype;

    var shimMethod = function (original) {
      return function () {
        var i;
        var len = arguments.length;

        for (i = 0; i < len; i++) {
          original.call(this, arguments[i]);
        }
      };
    };

    ElementPrototype.add = shimMethod(ElementPrototype.add);
    ElementPrototype.remove = shimMethod(ElementPrototype.remove);
    ElementPrototype.toggle = function(token, force) {
      if (1 in arguments && this.contains(token) === force) {
        return force;
      } else {
        return ElementPrototype.toggle.call(this, token);
      }
    };
  }
}());
