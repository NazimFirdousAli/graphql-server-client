const { ApolloServer, gql, ApolloError } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        //first student is from query and after the arrow function the student comes from the hardcode data
        // we can write business logic here
        // students: () => students,
        students: async() =>{
            return await prisma.student.findMany();
        }  
    },
    Mutation: {
        addStudent: async (root, data, context, info) => {
            const isStudentEmail = await prisma.student.findUnique({ where: { email: data.email }});
            if (isStudentEmail) throw new Error('This email has already been taken by someone else...')
            const student = await prisma.student.create({
                data
            })
            return student

        },
        updateStudent: async (root, { id, ...data }, context, info) => {
            const isUserDuplicate = await prisma.student.findUnique({ where: { email: data.email } });
            if (isUserDuplicate && isUserDuplicate.id !== id) {
                throw new Error('Email has already been taken by someone else Please take another');
            }
            const student = await prisma.student.update({
                where:{id},
                data
            })
            return student
        },
        deleteStudent: async (root, {id}, context, info) => {
            const student = await prisma.student.delete({
                where:{id}
            })
            return "Value Deleted"

        }


    }
};


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`


  type Student {
    id: Int!
  name: String!
  email: String!
  age: Int!
  }
#   input inputStudent {
#     name: String!
#     email: String!
#     age: Int!
#   }

  type Query {
    students: [Student]
  }

  type Mutation {
    # addStudent is just name
    addStudent(name:String!,email:String!,age:Int!): Student!
    updateStudent(id: Int! ,name: String!, email: String! ,age: Int! ): Student!
    deleteStudent(id: Int!): String!
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
