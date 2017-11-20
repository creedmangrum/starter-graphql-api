const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {UserMongoose} = require('./models/user');

const {graphql} = require('graphql');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const graphqlHTTP = require('express-graphql');

const graphqlSchema = require('./graphqlSchema');

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('*', cors());

app.use(function(req ,res ,next){
	
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Request-Headers", "*");
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
	res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.set("Access-Control-Allow-Credentials", "true");

	next();
});

const db = require('./db');

var graphqlParser = bodyParser.text({ type: 'application/graphql' })

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true
}));


db.connect(function(err) {
	if (err) {
		console.log('Unable to connect to Mongo.')
		process.exit(1)
	} else {
		// Initialize the app.
		const server = app.listen(process.env.PORT || 8080, function () {
			const port = server.address().port;
			console.log("App now running on port", port);
		});
	}
})
