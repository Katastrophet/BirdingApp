/* eslint-env browser */
/* global BirdingApp */

BirdingApp.Controller = ( function (elements) {
  "use strict";

  let that = {}, events = [];

  function init () {
    addEventListenerAddButton();
    addEventListenerSoundButton();
    elements.inputField.addEventListener("input", onTyping);
  }

  function addEventListenerToEntry (birdId) {
    let dashBoardArray = [...elements.dashBoard.querySelectorAll("li")],
      bird = dashBoardArray.filter(element => parseInt(element.attributes.getNamedItem("bird-id").nodeValue) === parseInt(birdId))[0];
    bird.querySelector(".bird-counter-decrease").addEventListener("click", onMinusButtonClicked);
    bird.querySelector(".bird-counter-increase").addEventListener("click", onPlusButtonClicked);
  }

  function addEventListenerAddButton () {
    let listArray = [...elements.list.querySelectorAll("span.add-bird-button")];
    for (let i = 0; i < listArray.length; i++) {
      listArray[i].addEventListener("click", onAddButtonClicked);
    }
  }

  function addEventListenerSoundButton () {
    let listArray = [...elements.list.querySelectorAll("span.sound-bird-button")];
    for (let i = 0; i < listArray.length; i++){
      listArray[i].addEventListener("click", onSoundButtonClicked);
    }
  }

  function changeEventListenerSoundButton (soundButton) {
    soundButton.parentNode.addEventListener("click", onMuteButtonClicked);
  }

  function onMinusButtonClicked (event) {
    emit({
      type: "minusButtonClicked",
      target: event.target,
    });
  }

  function onPlusButtonClicked (event) {
    emit({
      type: "plusButtonClicked",
      target: event.target,
    });
  }

  function onAddButtonClicked (event) {
    emit({
      type: "addButtonClicked",
      target: event.target,
    });
  }

  function onSoundButtonClicked (event) {
    emit({
      type: "soundButtonClicked",
      target: event.target,
    });
  }

  function onMuteButtonClicked (event) {
    emit({
      type: "muteButtonClicked",
      target: event.target,
    });
  }

  function onTyping (event) {
    emit({
      type: "typing",
      content: event.target.value,
    });
  }

  function addEventListener(type, callback) {
    events[type] = callback;
  }

  function emit (event) {
    let type = event["type"],
      callback = events[type];
    callback(event);
  }

  that.changeEventListenerSoundButton = changeEventListenerSoundButton;
  that.addEventListenerSoundButton = addEventListenerSoundButton;
  that.addEventListenerAddButton = addEventListenerAddButton;
  that.addEventListenerToEntry = addEventListenerToEntry;
  that.onAddButtonClicked = onAddButtonClicked;
  that.addEventListener = addEventListener;
  that.init = init;
  return that;
});
