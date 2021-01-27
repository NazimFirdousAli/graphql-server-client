const { ApolloServer, gql } = require('apollo-server');

const students =
    [
        {
            "id":1,
            "name": "Nazim",
            "email": "abc@gmail.com",
            "age": 22
        },

        {
            "id":2,
            "name": "Ali",
            "email": "def@gmail.com",
            "age": 22
        },

        {
            "id":3,
            "name": "Khan",
            "email": "ghi@gmail.com",
            "age": 22
        },
        
        {
            "id":4,
            "name": "Jan",
            "email": "jkl@gmail.com",
            "age": 20
        }
    ]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        //first student is from query and after the arrow function the student comes from the hardcode data
        // we can write business logic here
        students: () => students,
    },
};


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`


  type Student {
    id: ID
    name: String
    email: String
    age: Int
  }

  type Query {
    students: [Student]
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
