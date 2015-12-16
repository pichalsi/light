import { Router } from 'express';

export default function() {
	var api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	api.get('/switch', (req, res) => {
		res.json({
			success : 1
		});
	});

	return api;
}
