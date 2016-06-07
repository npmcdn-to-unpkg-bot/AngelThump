'use strict';

const rp = require('request-promise');
const errors = require('feathers-errors');

module.exports = function(app) {
  return function(req, res, next) {
    // Perform actions
    // viewers
    // "http://www.overpoweredstrim.me/viewers?app=live&name=mannekino",
    // live status
    // "http://www.overpoweredstrim.me/live?app=live&name=mannekino",
    // stream title
    // "http://www.overpoweredstrim.me/title",
    // thumbnail
    // "http://www.overpoweredstrim.me/thumbnail_mannekino.jpg"
    const requested_username = req.params.username;

    app.service('users').find({
      query: { username: requested_username }
    })
    // Then we're good to check apis
    .then((users) => {
      console.log(users.total, 'users found for that stream username', username);
      if (users.total > 0) {
        const username = users.data[0].username;
        // const title = users.data[0].title;
        Promise.all([
          rp({uri:`http://www.overpoweredstrim.me/live?app=live&name=${username}`}),
          rp({uri:`http://www.overpoweredstrim.me/viewers?app=live&name=${username}`}),
        ]).then( function (values){
          res.json({
            live: values[0].trim() === "1",
            title: "Placeholder Stream Title",
            // title: title,
            viewers: parseInt(values[1], 10),
            thumbnail: `http://www.overpoweredstrim.me/thumbnail_${username}.jpg`,
          })
        }).catch(() => res.status(404).send('API Date Not Found'));
      }else{
        res.status(404).send(`No Users Named ${requested_username}`)
      }
    })
    // On errors, just call our error middleware
    .catch(() => res.status(403).send('Forbidden'));
    next();
  };
};
