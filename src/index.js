import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import log from 'winston';
import api from './api';
import config from '../config.js';
import path from 'path';

var app = express();
app.server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static('public'));

app.use(bodyParser.json({
	limit: '100kb'
}));

app.use('/api', api(config));
app.get('/', (req, res) => {
  	res.render('index', config);
});

app.use(function(err, req, res, next) {
	log.error(err.stack);
	res.status(500).send(err.message);
});

app.server.listen(process.env.PORT || 8888, function() {
	log.info(`Started on port ${app.server.address().port}`);
});
