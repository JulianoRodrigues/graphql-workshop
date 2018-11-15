const { ApolloServer, gql } = require("apollo-server");

const Frameworks = [
  {
    id: 1,
    title: "React",
    git: "https://github.com/facebook/react/",
    stars: 104170
  },
  {
    id: 2,
    title: "Vue",
    git: "https://github.com/vuejs/vue/",
    stars: 104483
  }
];

const typeDefs = gql`
  type Framework {
    id: ID!,
    title: String,
    git: String,
    stars: Int
  }
  type Query {
    allFrameworks: [Framework]
    framework (id: ID): Framework
  }
`

const resolvers = {
  Query: {
    allFrameworks: () => Frameworks,
    framework: (_, { id }) => {
      return Frameworks.find(framework => framework.id === parseInt(id, 10));
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(data => console.log(data.url));
