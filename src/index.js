import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import api from './api';

var app = express();
app.server = http.createServer(app);

app.use(express.static('public'));

app.use(bodyParser.json({
	limit : '100kb'
}));

app.use('/api', api());

app.server.listen(process.env.PORT || 8888, function() {
	console.log(`Started on port ${app.server.address().port}`);
});
