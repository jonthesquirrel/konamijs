// https://github.com/lasercar/konamijs
var Konami = (function() {
  'use strict';

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

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

  //test if streak is shadowing code correctly
  function okay() {
    return arraysEqual(streak, code.slice(0, streak.length));
  }

  function check(event) {
    var key = event.keyCode;
    //add key to streak
    streak.push(key);
    //check if streak is still correct
    if (okay()) {
      //check if streak is complete
      if (streak.length === code.length) {
        activate();
        //reset streak
        streak = [];
      }
    } else {
      //until streak is correct or gone
      while (!okay() && streak.length !== 0) {
        //shift streak back by one
        streak.splice(0, 1);
      }
    }
  }

  window.addEventListener('keydown', check);

  function Konami(callback, once) {
    callbacks.push({callback: callback, once: once});
  };

  return Konami;
})();

//run myFunction each time konami code is entered: Konami(myFunction);
//run myFunction only first time code is entered: Konami(myFunction, true);
