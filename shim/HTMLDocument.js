// https://developer.mozilla.org/en-US/docs/Web/API/document
if (!('HTMLDocument' in window)) {
  window.HTMLDocument = window.Document;
}
