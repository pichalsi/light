import { Router } from 'express';
import rcswitch from 'rcswitch';

export default function(config) {
	var api = Router();
	rcswitch.enableTransmit(0);

	function sendCommand(device, command) {
		if (!config.devices[device] || !config.devices[device].codes[command]) {
			throw new Error('Bad request. Device: ' + device + ', command: ' + command + '.');
		}
		let decimalCode = config.devices[device].codes[command];
		let binaryCode = zeroPadLeft(decimalCode.toString(2), 24);
		rcswitch.send(binaryCode)
	}

	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	api.post('/switch', (req, res) => {
		sendCommand(req.body.device, req.body.command);

		res.json({
			success : 1
		});
	});

	return api;
}

function zeroPadLeft(text, len) {
	var paddingValue = '';
	for(var i = 0; i < len; i++) {
		paddingValue += '0';
	}
	return String(paddingValue + text).slice(-len);
}
