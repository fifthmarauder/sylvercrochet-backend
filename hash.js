// hashPassword.js
const bcrypt = require("bcryptjs");

const password = "sharingan911";
const hash = bcrypt.hashSync(password, 10);

console.log("Hashed password:", hash);
