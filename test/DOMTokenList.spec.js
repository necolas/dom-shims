'use strict';

var DOMTokenList = require('../lib/DOMTokenList');
var testAttr = 'test';

// create test token list
Object.defineProperty(Element.prototype, 'testList', {
  get: function () {
    function TestList() {}
    TestList.prototype = new DOMTokenList(this, testAttr);
    return new TestList();
  }
});

describe('DOMTokenList', function () {
  var el, svg;

  beforeEach(function () {
    el = document.createElement('div');
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  });

  it('exists', function () {
    assert.isDefined(el.testList);
    assert.isDefined(svg.testList);
  });

  // a true polyfill would also get this passing
  it.skip('returns an array', function () {
    svg.testList.add('a', 'b');
    assert.deepEqual(svg.testList, [ 'a', 'b' ]);
  });

  /**
   * length
   */

  it('#length', function () {
    [ el, svg ].forEach(function (node) {
      var list = node.testList;

      assert.deepEqual(list.length, 0, node.tagName);

      node.setAttribute(testAttr, 'a b c');
      assert.deepEqual(list.length, 3, node.tagName);

      node.setAttribute(testAttr, 'a a a');
      assert.deepEqual(list.length, 3, node.tagName);
    });
  });

  /**
   * add
   */

  describe('#add(tokens...)', function () {
    it('should add a token', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;

        list.add('a');
        assert.deepEqual(node.getAttribute(testAttr), 'a', node.tagName);
      });
    });

    it('should not add the same token twice', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;

        list.add('a');
        list.add('a');
        list.add('b');
        assert.deepEqual(node.getAttribute(testAttr), 'a b', node.tagName);
      });
    });

    it('should support multiple tokens', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;

        list.add('a', 'b', 'c');
        assert.deepEqual(node.getAttribute(testAttr), 'a b c', node.tagName);
      });
    });
  });

  /**
   * contains
   */

  describe('#contains(token)', function () {
    it('should check if the token is present', function () {
      [ el, svg ].forEach(function (node) {
        node.setAttribute(testAttr, 'a b');
        var list = node.testList;

        assert.deepEqual(list.contains('a'), true, node.tagName);
        assert.deepEqual(list.contains('b'), true, node.tagName);
        assert.deepEqual(list.contains('c'), false, node.tagName);
        assert.deepEqual(node.getAttribute(testAttr), 'a b', node.tagName);
      });
    });
  });

  /**
   * item
   */

  describe('#item(i)', function () {
    it('handles empty lists correctly', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        assert.deepEqual(list.item(0), null, node.tagName);
        assert.notOk(!!list[0], node.tagName);
      });
    });

    it('should return the correct token', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;

        list.add('a');
        assert.deepEqual(list.item(0), 'a', node.tagName);
        assert.deepEqual(list[0], 'a', node.tagName);

        list.add('A');
        assert.deepEqual(list.item(0), 'a', node.tagName);
        assert.deepEqual(list[0], 'a', node.tagName);
        assert.deepEqual(list.item(1), 'A', node.tagName);
        assert.deepEqual(list[1], 'A', node.tagName);
      });
    });
  });

  /**
   * remove
   */

  describe('#remove(tokens...)', function () {
    it('should remove a token from the beginning', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        node.setAttribute(testAttr, 'a b c');
        list.remove('a');
        assert.deepEqual(node.getAttribute(testAttr), 'b c', node.tagName);
      });
    });

    it('should remove a token from the middle', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        node.setAttribute(testAttr, 'a b c');
        list.remove('b');
        assert.deepEqual(node.getAttribute(testAttr), 'a c', node.tagName);
      });
    });

    it('should remove a token from the end', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        node.setAttribute(testAttr, 'a b c');
        list.remove('c');
        assert.deepEqual(node.getAttribute(testAttr), 'a b', node.tagName);
      });
    });

    it('should remove duplicate tokens', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        node.setAttribute(testAttr, 'a a a');
        list.remove('a');
        assert.deepEqual(node.getAttribute(testAttr), '', node.tagName);
      });
    });

    it('should support multiple tokens', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        node.setAttribute(testAttr, 'a b c d');
        list.remove('a', 'c');
        assert.deepEqual(node.getAttribute(testAttr), 'b d', node.tagName);
      });
    });
  });

  /**
   * toggle
   */

  describe('#toggle(token)', function () {
    it('should remove the token if present', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        node.setAttribute(testAttr, 'a b c');
        list.toggle('c');
        assert.deepEqual(node.getAttribute(testAttr), 'a b', node.tagName);
      });
    });

    it('should add the token if not present', function () {
      [ el, svg ].forEach(function (node) {
        var list = node.testList;
        node.setAttribute(testAttr, 'a b');
        list.toggle('c');
        assert.deepEqual(node.getAttribute(testAttr), 'a b c', node.tagName);
      });
    });

    it('should return `true` if the token is added', function () {
      [ el, svg ].forEach(function (node) {
        assert.isTrue(node.testList.toggle('a'), node.tagName);
      });
    });

    it('should return `false` if the token is removed', function () {
      [ el, svg ].forEach(function (node) {
        node.setAttribute(testAttr, 'a');
        assert.isFalse(node.testList.toggle('a'), node.tagName);
      });
    });
  });

  describe('#toggle(token, force)', function () {
    describe('when force is true', function () {
      it('should add the token if missing', function () {
        [ el, svg ].forEach(function (node) {
          node.setAttribute(testAttr, 'a b');
          node.testList.toggle('c', true);
          assert.deepEqual(node.getAttribute(testAttr), 'a b c', node.tagName);
        });
      });

      it('should not remove the token if present', function () {
        [ el, svg ].forEach(function (node) {
          node.setAttribute(testAttr, 'a b c');
          node.testList.toggle('c', true);
          assert.deepEqual(node.getAttribute(testAttr), 'a b c', node.tagName);
        });
      });

      it('should always return `true`', function () {
        [ el, svg ].forEach(function (node) {
          var list = node.testList;
          assert.isTrue(list.toggle('a', true), node.tagName);
          assert.isTrue(list.toggle('a', true), node.tagName);
        });
      });
    });

    describe('when force is false', function () {
      it('should remove the token if present', function () {
        [ el, svg ].forEach(function (node) {
          node.setAttribute(testAttr, 'a b c');
          node.testList.toggle('c', false);
          assert.deepEqual(node.getAttribute(testAttr), 'a b', node.tagName);
        });
      });

      it('should not add the token if missing', function () {
        [ el, svg ].forEach(function (node) {
          node.setAttribute(testAttr, 'a b');
          node.testList.toggle('c', false);
          assert.deepEqual(node.getAttribute(testAttr), 'a b', node.tagName);
        });
      });

      it('should always return `false`', function () {
        [ el, svg ].forEach(function (node) {
          var list = node.testList;
          assert.isFalse(list.toggle('a', false), node.tagName);
          assert.isFalse(list.toggle('a', false), node.tagName);
        });
      });
    });
  });

  /**
   * toString
   */

  describe('#toString()', function () {
    it('should return a string of tokens', function () {
      [ el, svg ].forEach(function (node) {
        assert.deepEqual(node.testList.toString(), '', node.tagName);
        node.setAttribute(testAttr, 'a b c');
        assert.deepEqual(node.testList.toString(), 'a b c', node.tagName);
      });
    });
  });

  /**
   * Errors
   */

  describe('.add(), .remove(), .toggle(), and .contains()', function () {
    var assertError = function (method, token) {
      [ el, svg ].forEach(function (node) {
        var result = function () {
          return node.testList[method](token);
        };
        assert.throws(result);
      });
    };

    it('should Error when token contains whitespace', function () {
      assertError('add', ' a ');
      assertError('contains', ' a ');
      assertError('remove', ' a ');
      assertError('toggle', ' a ');
    });

    it('should Error when token is an empty string', function () {
      assertError('add', '');
      assertError('contains', '');
      assertError('remove', '');
      assertError('toggle', '');
    });
  });
});
