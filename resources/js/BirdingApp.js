/* eslint-env browser */
/* global BirdingApp */

var BirdingApp = BirdingApp || (function() {
	"use strict";
  let model, listView, counterView, controller, sound, that = {};

  function init() {
    model = BirdingApp.Model({
      birdList: document.querySelector("#bird-list"),
    });
    model.init();

    listView = BirdingApp.ListView({
      birdList: document.querySelector(".bird-list"),
      birdListTemplate: document.querySelector("#bird-list-entry"),
    });
    listView.init(model.returnCompleteBirdList());

    counterView = BirdingApp.CounterView({
      birdList: document.querySelector(".bird-counter .bird-list"),
    });
    counterView.init();

    controller = BirdingApp.Controller({
      list: document.querySelector("ul.bird-list"),
      dashBoard: document.querySelector(".bird-counter .bird-list"),
      inputField: document.querySelector("input.bird-search"),
    });
    controller.init();

    sound = BirdingApp.Sound();

    registerEvents();
  }

  function registerEvents(){
    controller.addEventListener("addButtonClicked", onAddButtonClicked);
    controller.addEventListener("soundButtonClicked", onSoundButtonClicked);
    sound.addEventListener("soundEnded", onSoundEnded);
    controller.addEventListener("minusButtonClicked", onCountButtonClicked);
    controller.addEventListener("plusButtonClicked", onCountButtonClicked);
    controller.addEventListener("typing", onTyping);
  }

  function onAddButtonClicked(event){
    let birdId = event.target.parentNode.parentNode.attributes.getNamedItem("bird-id").nodeValue;
    if(!model.birdOnDashBoard(birdId)){
      model.addBirdToDashBoard(birdId);
      counterView.drawDashBoardEntry(model.getBirdData(birdId));
      controller.addEventListenerToEntry(birdId);
    }
  }

  function onSoundButtonClicked(event){
    if(!event.target.classList.contains("playing")) {
      let birdId = event.target.parentNode.parentNode.attributes.getNamedItem("bird-id").nodeValue;
      sound.playSound(birdId, model.returnCompleteBirdList());
      listView.changeSoundButton(event.target);
      listView.changeOtherSoundButton(birdId);
    }
    else{
      sound.stopSound();
      listView.changeSoundButton(event.target);
    }
  }

  function onSoundEnded(){
    listView.changeSoundButtonAfterSoundEnded();
  }

  function onCountButtonClicked(event) {
    let birdId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.attributes.getNamedItem("bird-id").nodeValue;
    if(event.type === "plusButtonClicked"){
      counterView.changeCount(model.increaseCount(birdId), event.target);
    }
    else{
      counterView.changeCount(model.decreaseCount(birdId), event.target);
    }
  }

  function onTyping(event){
    sound.stopSound();
    listView.deleteList();
    listView.showCurrentList(model.returnFilteredBirdList(event.content.toLowerCase()));
    controller.addEventListenerAddButton();
    controller.addEventListenerSoundButton();
  }

  that.init = init;
  return that;
}());