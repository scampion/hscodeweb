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


async function load_model(){
 const modelURL = 'http://localhost:8000/tfjs/model.json';
 const model = await tf.loadLayersModel(modelURL);
 return model;
}

//var q = tf.tensor([1, 2, 3, 4],[400])
q = tf.tensor(q)
/**
const xs = tf.tensor2d([[1], [2], [3], [4]], [4, 1]);

input = [{
 report_id: parseFloat(self.reportIdP()),
 report_params: self.reportParamsP(),
 day_part: parseFloat(self.reportExecSlotP())
}];
convertInputToTensor(input);
res = model.predict(tensors.inputFeatures);
score = res.dataSync()[0];
**/

var model = load_model();
q = tf.tensor(q)
model.predict(q);
