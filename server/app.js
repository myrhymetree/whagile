const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    exposedHeaders: ['Authorization'],
}));


const accountRouter = require('./src/routes/account-route');
app.use('/api/account', accountRouter);

const testRouter = require('./src/routes/test-route');
app.use('/api/test', testRouter);

const authorityRouter = require('./src/routes/authority-route');
app.use('/api/auth', authorityRouter);

app.listen(8888, () => console.log('listening on port 8888...'));

