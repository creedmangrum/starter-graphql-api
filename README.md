# README #

clone this repository

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
	
let me know if this works.
		

### What is this repository for? ###

* This is the api for all wyroo apps.
* 0.0.0
