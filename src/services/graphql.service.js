import request from './request';

export class GraphqlService {
  query(query) {
    return dataPromise(request.get(`/graphql?query=${query}`));
  }

  mutate(query, variables) {
    const body = { query, variables };
    console.log(body);
    return dataPromise(request.post(`/graphql`, body));
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