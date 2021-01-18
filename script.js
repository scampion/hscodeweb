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

function argMax(array) {
  return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

async function load_model() {
    const modelURL = './tfjs/model.json';
    const model = await tf.loadLayersModel(modelURL)
    return model;
}

var model = load_model();
var vocab = JSON.parse(getJSON('./word_dict.json'));

const input_dim = 321;

function vectorize(query) {
    var X = [];
    q = query.toLowerCase()
    var words = q.split(" ");
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
    return X;
}

function compute(query){
    X = vectorize(query);
    var input = tf.tensor(X, [1, input_dim]);
    model.then(function (res) {
        console.log(X);
        console.log(input);
        const prediction = res.predict(input);
        console.log("Prediction : ")
        console.log(prediction);
        var c1 =  argMax(prediction.dataSync())
        var element = document.getElementById("result");
        element.innerHTML = "" + c1 + " 00 00";

    }, function (err) {
        console.log(err);
    });

}

function update(){
    var query = document.getElementById("query").value;
    compute(query);
}

// sparse parts for dishwashe machine
//