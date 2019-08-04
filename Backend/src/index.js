const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')
//import resolvers
const Query = require('../resolvers/Query')
const Mutation = require('../resolvers/Mutation')

//connect with database
mongoose.connect('mongodb+srv://ygshspcry:Csymw7AXzTKFOZRb@cluster0-zaq2w.mongodb.net/teacher-portal?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
    console.log('database connected');
})

// define and assign resolvers
const resolvers = {
    Query,
    Mutation,

}

// define graphQLserver
const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
        }
    },
})

//start server
server.start(() => console.log(`Server is running on http://localhost:4000`))