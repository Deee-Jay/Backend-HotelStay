const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  housePrice: {
    type: Number,
    required: true,
    // it means jo input arhahe it should be a Number, if its not then we wont allow to save this home in our DB
  },
  houseLocation: {
    type: String,
    required: true,
  },
  houseRating: {
    type: Number,
    required: true,
  },
  housePhotos: String,
  // it means jo input arhahe agar String he toh save kardo , if its not then its okay we will still save it as blank ie we will allow it to save in our DB

});


module.exports = mongoose.model('Home', homeSchema);
//same as creating a Class Home  . in mongoose we do say create model ( name of class , schema/structure )