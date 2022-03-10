const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = 3001;

// parse app//json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//panggil routes
let routes = require('./routes');
routes(app);

//menu routes dari index
app.use('/auth', require('./middleware'));

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
