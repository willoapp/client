import request from './request';

export class GraphqlService {
  get(query) {
    return dataPromise(request.get(`/graphql?query=${query}`));
  }

  post(query, variables) {
    return dataPromise(request.post('/graphql', { query, variables }));
  }
}

function dataPromise(res) {
  return new Promise((resolve, reject) => {
    res.then(r => r.json()).then(json => json.data).then(data => {
      if (data) {
        resolve(data);
      } else {
        reject(res);
      }
    });
  });
}