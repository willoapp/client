import request from './request';

class GraphqlService {
  query(state, query) {
    return dataPromise(request.get(`/graphql?query=${query}`, null, {"Authorization": state.sessionState.token}));
  }

  mutate(state, query, variables) {
    const body = { query, variables };
    return dataPromise(request.post(`/graphql`, body, {"Authorization": state.sessionState.token}));
  }
}

function dataPromise(res) {
  return new Promise((resolve, reject) => {
    res.then(r => r.json())
      .then(json => json.data).then(data => {
        if (data) {
          resolve(data);
        } else {
          reject(res);
        }
      })
      .catch(error => console.error(error));
  });
}

graphqlService = new GraphqlService();
export default graphqlService;