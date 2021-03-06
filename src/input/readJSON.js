function readJSON(event, explicit, direction, weighted_mode) {
  var startTime = +(new Date);
  var explicit = typeof explicit === 'undefined' ? false : explicit;
  var direction = typeof direction === 'undefined' ? false : direction;
  var weighted_mode = typeof weighted_mode === 'undefined' ? false : weighted_mode;
  
  if(document.querySelector('#undirected').checked) {
    direction = false;
  }
  else {
    direction = true;
  }
  
  var json = new $G.input.JSONInput(explicit, direction, weighted_mode);

  //checks if the browser supports the file API
  if (!window.File && window.FileReader && window.FileList && window.Blob) {
    alert("Browser does not support the File API.");
  }

  var files = document.getElementById('input').files;
  if (!files.length) {
    alert("No file selected.");
    return;
  }

  //only json files
  splitFileName = files[0].name.split(".");
  if(!splitFileName.pop().match('json')) {
    alert("Invalid file type - it must be a json file.");
    return;
  }
  // -> only works in firefox - chrome has no file.type
  /*if (!files[0].type.match('json')){
    alert('Wrong file type.');
    return;
  }*/

  var reader = new FileReader();
  var result = null;

  reader.onloadend = function(event){
    if (event.target.readyState == FileReader.DONE) {
      //console.log(event.target.result);
      var parsedFile = JSON.parse(event.target.result);
      window.graph = json.readFromJSON(parsedFile);

      document.querySelector("#nodes").innerHTML = window.graph.nrNodes();
      document.querySelector("#dir-edges").innerHTML = window.graph.nrDirEdges();
      document.querySelector("#und-edges").innerHTML = window.graph.nrUndEdges();

      var endTime = +(new Date);
      document.querySelector("#time").innerHTML = (endTime - startTime) + ' ms.';

      result = parsedFile.data;
    }
  }
  reader.readAsText(files[0]);

  return result;
};

module.exports = {
  readJSON: readJSON
};
