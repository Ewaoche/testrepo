'use strict';


const generateRandomToken =  (length) => {
    const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    return [...Array(length)].map(i=>chars[Math.random()*chars.length|0]).join``;
};




module.exports = {
  generateRandomToken
 
};

