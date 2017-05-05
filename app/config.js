const protocol = 'http';
const address = 'localhost:3000';

const apiPrefix = 'api';
let urls = {
  login: () => '/auth',
  users: () => '/users',
  groups: () => '/groups',
  group: () => '/group',
  joinGroup: (groupID, userID) => `/group/${groupID}/add/${userID}`,

  /**
   * For PUT and DELETE request to a group.
   * 
   * @param {Number} groupID The group's ID/
   * 
   * @returns {String} The URL/
   */
  groupById: (groupID) => `/group/${groupID}`,
  groupPost: (groupID, postID) => `/group/${groupID}/post/${postID}`,

  /**
   * For POST-ing posts to a certain group.
   * 
   * @param {Number} groupID The group's ID.
   * 
   * @returns {String} The URL.
   */
  groupPosts: (groupID) => `/group/${groupID}/post`
};

// prepend protocol, address and apiPrefix to all urls
/*
  I kept using the "urls" object for IntelliSense.
*/
let oldUrls = {};
Object.keys(urls).forEach(key => {
  oldUrls[key] = urls[key];
});

Object.keys(oldUrls).forEach(key => {
  let newFunc = (...args) => {
    var baseUrl = oldUrls[key].apply(oldUrls, args);
    return `${protocol}://${address}/${apiPrefix}${baseUrl}`;
  };
  urls[key] = newFunc;
});

module.exports = {
  urls
};