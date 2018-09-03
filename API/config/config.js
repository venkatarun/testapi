const localhost = require("./localhost.js");

function setconfig() {
    if (process.env.NODE_ENV && process.env.NODE_ENV == "LOCALHOST") {
        return localhost;
    } else {
        return localhost;
    }
}

module.exports = setconfig();
