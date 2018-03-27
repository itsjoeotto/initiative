var Characters = require('../models/characters');

exports.getCharacters = function (req, res) {
    console.log('GET works');
    Characters.find({}, function (err, characters) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        res.send(characters);
    });
}

exports.addCharacters = function(req, res) {
    console.log('POST', req.body);
    let character = Characters(req.body);
    character.save(function (err) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(201);
    });
}


exports.updateCharacter = function(req, res) {
    console.log('PUT');
    res.send({ message: 'PUT ROUTE ' });
    // Characters.findOneAndUpdate(req.params.character_id, function( err, data) {
    //   if (err) {

    //   }
    // })
}

exports.deleteCharacter = function(req, res) {
    console.log('Delete');
    res.send({ message: 'delete ROUTE ' });
    // Characters.findOneAndUpdate(req.params.character_id, function( err, data) {
    //   if (err) {

    //   }
    // })
}