const path = require("path");
const fs = require("fs");

const saveDataRecovery = (data, filename) => {
  const PATH = path.join(__dirname, filename);
  fs.writeFile(PATH, data, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(filename + " saved");
    }
  });
};

export default saveDataRecovery;
