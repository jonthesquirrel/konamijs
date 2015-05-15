// https://github.com/lasercar/konamijs
var Konami = (function() {
  'use strict';

  //arbitrary functions to be run when code is entered correctly
  var callbacks = [];

  function activate() {
    var deleted = [];
    //run all the callback functions
    callbacks.forEach(function(item, position) {
      item.callback();
      //track once-only functions for deletion
      if (item.once) {
        deleted.push(position);
      }
    });
    deleted.forEach(function(item) {
      //remove all once-only functions
      callbacks.splice(item, 1);
    });
  }

  //up up down down left right left right b a
  var code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

  //current correct streak of keys user has pressed
  var streak = [];

  function check(event) {
    var key = event.keyCode;
    //add key to streak and get position of key in streak
    var position = streak.push(key) - 1;
    //check if streak is still correct
    if (streak[position] === code[position]) {
      //check if streak is complete
      if (streak.length === code.length) {
        activate();
        //reset streak
        streak = [];
      }
    } else {
      //remove wrong keys from top of streak
      while ((streak[streak.length - 1] !== code[streak.length - 1]) && streak.length !== 0) {
        streak.pop();
      }
    }
  }

  window.addEventListener('keydown', check);

  function Konami(callback, once) {
    callbacks.push({callback: callback, once: once});
  };

  return Konami;
})();

//run myFunction each time konami code is entered: Komani(myFunction);
//run myFunction only first time code is entered: Konami(myFunction, true);
