"use strict";

class DomElement {
  /*constructor() {
    this.selector = document;
    this.height = 0;
    this.width = 0;
    this.bg = "none";
    this.fontSize = "12px";
  }*/
  constructor(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
  }
  createSelector(text) {
    if (this.selector !== undefined) {
      let element;
      if (this.selector.substring(0, 1) === ".") {
        element = document.createElement("div");
        element.classList.add(this.selector);
      } else if (this.selector.substring(0, 1) === "#") {
        element = document.createElement("p");
        element.id = this.selector;
      }
      if (element !== undefined) {
        element.innerHTML = text !== undefined ? text : "";

        element.style.cssText = `height: ${this.height};
    background-color: ${this.bg};
    width: ${this.width};
    font-size: ${this.fontSize};
  `;
        document.body.insertAdjacentElement("beforeend", element);
      }
    }
  }
}

let domElement = new DomElement(".newClass", "100px", "200px", "red", "24px");
domElement.createSelector("Hello!");
let domElement2 = new DomElement();
domElement2.createSelector("Hello2!");
let domElement3 = new DomElement(".newClass", "100px", "200px", "green", "24px");
domElement3.createSelector();
let domElement4 = new DomElement(".newClass", "200px", "200px", "blue", "36px");
domElement4.createSelector("World!");
