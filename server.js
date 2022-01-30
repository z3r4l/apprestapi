const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const PORT = 3000;

// parse app//json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes
let routes = require('./routes');
routes(app);

//menu routes dari index
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
  console.log(`server started on ${PORT}`);
});
