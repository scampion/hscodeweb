from sklearn.preprocessing import LabelEncoder
import pickle
import json


def convert2json(filename):
    data = pickle.load(open(filename, 'rb'))
    ddata = {i:v for i, v in enumerate(data.classes_)}

    with open(filename + ".json", "w") as f:
        json.dump(ddata, f, indent=4, sort_keys=True)


if __name__ == '__main__':
    for f in ["c1_label_decoder", "c2_label_decoder", "c3_label_decoder"]:
        convert2json(f)