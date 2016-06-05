'use strict';

// HTTP request receives a number of arguments. 
// POST method is used with application/x-www-form-urlencoded MIME type. 
// The following arguments are passed to caller:

// call=play
// addr - client IP address
// clientid - nginx client id (displayed in log and stat)
// app - application name
// flashVer - client flash version
// swfUrl - client swf url
// tcUrl - tcUrl
// pageUrl - client page url
// name - stream name
// In addition to the above mentioned items all arguments passed explicitly 
// to play command are also sent with the callback. For example if stream 
// is accessed with the url rtmp://localhost/app/movie?a=100&b=face&foo=bar 
// then a, b & foo are also sent with callback.

module.exports.initial = function(app) {
  return function(req, res, next) {
    const body = req.body;
    const streamkey = req.body.name;

    console.log('initial hit to:', req.originalUrl);
    app.service('users').find({
      query: { streamkey: streamkey }
    })
    // Then we're good to stream
    .then((users) => {
      console.log(users.total, 'users found for that stream key', streamkey);
      if (users.total > 0) {
        const username = users.data[0].username;
        // res.status(200).send(req.method+' OK')
        // const public_endpoint = `${'live/'}${users.data[0]._id}?streamkey=${streamkey}`;
        // console.log('public_endpoint', public_endpoint);
        // res.redirect(public_endpoint);
        res.redirect(username)
      }else{
        res.status(404).send('No Users With That Key')
      }
    })
    // On errors, just call our error middleware
    .catch(() => res.status(403).send('Forbidden'));
  };
}