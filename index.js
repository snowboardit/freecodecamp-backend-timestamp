// index.js
// where your node app starts

// init project
const _ = require('lodash'),
  express = require('express'),
  DateHandler = require('./dateHandler.js')

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  const reqDate = req.params.date;

  // If date param is empty, return current datetime in unix and utc
  if (reqDate === undefined) {
    res.json(DateHandler.getCurrentReturner())
    return
  }

  // Otherwise, check if date is valid and return requested date in both
  // unix and utc
  // If date isn't valid, return 'Invalid Date'
  try {
    const dateHandler = new DateHandler(reqDate),
      returner = dateHandler.getReturner()
    res.json(returner)
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: 'Invalid Date' })
    }
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
