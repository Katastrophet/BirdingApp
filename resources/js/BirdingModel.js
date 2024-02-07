/* eslint-env browser */
/* global BirdingApp */

BirdingApp.Model = (function(elements) {
  "use strict";

  let that = {}, dashBoardList = [], expandedBirdArray;

  function init(){
    let completeBirdArrayJSON = elements.birdList.innerHTML;
    expandedBirdArray = JSON.parse(completeBirdArrayJSON);
    for(let i=0; i< expandedBirdArray.length; i++ ){
      expandedBirdArray[i].count = 0;
    }
  }

  function returnCompleteBirdList(){

    return expandedBirdArray;
  }

  function returnFilteredBirdList(lowerCaseSearchInput){
    let filteredBirdNameArray = expandedBirdArray.filter(element => element.name.toLowerCase().includes(lowerCaseSearchInput));
    return filteredBirdNameArray;
  }

  function birdOnDashBoard(birdId){
    for (let i = 0; i < dashBoardList.length; i++) {
      if(dashBoardList[i] === birdId){
        return true;
      }
    }
    return false;
  }

  function addBirdToDashBoard(birdId){
    dashBoardList.push(birdId);
  }

  function getBirdData(birdId){
    let birdData = expandedBirdArray.filter(element => parseInt(element.id) === parseInt(birdId))[0];
    return birdData;
  }

  function returnDashBoardList(){
    return dashBoardList;
  }

  function increaseCount(birdId) {
    let bird = getBirdData(birdId);
    bird.count = bird.count + 1;
    return bird.count ;
  }

  function decreaseCount(birdId) {
      let bird = getBirdData(birdId);
      if(bird.count > 0) {
        bird.count = bird.count - 1;
      }
        return bird.count;
  }

  that.increaseCount = increaseCount;
  that.decreaseCount = decreaseCount;
  that.getBirdData = getBirdData;
  that.returnDashBoardList = returnDashBoardList;
  that.addBirdToDashBoard = addBirdToDashBoard;
  that.birdOnDashBoard = birdOnDashBoard;
  that.returnFilteredBirdList = returnFilteredBirdList;
  that.returnCompleteBirdList = returnCompleteBirdList;
  that.init = init;
  return that;
});
