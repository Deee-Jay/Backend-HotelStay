// we want another data for storing favourites IDs and hence a new model is used
const fs = require("fs");

const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteListPath = path.join(rootDir, "data", "FavouritesData.json");

module.exports = class Favourite {
  static addToFavourite(homeID , callback) {
    this.getFavouriteHomes((favouriteList) => {
      if(favouriteList.includes(homeID) ) {
        callback("Already exist");
      }
      else {
        favouriteList.push(homeID);
        fs.writeFile(favouriteListPath,JSON.stringify(favouriteList), callback);  //why callback idk
      }
    })

  }

  static getFavouriteHomes(callback) {
    fs.readFile(favouriteListPath , (err,data) => {
      callback(!err ? JSON.parse(data) : []);
    })
    // only format is different logic is same as home.js model
  }

  static deleteFavouriteHome ( homeID , callback ) {
    this.getFavouriteHomes( favhomes => {
      favhomes = favhomes.filter(eachHome => eachHome !== homeID);      // filter gi d true conditon oirad return twwi
      console.log(favhomes);
      fs.writeFile(favouriteListPath, JSON.stringify(favhomes) , callback);
    })
  }

}     

