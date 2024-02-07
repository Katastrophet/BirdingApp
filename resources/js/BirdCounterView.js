/* eslint-env browser */
/* global BirdingApp _ */

BirdingApp.CounterView = (function(elements){
  "use strict";

  let createEntryTemplate, entryNode, that = {};

  function init(){
    let entryTemplateContent = document.querySelector("#bird-counter-entry").innerHTML;
      entryNode = document.createElement("div");
      createEntryTemplate = _.template(entryTemplateContent);
  }

  function drawDashBoardEntry(bird) {

    entryNode.innerHTML = createEntryTemplate(bird);
    elements.birdList.appendChild(entryNode.children[0]);
  }

  function changeCount(birdCount, targetBird) {
    targetBird.parentNode.parentNode.querySelector(".bird-current-max").innerHTML = birdCount;
  }

  that.changeCount = changeCount;
  that.drawDashBoardEntry= drawDashBoardEntry;
  that.init = init;
  return that;
});