const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

require('./routes/index.js')(app);

app.listen(8080, () => {
  console.log('Example app is running → PORT 8080');
});