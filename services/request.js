// const xsrfTag = document.querySelector('meta[name=csrf-token]');
// const xsrfToken = xsrfTag && xsrfTag.getAttribute('content'); // from rails

// type Headers = { [key: string]: string };
// type RequestOps = {
//   headers?: Headers,
//   method?: string,
//   body?: any
// };

const baseFetch = (url, ops) => {
  let headers = ops.headers;
  let body = ops.body;
  const cors = url.startsWith('http') && !url.includes(window.location.host);
  if (!cors) headers['X-XSRF-TOKEN'] = xsrfToken;
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
    headers: new Headers(headers)
  });
  return new Promise((resolve, reject) => {
    fetchPromise.then(res => {
      res.text().then(text => {
        const bmRes = {
          status: res.status,
          statusText: res.statusText,
          body: text
        };
        if (text && res.headers.get('Content-Type').includes('application/json')) {
          bmRes.body = JSON.parse(text);
        }
        if (res.ok) {
          resolve(bmRes.body);
        } else {
          reject(bmRes);
        }
      });
    });
  });
};

const request = {
  get: function(url, query = null, headers = {}) {
    let fullUrl = url;
    if (query) fullUrl = url + '?' + query;
    return baseFetch(fullUrl, {
      headers
    });
  },
  head: function(url, headers = {}) {
    return baseFetch(url, {
      method: 'HEAD',
      headers
    });
  },
  post: function(url, body = {}, headers = {}) {
    return baseFetch(url, {
      method: 'POST',
      body,
      headers
    });
  },
  put: function(url, body = {}, headers = {}) {
    return baseFetch(url, {
      method: 'PUT',
      body,
      headers
    });
  },
  patch: function(url, body = {}, headers = {}) {
    return baseFetch(url, {
      method: 'PATCH',
      body,
      headers
    });
  },
  del: function(url, headers = {}) {
    return baseFetch(url, {
      method: 'DELETE',
      headers
    });
  }
};

export default request;
export { request };
