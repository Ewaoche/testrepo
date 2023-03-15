'use strict';

const generateReference = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
const stripPhoneNumber = (phoneNumber) => {
  const length = phoneNumber.length;
  phoneNumber = Number(phoneNumber.substr((length - 10), length));
  return phoneNumber ? `0${phoneNumber}` : undefined;
};
const generateRandomToken =  (length) => {
    const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    return [...Array(length)].map(i=>chars[Math.random()*chars.length|0]).join``;
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


module.exports = {
  generateReference,
  generateRandomToken, 
  stripPhoneNumber,
  validateEmail
};

