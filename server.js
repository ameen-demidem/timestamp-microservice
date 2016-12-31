const express = require('express');

const app = express();
app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.end(
    '<h1>Example usage</h1>' +
      'http://localhost:3000/Jan 1 2016<br>' +
      'http://localhost:3000/1450137600'
  );
});

const Months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
app.get('/:date', function (req, res) {
  const date = isNaN(req.params.date) ?
    new Date(req.params.date) :
    new Date(Number(req.params.date));
  let natural = null, unix = null;
  let result = {unix, natural};

  if (!isNaN(date.getTime())) {
    const day = date.getDate();
    const month = Months[date.getMonth()];
    const year = date.getFullYear();

    result = {
      unix: date.getTime(),
      natural: month + ' ' + day + ', ' + year
    };
  }

  res.type('application/json');
  res.end(JSON.stringify(result));
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});
