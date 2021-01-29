const { ApolloServer, gql, ApolloError } = require('apollo-server');
let ids = 4;

const students =
    [
        {
            "id": '1',
            "name": "Nazim",
            "email": "abc@gmail.com",
            "age": 22
        },

        {
            "id": '2',
            "name": "Ali",
            "email": "def@gmail.com",
            "age": 22
        },

        {
            "id": '3',
            "name": "Khan",
            "email": "ghi@gmail.com",
            "age": 22
        },

        {
            "id": '4',
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
    Mutation: {

        addStudent: (root, args, context, info) => {
            console.log(args.input)
            ids = ids + 1
            students.push(
                {

                    id: ids,
                    name: args.input.name,
                    email: args.input.email,
                    age: args.input.age
                }
            )
            return {
                id: ids,
                name: args.input.name,
                email: args.input.email,
                age: args.input.age
            }

        },
        updateStudent: (root, { id, input }, context, info) => {
            // check whether the payload is exists
            const ind = students.findIndex((st) => st.id == id);
            if (ind === -1) throw new ApolloError('Student not found...')

            // validate the payload


            // mutate the payload
            students[ind] = {
                ...students[ind],
                ...input
            }

            // return the predefined response
            return students[ind];
        },
        deleteStudent: (root, args, context, info) => {
            const value = students.findIndex((st) => st.id == args.id);
            {
                students.splice(value, 1);
            }
            return "Value Deleted"

        }


    }
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
  input inputStudent {
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    students: [Student]
  }

  type Mutation {
    # addStudent is just name
    addStudent(input: inputStudent!): Student!
    updateStudent(id: ID!, input: inputStudent!): Student!
    deleteStudent(id: ID!): String!
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
