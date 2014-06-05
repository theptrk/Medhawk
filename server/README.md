## How to Deploy

* Copy `secret.example.js` to `secret.js` and add the secret keys you will use
  to make all of your requests to it. You should have one secret key for each
  app. DO NOT check these keys in to version control!
* Run `npm install`. This will get all of the dependencies of the server.
* Start a mongodb instance that you can connect to. Add the ip address and port
  of that instance to env.js as `module.exports.MONGOPATH = your mongo path
  here`
* To insert the sample data, run `node sampleData/insertData.js`.
* Run `node main.js` to start the server and start logging and serving
  requests.
