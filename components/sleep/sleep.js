//This method should be used sparingly only if needed
//It will completely hault all javascript (which is actively running to control syncing and much of the webpage)
//Should only be used in non-time-sensitive situations
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}