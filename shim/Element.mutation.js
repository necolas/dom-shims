(function () {
  'use strict';

  var ElementPrototype = Element.prototype;

  /**
   * Detect full support
   */

  var isSupported = ElementPrototype.after &&
      ElementPrototype.append &&
      ElementPrototype.before &&
      ElementPrototype.prepend &&
      ElementPrototype.remove &&
      ElementPrototype.replace;

  if (isSupported) { return; }

  /**
   * Apply mutation shims
   */

  function toNode(node) {
    return typeof node === 'string' ? document.createTextNode(node) : node;
  }

  function mutationMacro(nodes) {
    var fragment, i, len;
    if (nodes) { len = nodes.length; }

    if (!len) {
      throw new Error('No node was specified (DOM Exception 8)');
    }

    if (len === 1) {
      return toNode(nodes[0]);
    } else {
      fragment = document.createDocumentFragment();
      for (i = 0; i < len; i++) {
        fragment.appendChild(toNode(nodes[i]));
      }
      return fragment;
    }
  }

  ElementPrototype.prepend = function prepend() {
    this.insertBefore(mutationMacro(arguments), this.firstChild);
  };

  ElementPrototype.append = function append() {
    this.appendChild(mutationMacro(arguments));
  };

  ElementPrototype.before = function before() {
    var parentNode = this.parentNode;
    if (parentNode) {
      parentNode.insertBefore(mutationMacro(arguments), this);
    }
  };

  ElementPrototype.after = function after() {
    var parentNode = this.parentNode;
    if (parentNode) {
      parentNode.insertBefore(mutationMacro(arguments), this.nextSibling);
    }
  };

  ElementPrototype.replace = function replace() {
    var parentNode = this.parentNode;
    if (parentNode) {
      parentNode.replaceChild(mutationMacro(arguments), this);
    }
  };

  /**
   * This method is defined with bracket notation to avoid conflicting with the
   * definition of HTMLSelectElement.
   */
  ElementPrototype['remove'] = function remove() {
    var parentNode = this.parentNode;
    if (parentNode) {
      parentNode.removeChild(this);
    }
  };
}());
