var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var mongoose = require('mongoose');

var Perso = require('./model/schema');

mongoose.connect('mongodb://localhost/test_DB', function(err) {
	if (err) {
		throw err;
	} else {
		console.log("MongoDB OK");
	}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/assets', express.static('client/static'));
app.use('/app', express.static('client/app'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/users', function (req, res) {
	Perso.find({}, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
        	// docs : liste JSON
        	//console.log(docs);
            return res.json(docs);
        }
    });;
})

app.post('/api/users', function(req,res) {
	console.log(req.body);
       //création d'un nouveau document destiné à la DB
       var nouveauPerso = new Perso({
	       	nom: req.body.nom,
	       	prenom: req.body.prenom,
	       	age: req.body.age,
	       	poids: req.body.poids
       });
       //enregistrement dans la DB
       nouveauPerso.save(function(err) {
       	if (err) {
       		res.send('err');
       	} else {
       		res.send();
       	}
    })
});

app.delete('/api/users/:id', function(req, res) {
    Perso.findByIdAndRemove(req.params.id, (err, perso) => {
        var response = {
            message: "User successfully deleted",
            id: perso._id
        };
        res.status(200).send(response);
    });
});

app.listen(8080);