# README #

This is a simple Express Server that has a basic GraphQL API and Mongoose setup to interface with MongoDB.

## Setup ##

clone this repository

you'll have to update `db.js` to point to your mongodb address. 

	cd path-to-repo
        npm i
	npm run start
	
let me know if you run into any errors starting there. you will likely get some console warnings with regards to mongoose and mongo, but you should ultimately see a message saying "we're connected"

you can navigate to `localhost:8080/graphql` and you should see a GraphIQL interface for interacting with the GQL api. 

get users

    {
        users {
    		id
    		first_name
    		last_name
   			email
  		}
	}
	
create a user

	mutation {
		userCreate (
			first_name: "FIRST",
			last_name: "LAST",
			email: "EMAIL@EMAIL.com"
		) {
			id
			first_name
			last_name
			email
		}
	}
	
let me know if this works or doesn't work. happy to help.
