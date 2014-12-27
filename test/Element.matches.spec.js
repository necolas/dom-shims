'use strict';

describe('Element#matches(selector)', function () {
  var fixture, one;

  beforeEach(function () {
    fixture = document.createElement('div');
    fixture.innerHTML = '' +
      '<div id="one" class="a">text</div>' +
      '<div id="two" class="a b">text</div>' +
      '<div id="three" class="a c">text</div>';

    document.body.appendChild(fixture);
    one = document.getElementById('one');
  });

  afterEach(function () {
    document.body.removeChild(fixture);
  });

  it('self-matches `documentElement`', function () {
    assert.isTrue(document.documentElement.matches('html'));
  });

  describe('when the element is `div#one.a`', function () {
    it('returns true for selector `#one`', function () {
      assert.isTrue(one.matches('#one'));
    });

    it('returns true for selector `.a`', function () {
      assert.isTrue(one.matches('.a'));
    });

    it('returns true for selector `div`', function () {
      assert.isTrue(one.matches('div'));
    });

    it('returns true for selector `div > div`', function () {
      assert.isTrue(one.matches('div > div'));
    });

    it('returns false for selector `#two`', function () {
      assert.isFalse(one.matches('#two'));
    });

    it('returns false for selector `.b`', function () {
      assert.isFalse(one.matches('.b'));
    });
  });

  describe('element `div#orphan.a` not attached to the document', function () {
    var orphan = document.createElement('div');
    orphan.id = 'orphan';
    orphan.className = 'a';

    it('returns true for selector `#orphan`', function () {
      assert.isTrue(orphan.matches('#orphan'));
    });

    it('returns true for selector `.a`', function () {
      assert.isTrue(orphan.matches('.a'));
    });

    it('returns true for selector `div`', function () {
      assert.isTrue(orphan.matches('div'));
    });

    it('returns false for selector `#one`', function () {
      assert.isFalse(orphan.matches('#one'));
    });

    it('returns false for selector `.b`', function () {
      assert.isFalse(orphan.matches('.bar'));
    });

    it('returns false for selector `body #orphan`', function () {
      assert.isFalse(orphan.matches('body #orphan'));
    });
  });
});
