/* eslint-env browser */
/* global BirdingApp _ */

BirdingApp.ListView = (function(elements) {
  "use strict";

  let createEntryTemplate, that = {};

  function init(completeBirdArray){
    let entryTemplateContent = elements.birdListTemplate.innerHTML;
    createEntryTemplate = _.template(entryTemplateContent);
    showCurrentList(completeBirdArray);
  }

  function showCurrentList(currentBirdArray){
    let entryNode = document.createElement("div");
    for(let i=0; i< currentBirdArray.length; i++ ){
      entryNode.innerHTML = createEntryTemplate(currentBirdArray[i]);
      elements.birdList.appendChild(entryNode.children[0]);
    }
    //elements.birdList.innerHTML = '';
  }

  function deleteList(){
    elements.birdList.innerHTML = "";
  }

  function changeSoundButton(soundButton){
    if(!soundButton.classList.contains("playing")) {
      soundButton.classList.add("playing");
    }
    else{
      soundButton.classList.remove("playing");
    }
  }

  function changeOtherSoundButton(birdId) {
    let activeSoundButtons = [...elements.birdList.querySelectorAll(".playing")];
    activeSoundButtons = activeSoundButtons.filter(element => parseInt(element.parentNode.parentNode.attributes.getNamedItem("bird-id").nodeValue) !== parseInt(birdId));
    for (let i = 0; i < activeSoundButtons.length; i++) {
      //activeSoundButtons[i].classList.remove("playing");
      changeSoundButton(activeSoundButtons[i]);
    }
  }

  function changeSoundButtonAfterSoundEnded(){
    let listEntry = elements.birdList.querySelector(".playing");
    changeSoundButton(listEntry);
  }

  that.changeSoundButtonAfterSoundEnded = changeSoundButtonAfterSoundEnded;
  that.changeOtherSoundButton = changeOtherSoundButton;
  that.changeSoundButton = changeSoundButton;
  that.deleteList = deleteList;
  that.showCurrentList = showCurrentList;
  that.init = init;
  return that;
});

