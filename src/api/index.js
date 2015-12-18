import { Router } from 'express';
import rcswitch from 'rcswitch';

export default function() {
	var api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		rcswitch.enableTransmit(0); // Use data Pin 0 
		rcswitch.send('100001110111010000000100');
		res.json({
			version : '1.0'
		});
	});

	api.get('/switch', (req, res) => {
		rcswitch.enableTransmit(0); // Use data Pin 0 
		rcswitch.send('100001110111010000000100');
		res.json({
			success : 1
		});
	});

	return api;
}
