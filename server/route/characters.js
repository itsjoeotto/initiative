let express = require('express');
let router = express.Router();
let Characters = require('../models/characters');
let character_controller = require('../controllers/characters');

  router.route('/')
    .get(character_controller.getCharacters)
    .post(character_controller.addCharacters)
    .delete(character_controller.deleteAll)
  
  router.route('/:character_id')
    .put(character_controller.updateCharacter)
    .delete(character_controller.deleteCharacter);

  
  
  
  
  module.exports = router;