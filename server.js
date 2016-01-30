// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var port = process.env.PORT || 8080; // set the port for our app
var path = require('path');
var jsonfile = require('jsonfile')
var fs = require('fs');

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

app.use(express.static(__dirname + '/front_end'));

// serve up the web application at "/"
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/front_end/index.html'));
});


//define api routes
var api_router = express.Router();

//set intial statuses
var device_status = "disabled";
var breaker_mode = "disabled";
var piezo_status = "unclamped";
var test_circuit_status = "unpowered";
var dummy_load_status = "connected";
var current_threshold = "0";
var oscope_status = "not collecting"

//Device Enable/Disable API Controls
api_router.get('/enable_device', function(req, res) {
		console.log("enabling device")
		device_status = "enabled";
		res.send('enabling API works');
		//	code to enable device
});

api_router.get('/disable_device', function(req, res) {
		console.log("disabling device");
		device_status = "disabled";
		res.send('disabling API works');
		//	code to disable device
});

api_router.get('/read_device_status', function(req, res) {
		//needs to poll electronics for status and return
		res.send(device_status);
		//needs to poll electronics for status and return
		//	code to enable device
});


//Breaker Mode API Controls
api_router.get('/enable_breaker_operating_mode', function(req, res) {
		console.log("enabling breaker mode");
		breaker_mode = "enabled";
		res.send('enabling breaker mode works');
		//	code to enable device
});

api_router.get('/disable_breaker_operating_mode', function(req, res) {
		console.log("disabling breaker mode");
		breaker_mode = "disabled";
		res.send('disabling breaker mode API works');
		//	code to disable device
});

api_router.get('/read_operating_mode_status', function(req, res) {
		console.log("sending breaker mode status");
		res.send(breaker_mode);
		//	code to enable device
});


//Piezo API Controls
api_router.get('/clamp_piezos', function(req, res) {
		console.log("clamping piezos")
		piezo_status = "clamped"
		res.send('clamp piezos API works');
		//	code to clamp piezos
});

api_router.get('/unclamp_piezos', function(req, res) {
		console.log("unclamping piezos")
		piezo_status = "unclamped"
		res.send('unclamp piezos API works');
		//	code to unclamp piezos
});

api_router.get('/piezo_status', function(req, res) {
		console.log("reading piezo status")
		res.send(piezo_status);
		//	code to enable device
});


api_router.get('/apply_power_test_circuit', function(req, res) {
		console.log("applying power to test circuit")
		test_circuit_status = "powered"
		res.send('Apply Power Test Circuit API works');
		//	code to enable device
});

api_router.get('/remove_power_test_circuit', function(req, res) {
		console.log("removing power from test circuit")
		test_circuit_status = "unpowered"
		res.send('Remove Power Test Circuit API works');
		//	code to enable device
});

api_router.get('/test_circuit_status', function(req, res) {
		//	returns status of test circuit (check control relay status)
		res.send(test_circuit_status);
});




api_router.get('/connect_dummy_load', function(req, res) {
		console.log("connecting dummy load")
		test_circuit_status = "connected"
		res.send('Dummy Load Connect API works');
});

api_router.get('/disconnecting_dummy_load', function(req, res) {
		console.log("disconnecting dummy load")
		test_circuit_status = "disconnected"
		res.send('Dummy Load Disconnect API works');

});

api_router.get('/dummy_load_status', function(req, res) {
		//	returns status of test circuit (check control relay status)
		res.send(test_circuit_status);
});


api_router.get('/adjust_ct_sensitivity/:current_level', function(req, res) {
		console.log("adjusting ct sensitivity")
		current_threshold = req.params.current_level
		res.send('Adjust CT Sensitivity API works');
		//	code to enable device
});

api_router.get('/ct_sensitivity_status', function(req, res) {
		console.log("returning ct sensitivity amperage level")
		res.send(current_threshold);
		//	code to enable device
});

api_router.get('/start_collecting_data_oscope', function(req, res) {
		console.log("collecting oscope data")
		oscope_status = "collecting"
		res.send('Oscope Start API works');
		fs.unlinkSync('front_end/js/bitscope_output.json');
		console.log('deleted data file')
		//code to configure and start bitscope
		//might need to bring in arguments from UI
});

api_router.get('/stop_collecting_data_oscope', function(req, res) {
		console.log("oscope data collection stopped")
		oscope_status = "not collecting"
		res.send('Oscope Stop API works');
		//code to configure and start bitscope

   		var file = 'front_end/js/bitscope_output.json'
   		//needs to collect data from bitscope and store in JSON format in this file.
		var obj = [{"date": "2011-10-10", "portfolio_value": 1000, "trade_action": "sell", "close_price": 230}, {"date": "2011-10-11", "portfolio_value": 60000, "trade_action": "buy", "close_price": 230}, {"date": "2011-10-12", "portfolio_value": 30000, "trade_action": "buy", "close_price": 230}, {"date": "2011-10-13", "portfolio_value": 10000, "trade_action": "buy", "close_price": 230}, {"date": "2011-10-14", "portfolio_value": 10000, "trade_action": "sell", "close_price": 230}, {"date": "2011-10-15", "portfolio_value": 10000, "trade_action": "sell", "close_price": 230}, {"date": "2011-10-16", "portfolio_value": 10000, "trade_action": "buy", "close_price": 230}, {"date": "2011-10-17", "portfolio_value": 10000, "trade_action": "sell", "close_price": 230}, {"date": "2011-10-18", "portfolio_value": 30000, "trade_action": "buy", "close_price": 230}]
 

		jsonfile.writeFileSync(file, obj)
		console.log('created data file')

		});


api_router.get('/oscope_status', function(req, res) {
		//	returns status of test circuit (check control relay status)
		res.send(oscope_status);
});

//add functions to collect and grab data from bitscope


app.use('/api', api_router);


// START THE SERVER
// ===============================
app.listen(port);
console.log('Magic happens on port ' + port);
