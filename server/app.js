const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(cors());


const accountRouter = require('./src/routes/account-route');
app.use('/api/account', accountRouter);

const testRouter = require('./src/routes/test-route');
app.use('/api/test', testRouter);


app.listen(8888, () => console.log('listening on port 8888...'));

