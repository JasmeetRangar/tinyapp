const bcrypt = require('bcrypt');
const validateUser = (email, password, userDB) => {

  // userDB.filter(userObj => userObj.email === email)
  let currentUser = {};
  for (let id in userDB) {
    if (userDB[id].email === email) {
      currentUser = userDB[id];
    }
  }
  if (Object.keys(currentUser).length === 0) {
    return { user: null, error: "email" };
  } else if (bcrypt.compareSync(password, currentUser.password)) {
    // successful login
    return { user: currentUser, error: null }
  } else {
    // failed at password
    return { user: null, error: "password" }
  }
}

const createUser = (userInfo, userDB) => {
  const { name, email, icon, password } = userInfo
  const { user, error } = validateUser(email, password, userDB)
  if (error === "email") {
    // const newUser = {
    //   email,
    //   name,
    //   password,
    //   icon
    // }
    userDB.push(userInfo)
    return email
  } else {
    return null
  }
}

const findUser = (userID, userDB) => {
  let currentUser = {};
  for (let id in userDB) {
    if (id === userID) {
      currentUser = userDB[id];
      return currentUser;
    }
  }
  return false;
}
const findUserEmail = (email, userDB) => {
  let currentUser = {};
  for (let id in userDB) {
    if (userDB[id].email === email) {
      currentUser = userDB[id];
      return currentUser;
    }
  }
  return undefined;
}
// check and return associated URLs for specific user ID
const urlsForUser = function (id, database) {

  let userURL = {};

  for (let shortURL of Object.keys(database)) {
    if (database[shortURL].userID === id) {
      userURL[shortURL] = {
        longURL: database[shortURL].longURL,
      };
    }
  }
  return userURL;
};
module.exports = { validateUser, createUser, findUser, findUserEmail, urlsForUser }