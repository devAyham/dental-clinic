import { GraphQLError } from 'graphql';

export const graphQLWrapper = (fn:Function) => {
    return async () => {
      try {
        return await fn();
      } catch (err) {
        
        throw new GraphQLError(err.message, {
          extensions: {
            code: err.code,
          },
          path:err.path
        });
      }
    };
}