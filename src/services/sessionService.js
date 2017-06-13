import request from './request';

class SessionService {
  login(username, password) {
    return request.post(`/api/auth/login`, { username, password });
  }

  register(firstName, lastName, username, password) {
    return request.post(`/api/auth/register`, { firstName, lastName, username, password });
  }
}

sessionService = new SessionService();
export default sessionService;