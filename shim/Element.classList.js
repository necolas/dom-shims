(function () {
  'use strict';

  /**
   * Detect full support
   */

  var testHTMLElement = document.createElement('x');
  var testSVGElement = document.createElementNS('http://www.w3.org/2000/svg',
                                                'svg');

  var isSupported = function (element) {
    return ('classList' in element) ?
      (!element.classList.toggle('a', false) && !element.classList.contains('a')) :
      false;
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

  // Fix incomplete add/remove/toggle implementations in IE 10-11, iOS 5,
  // Android 4.3
  if (!isSupported(testHTMLElement)) {
    var DOMTokenListPrototype = DOMTokenList.prototype;
    var shimMethod = function (original) {
      return function () {
        var i;
        var len = arguments.length;

        for (i = 0; i < len; i++) {
          original.call(this, arguments[i]);
        }
      };
    };

    DOMTokenListPrototype.add = shimMethod(DOMTokenListPrototype.add);
    DOMTokenListPrototype.remove = shimMethod(DOMTokenListPrototype.remove);
    DOMTokenListPrototype.toggle = function(token, force) {
      if (1 in arguments && this.contains(token) === force) {
        return force;
      } else {
        return DOMTokenListPrototype.toggle.call(this, token);
      }
    };
  }
}());
