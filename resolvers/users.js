const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
} =  require('graphql');

const mongoose = require('mongoose');

const {
	UserGraphQLType, 
	UserMongoose, 
	UserFields, 
	UserInputFields,
} = require('../models/user');


////////////////////////////////////
//            Queries             //
////////////////////////////////////

const users = {
    type: new GraphQLList(UserGraphQLType),
    args: {
        ids: {
            type: new GraphQLList(GraphQLID),
            description: `A List of user IDs`
        }
    },
    resolve: function(obj, args, context) {
        return new Promise((resolve, reject) => {
            let query = {}
            if (args.ids) {
                query = {_id: {$in: args.ids.map(id => new mongoose.Types.ObjectId(id))}}
            }
            UserMongoose.find(query).exec((err, users) => {
                if (err) reject(err)
                else resolve(users)
            })
        })
    }
};

const user = {
    type: UserGraphQLType,
    args: {
        id: {
            type: GraphQLID,
            description: `The ID of the user`
        },
        email: {
            type: GraphQLString,
            desciption: `The email of the user`
        }
    },
    resolve: function(obj, args, context) {
        return new Promise((resolve, reject) => {
            if (args.email) {
                UserMongoose.findOne({email: args.email}).exec((err, res) => {
                    if (err) reject(err);
                    else {
                        resolve(res)
                    }
                })
            } else {
                UserMongoose.findById(args.id).exec((err, res) => {
                    if (err) reject(err)
                    else {
                        resolve(res);
                    }
                })
            }
        })
    }
};


////////////////////////////////////
//            Mutations           //
////////////////////////////////////

const userCreate = {
    type: UserGraphQLType,
    description: `Adds a new user`,
    args: UserInputFields,
    resolve: (obj, args, context) => {
        return new Promise((resolve, reject) => {
            const newUser = new UserMongoose(args);
            newUser.save( (err, user) => {
                if (err) reject(err)
                else {
                    resolve(user);
                }
            })
        })
    }
};

const userUpdate = {
    type: UserGraphQLType,
    desciption: `Updates a user`,
    args: Object.assign(
            {}, 
            UserInputFields
    ),
    resolve: (obj, args, context) => {
        return new Promise((resolve, reject) => {
            UserMongoose.findByIdAndUpdate(args.id, args, (err, user) => {
                if (err) reject(err)
                else {
                    resolve(user)
                }
            })
        })
    }
};

const userRemove = {
    type: UserGraphQLType,
    desciption: `Removes user of the provided email and/or ID`,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            desciption: `The ID of the user`
        }
    },
    resolve: (obj, args, context) => {
        return new Promise((resolve, reject) => {
            UserMongoose.findByIdAndRemove(args.id, (err, user) => {
                if (err) reject(err)
                else {
                    resolve(user)
                }
            })
        })
    }
}

module.exports = {
    user,
    users,
    userCreate,
    userUpdate,
    userRemove,
};