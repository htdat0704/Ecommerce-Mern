const express = require('express');
const route = require('./routes');
const app = express();
require('dotenv').config();
const db = require('./config/db');
const errorMiddleware = require('./app/middlewares/error');
const cookieParser = require('cookie-parser');

db.connect();
// body
app.use(
   express.urlencoded({
      extended: true,
   }),
);
app.use(express.json());
app.use(cookieParser());

route(app);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
   console.log(`Server is working with this port ${process.env.PORT}`);
});
