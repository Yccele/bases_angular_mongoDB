var mongoose = require('mongoose');

var persoSchema = new mongoose.Schema({
	"nom": {type:String},
	"prenom": {type:String},
	"age": {type:Number},
	"poids": {type:Number}
});

//je recupere mon model je l'ajoute a ma db en lui donnant un nom
var Perso = mongoose.model('Perso', persoSchema);
//export mon model
module.exports = Perso;