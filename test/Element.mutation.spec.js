'use strict';

function createDiv(id) {
  var el = document.createElement('div');
  if (id) { el.id = id; }
  return el;
}

describe('Element', function () {
  it('prototype has defined methods', function () {
    var div = createDiv();

    function testMethod(name) {
      assert.isFunction(div[name]);
    }

    testMethod('after');
    testMethod('append');
    testMethod('before');
    testMethod('prepend');
    testMethod('remove');
    testMethod('replace');
  });

  /**
   * after
   */

  describe('#after(nodes...)', function () {
    var div;
    var ref;

    beforeEach(function () {
      div = createDiv();
      ref = createDiv('ref');
      div.appendChild(ref);
    });

    it('does nothing if the context object has no parent', function () {
      var one = createDiv('1');
      div.after(one);
      assert.deepEqual(div.innerHTML, '<div id="ref"></div>');
    });

    it('inserts a node after the context object', function () {
      var one = createDiv('1');
      ref.after(one);
      assert.deepEqual(div.innerHTML,
          '<div id="ref"></div><div id="1"></div>');
    });

    it('works with multiple nodes', function () {
      var one = createDiv('1');
      var two = '2';
      var three = createDiv('3');
      ref.after(one, two, three);
      assert.deepEqual(div.innerHTML,
          '<div id="ref"></div><div id="1"></div>2<div id="3"></div>');
    });
  });

  /**
   * append
   */

  describe('#append(nodes...)', function () {
    var div;

    beforeEach(function () {
      div = createDiv();
      div.appendChild(createDiv('ref'));
    });

    it('appends a node into the context object', function () {
      var one = createDiv('1');
      div.append(one);
      assert.deepEqual(div.innerHTML,
          '<div id="ref"></div><div id="1"></div>');
    });

    it('works with multiple nodes', function () {
      var one = createDiv('1');
      var two = '2';
      var three = createDiv('3');
      div.append(one, two, three);
      assert.deepEqual(div.innerHTML,
          '<div id="ref"></div><div id="1"></div>2<div id="3"></div>');
    });
  });

  /**
   * before
   */

  describe('#before(nodes...)', function () {
    var div;
    var ref;

    beforeEach(function () {
      div = createDiv();
      ref = createDiv('ref');
      div.appendChild(ref);
    });

    it('does nothing if the context object has no parent', function () {
      var one = createDiv('1');
      div.before(one);
      assert.deepEqual(div.innerHTML, '<div id="ref"></div>');
    });

    it('inserts a node before the context object', function () {
      var one = createDiv('1');
      ref.before(one);
      assert.deepEqual(div.innerHTML,
          '<div id="1"></div><div id="ref"></div>');
    });

    it('works with multiple nodes', function () {
      var one = createDiv('1');
      var two = '2';
      var three = createDiv('3');
      ref.before(one, two, three);
      assert.deepEqual(div.innerHTML,
          '<div id="1"></div>2<div id="3"></div><div id="ref"></div>');
    });
  });

  /**
   * prepend
   */

  describe('#prepend(nodes...)', function () {
    var div;

    beforeEach(function () {
      div = createDiv();
      div.appendChild(createDiv('ref'));
    });

    it('prepends a node into the context object', function () {
      var one = createDiv('1');
      div.prepend(one);
      assert.deepEqual(div.innerHTML,
          '<div id="1"></div><div id="ref"></div>');
    });

    it('works with multiple nodes', function () {
      var one = createDiv('1');
      var two = '2';
      var three = createDiv('3');
      div.prepend(one, two, three);
      assert.deepEqual(div.innerHTML,
          '<div id="1"></div>2<div id="3"></div><div id="ref"></div>');
    });
  });

  /**
   * remove
   */

  describe('#remove(node)', function () {
    var div;
    var ref;

    beforeEach(function () {
      div = createDiv();
      ref = createDiv('ref');
      div.appendChild(ref);
    });

    it('does nothing if the context object has no parent', function () {
      div.remove();
      assert.deepEqual(div.outerHTML,
          '<div><div id="ref"></div></div>');
    });

    it('removes a node from the context object', function () {
      ref.remove();
      assert.deepEqual(div.outerHTML, '<div></div>');
    });
  });

  /**
   * replace
   */

  describe('#replace(node)', function () {
    var div;
    var ref;

    beforeEach(function () {
      div = createDiv();
      ref = createDiv('ref');
      div.appendChild(ref);
    });

    it('does nothing if the context object has no parent', function () {
      var one = createDiv('1');
      div.replace(one);
      assert.deepEqual(div.innerHTML, '<div id="ref"></div>');
    });

    it('replaces the context object within its parent', function () {
      var one = createDiv('1');
      ref.replace(one);
      assert.deepEqual(div.innerHTML, '<div id="1"></div>');
    });

    it('works with multiple nodes', function () {
      var one = createDiv('1');
      var two = '2';
      var three = createDiv('3');
      ref.replace(one, two, three);
      assert.deepEqual(div.innerHTML,
          '<div id="1"></div>2<div id="3"></div>');
    });
  });
});
