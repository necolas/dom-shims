'use strict';

describe('Element#closest(selector)', function () {
  var fixture, subjectElement, ancestorElement;

  beforeEach(function () {
    fixture = document.createElement('div');
    fixture.innerHTML = '' +
      '<div class="ancestor" id="ancestor1">' +
        '<div class="subject" id="subject1">text</div>' +
      '</div>';

    document.body.appendChild(fixture);
    subjectElement = document.getElementById('subject1');
    ancestorElement = document.getElementById('ancestor1');
  });

  afterEach(function () {
    document.body.removeChild(fixture);
  });

  it('returns the closest ancestor', function () {
    var result = subjectElement.closest('.ancestor');
    assert.deepEqual(result, ancestorElement, 'Incorrect closest ancestor');
  });

  it('matches itself', function () {
    var result = ancestorElement.closest('.ancestor');
    assert.deepEqual(result, ancestorElement);
  });

  it('returns null when there is no closest match', function () {
    var result = ancestorElement.closest('.missing');
    assert.isNull(result);
  });

  it('does not throw on orphan nodes', function () {
    var orphan = document.createElement('div');
    var result = function () { orphan.closest('.missing'); };
    assert.doesNotThrow(result);
  });
});
