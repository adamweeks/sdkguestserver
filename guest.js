/**
 * Tools for generating a guest user token
 * 
 * Online docs:
 * https://developer.webex.com/docs/guest-issuer
 */

const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const {GUEST_ISSUER_ID, GUEST_SHARED_SECRET} = process.env;

/**
 * Creates a jwt user token
 * @param {object} options
 * @param {String} options.displayName *required*
 * @param {Number} options.expiresInSeconds
 * @param {String} options.issuer Guest Issuer ID
 * @param {String} options.userId *no spaces*
 * @returns {Promise<object>}
 */
function createUser({
  displayName
}) {
  const payload = {
    name: displayName
  };
  const options = {
    expiresIn: 90 * 60,
    issuer: GUEST_ISSUER_ID,
    subject: uuid.v4()
  };
  const secret = Buffer.from(GUEST_SHARED_SECRET, 'base64');
  try {
    const jwtToken = jwt.sign(payload, secret, options);
    return Promise.resolve(jwtToken);
  }
  catch (e) {
    return Promise.reject(e);
  }
};

module.exports = createUser;