// const xsrfTag = document.querySelector('meta[name=csrf-token]');
// const xsrfToken = xsrfTag && xsrfTag.getAttribute('content'); // from rails

const production = false;

const baseFetch = (url, ops) => {
  let headers = ops.headers;
  let body = ops.body;
  const cors = url.startsWith('http')
  // if (!cors) headers['X-XSRF-TOKEN'] = xsrfToken;
  if (body && typeof(body) !== 'string' && body.constructor !== ArrayBuffer) {
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }
  const fetchPromise = fetch(url, {
    mode: cors ? 'cors' : 'same-origin',
    credentials: cors ? 'omit' : 'include',
    method: ops.method || 'GET',
    body,
    headers: new Headers(headers) // from fetch api
  });
  return new Promise((resolve, reject) => {
    fetchPromise.then(res => {
      if (res.ok) {
        resolve(res)
      } else {
        reject(res);
      }
    }).catch(err => reject(err));
  });
};

function full(url) {
  return production ? "" + url : "http://127.0.0.1:3000" + url;
}

const request = {
  get: (url, query = null, headers = {}) => {
    if (query) url = url + '?' + query;
    return baseFetch(full(url), {
      headers
    });
  },
  head: (url, headers = {}) => {
    return baseFetch(full(url), {
      method: 'HEAD',
      headers
    });
  },
  post: (url, body = {}, headers = {}) => {
    return baseFetch(full(url), {
      method: 'POST',
      body,
      headers
    });
  },
  put: (url, body = {}, headers = {}) => {
    return baseFetch(full(url), {
      method: 'PUT',
      body,
      headers
    });
  },
  patch: (url, body = {}, headers = {}) => {
    return baseFetch(full(url), {
      method: 'PATCH',
      body,
      headers
    });
  },
  del: (url, headers = {}) => {
    return baseFetch(full(url), {
      method: 'DELETE',
      headers
    });
  }
};
export default request;