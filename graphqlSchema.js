const {
  GraphQLObjectType,
  GraphQLSchema,
} =  require('graphql');

const {
	user,
	users,
	userCreate,
	userRemove,
	userUpdate,
} = require('./resolvers/users');

let query = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		users,
		user,
	}   
});

let mutation = new GraphQLObjectType({
	name: 'RootMutationType',
	fields: {
		userCreate,
		userUpdate,
		userRemove,
	}
})

let schema = new GraphQLSchema({
  query,
  mutation
});

module.exports = schema;