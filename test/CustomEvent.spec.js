'use strict';

describe('CustomEvent', function () {
  var detail = { a: '1', b: '2' };

  it('correctly initializes the event with only 1 argument', function () {
    var e = new CustomEvent('a');
    assert.deepEqual(e.type, 'a');
    assert.isFalse(e.bubbles);
    assert.isFalse(e.cancelable);
    assert.deepEqual(e.detail, null);
  });

  it('correctly initializes the event with 2 arguments', function () {
    var e = new CustomEvent('b', {
      bubbles: true,
      cancelable: true,
      detail: detail
    });
    assert.deepEqual(e.type, 'b');
    assert.isTrue(e.bubbles);
    assert.isTrue(e.cancelable);
    assert.deepEqual(e.detail, detail);
  });

  it('is dispatchable', function (done) {
    var callback = function (e) {
      assert.deepEqual(e.detail, detail);
      document.removeEventListener('custom-event-test', callback);
      done();
    };

    document.addEventListener('custom-event-test', callback);
    document.dispatchEvent(new CustomEvent('custom-event-test', {
      detail: detail
    }));
  });

  describe('#initCustomEvent', function () {
    it('correctly initializes a CustomEvent', function () {
      var e = new CustomEvent('c');
      e.initCustomEvent(e.type, true, true, detail);
      assert.deepEqual(e.type, 'c');
      assert.isTrue(e.bubbles);
      assert.isTrue(e.cancelable);
      assert.deepEqual(e.detail, detail);
    });
  });
});
