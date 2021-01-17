
function getJSON(url) {
    var resp ;
    var xmlHttp ;

    resp  = '' ;
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)
    {
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }

    return resp ;
}

async function load_model(){
 const modelURL = 'http://localhost:8000/tfjs/model.json';
 const model = await tf.loadGraphModel(modelURL)
 //const model = await tf.loadLayersModel(modelURL);
 return model;
}

var vocab = JSON.parse(getJSON('./word_dict.json'));
var X = [];
var query = "jeans for woman";
q = query.toLowerCase()
var words = q.split(" ");
var input_dim = 321;
for (var i = 0; i < input_dim;  i += 1) {
 if ( i < words.length){
  var code = vocab[words[i]];
  if (code) {
   X.push(code)
  } else {
   X.push(0)
  }
 } else {
  X.push(0)
 }
}
console.log(X);


var model = load_model();
var input = convertInputToTensor(q);
model.predict(input);
