var Characters = require('../models/characters');

exports.getCharacters = function (req, res) {
    console.log('GET works');
    Characters.find({}, function (err, characters) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        let sortedCharacters = characters.sort((a, b) => {
            return b.roll - a.roll;
          }); 

        res.send(sortedCharacters);
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
    console.log(req.body);
    Characters.findOneAndUpdate({_id: req.params.character_id}, {$set: req.body}, {new: true}, function( err, data) {
      if (err) {
        console.log('error updating character', err);
        res.sendStatus(500);
      } else {
          res.send(data);
      }
    })
}

exports.deleteCharacter = function(req, res) {
    console.log('Delete', req.params);
    Characters.remove({_id: req.params.character_id}, function( err, data) {
      if (err) {
        console.log('error deleting character');
        res.sendStatus(500);
      } else {
          res.sendStatus(200);
      }
    });
}

exports.deleteAll = function(req, res) {
    console.log('Delete all characters');
    Characters.remove({}, function(err, data) {
        if (err) {
            console.log('err deleting all');
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
}