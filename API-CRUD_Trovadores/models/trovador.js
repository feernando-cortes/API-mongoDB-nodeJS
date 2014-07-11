var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

var Trovador = new Schema({
  model:    { type: String, require: true },
  images:    [Images],
  style:    { type: String, 
              enum:  ['Casual-Trova', 'Bohemias', 'Alternative','Dolidas','Rompe Corazones','Happy´s'],
              require: true 
            },
  album:  { type: String },
  birthday: { type: Date }    
});

Trovador.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('Trovador', Trovador);