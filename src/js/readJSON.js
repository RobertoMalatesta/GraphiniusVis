var json = new $G.JsonInput(false, false);

input.onchange = function() {   

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
      console.log(parsedFile);
      
      document.querySelector("#nodes").innerHTML = parsedFile.nodes;
      document.querySelector("#edges").innerHTML = parsedFile.edges;
      //document.querySelector("#time").innerHTML = parsedFile.edges;
      
      //console.log(parsedFile.data);  
      result = parsedFile.data;
    }
  }
  reader.readAsText(files[0]);  
  
  return result;
};