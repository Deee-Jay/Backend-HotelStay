const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,       // this basically saying si gi entry/id se hana dei leiba collection 'Home' da yaoba id duni ekhoi na anwba define twba natte .       si gi potse atoppa collection ama da yaoba pot ni takpanina -> Schema.Types.ObjectId
    ref: 'Home',
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('favourites', favouriteSchema);