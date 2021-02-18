const { assert } = require('chai');

const { findUserEmail } = require('../helpers');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = findUserEmail("user@example.com", testUsers)
    const expectedOutput = "userRandomID";
    // Write your assert statement here
    assert.equal(expectedOutput, user.id);
  });
  it('should return undefined with invalid email', () => {
    const user = findUserEmail("wrong@email.com", testUsers);
    assert.equal(undefined, user);
  });
});
