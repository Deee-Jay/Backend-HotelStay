const fs = require("fs");

const path = require("path");
const rootDir = require("../utils/pathUtil");

const filePath = path.join(rootDir, "data", "AllHomeData.json");

module.exports = class Home {
  constructor(houseName, houseLocation, housePrice, houseRating, housePhotos) {
    this.houseName = houseName;
    this.houseLocation = houseLocation;
    this.housePrice = housePrice;
    this.houseRating = houseRating;
    this.housePhotos = housePhotos;
  }

  save() {
    
    Home.fetchAll((homes) => {
      if(this.homeID) { // edit-home case
        homes = homes.map( eachhome => {
          if(eachhome.homeID === this.homeID) return this;
          else return eachhome;
        })   
        // available homes mayam dei we map and find the one with the same homeID then change the id 
      }
      else {  //add-home case
        this.homeID = Math.random().toString();
        homes.push(this);
      }

      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        if(err) console.log("not able to write files in data", err);
      });
    });
  }

  static fetchAll(callback) {
    // why use static idk
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

  //new fxn
  static deleteById(homeId , callback) {
    Home.fetchAll(homes => {
      homes = homes.filter( eachhome => eachhome.homeID !== homeId );       // filter gi d true conditon oirad return twwi
      fs.writeFile(filePath, JSON.stringify(homes),callback);
    })
  }
};
