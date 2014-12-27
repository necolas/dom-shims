# dom-shims

[![Build Status](https://secure.travis-ci.org/necolas/dom-shims.png?branch=master)](http://travis-ci.org/necolas/dom-shims)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/dom-shims.svg)](https://saucelabs.com/u/dom-shims)

Complete and well-tested shims / polyfills for various DOM API's missing in
not-so-modern browsers.

## Installation

```
npm install --save dom-shims
```

Apply all the shims by requiring the module without assignment:

```js
require('dom-shims');
```

Or apply specific shims:

```js
require('dom-shims/shim/CustomEvent');
require('dom-shims/shim/Element.classList');
require('dom-shims/shim/Element.matches');
```

## Features

### Event polyfills

  * [CustomEvent](http://www.w3.org/TR/dom/#customevent) constructor

### Element.prototype shims

  * [Element#classList](http://www.w3.org/TR/dom/#domtokenlist)[1]
    * Element#length
    * Element#add(tokens...)
    * Element#contains(token)
    * Element#item(token)
    * Element#remove(tokens...)
    * Element#toggle(token, force)
  * [Element#closest](https://dom.spec.whatwg.org/#dom-element-closest)
  * [Element#matches](http://www.w3.org/TR/dom/#dom-element-matches)[2]

NOTES:

1. Ensures all browsers have `classList` support for SVG elements,
   multiple-argument support for `add` and `remove`, `force`-argument support
   for `toggle`, and correct `length` and `item` values even when the `class`
   value is mutated by means other than `classList`.

2. Patches IE 9's implementation, which lacks support for Elements not
   attached to the `document`.

#### Element mutation

DOM Level 4 mutation macros for:

##### [parentNode](https://dom.spec.whatwg.org/#parentnode):

  * Element#append()
  * Element#prepend()

##### [childNode](https://dom.spec.whatwg.org/#childnode):

  * Element#after()
  * Element#before()
  * Element#remove()
  * Element#replace()

### Other shims

* [HTMLDocument](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument)

## Browser support

Intended support for:

  * Chrome
  * Firefox
  * IE9+
  * Safari 6+
  * Android 4+
  * Safari iOS 5.1+
  * Opera

## Acknowledgements

Thanks to the following libraries for inspiration, ideas, and workarounds:

* [Finanical-Times/polyfill-service](https://github.com/Financial-Times/polyfill-service)
* [Raynos/DOM-shim](https://github.com/Raynos/DOM-shim)
* [WebReflection/dom4](https://github.com/WebReflection/dom4)
