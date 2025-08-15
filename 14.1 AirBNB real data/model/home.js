const fs = require("fs");

const path = require("path");
const rootDir = require("../utils/pathUtil");

module.exports = class Home {
  constructor(houseName, houseLocation, housePrice, houseRating, housePhotos) {
    this.houseName = houseName;
    this.houseLocation = houseLocation;
    this.housePrice = housePrice;
    this.houseRating = houseRating;
    this.housePhotos = housePhotos;
  }

  save() {
    this.homeID = Math.random().toString();
    //save and write file using callback
    Home.fetchAll((homes) => {
      homes.push(this);
      console.log(homes);

      const filePath = path.join(rootDir, "data", "AllHomeData.json");
      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        console.log("heehe", err);
      });
    });
  }

  static fetchAll(callback) {
    // why use static idk
    const filePath = path.join(rootDir, "data", "AllHomeData.json");
    fs.readFile(filePath, (err, data) => {
      let homes = [];
      if (!err) {
        homes = JSON.parse(data);
      }
      return callback(homes);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      let HomeFound = homes.find(homePtr =>  homePtr.homeID === homeId );
    
      return callback(HomeFound);
    });
  }
};
