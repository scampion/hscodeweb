function getJSON(url) {
    var resp;
    var xmlHttp;

    resp = '';
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp != null) {
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }

    return resp;
}

async function load_model() {
    const modelURL = './tfjs/model.json';
    const model = await tf.loadLayersModel(modelURL)
    //const model = await tf.loadLayersModel(modelURL);
    return model;
}

var vocab = JSON.parse(getJSON('./word_dict.json'));
var X = [];
var query = "jeans for woman";
q = query.toLowerCase()
var words = q.split(" ");
var input_dim = 321;
for (var i = 0; i < input_dim; i += 1) {
    if (i < words.length) {
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

function argMax(array) {
  return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

var model = load_model();
var input = tf.tensor(X, [1, 321]);
var prediction;

model.then(function (res) {
    console.log(X);
    console.log(input);
    prediction = res.predict(input);
    console.log("Prediction : ")
    console.log(prediction);
    var c1 =  argMax(prediction.dataSync())
    

}, function (err) {
    console.log(err);
});
