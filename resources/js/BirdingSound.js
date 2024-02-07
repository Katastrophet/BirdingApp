/* eslint-env browser */
/* global BirdingApp */

BirdingApp.Sound = ( function () {
  "use strict";

  let sound, events = [], that = {};

  function playSound(birdId, expandedBirdArray){
    let bird = expandedBirdArray.filter(element => parseInt(element.id) === parseInt(birdId))[0];
    if(sound === undefined) {
      sound = new Audio(bird.audioPath);
    }
    else if(isPlaying()) {
      sound.pause();
      sound.currentTime = 0.0;
      sound = new Audio(bird.audioPath);
    }
    else if(sound.paused){
      sound = new Audio(bird.audioPath);
    }
    sound.play();
    sound.addEventListener("ended", onSoundEnded);
  }

  function stopSound () {
    sound.pause();
    sound.currentTime = 0.0;
  }

  function isPlaying(){
    return !sound.paused && sound.currentTime;
  }

  function onSoundEnded () {
    emit({
      type: "soundEnded",
    });
  }

  function addEventListener(type, callback) {
    events[type] = callback;
  }

  function emit (event) {
    let type = event["type"], callback = events[type];
    callback(event);
  }

  that.stopSound = stopSound;
  that.playSound = playSound;
  that.addEventListener = addEventListener;
  return that;
});