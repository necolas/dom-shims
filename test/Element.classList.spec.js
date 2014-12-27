'use strict';

describe('Element#classList', function () {
  it('modifies the `class` attribute', function () {
    var div = document.createElement('div');
    div.classList.add('a');
    assert.deepEqual(div.getAttribute('class'), 'a');
  });

  it('supports multiple tokens for `add`', function () {
    var div = document.createElement('div');
    div.classList.add('a', 'b', 'c', 'd');
    assert.deepEqual(div.getAttribute('class'), 'a b c d');
  });

  it('supports multiple tokens for `remove`', function () {
    var div = document.createElement('div');
    div.setAttribute('class', 'a b c d');
    div.classList.remove('b', 'c');
    assert.deepEqual(div.getAttribute('class'), 'a d');
  });

  it('supports the force param for `toggle`', function () {
    var div = document.createElement('div');
    div.setAttribute('class', '');
    div.classList.toggle('z', false);
    assert.deepEqual(div.getAttribute('class'), '');
  });

  it('includes SVG support', function () {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('a', 'b', 'c');
    assert.deepEqual(svg.getAttribute('class'), 'a b c');
  });
});
