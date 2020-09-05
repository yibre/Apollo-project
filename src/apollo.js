import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    url: "http://localhost:4000",
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, {cache}) => {
                cache.writeData({
                    id: `Movie:${id}`,
                    data: {
                        isLiked: true
                    }
                });
            }

        }
    }
});

export default client;