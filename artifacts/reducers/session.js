import { types } from '../actions/sessionActions';
export const initialState = {
    userLoaded: false,
    user: null,
    loginLoading: false,
};
export default reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.payload
            });
        case types.SET_USER:
            return Object.assign({}, state, {
                user: action.payload,
                userLoaded: true,
            });
        case types.SET_LOGIN_LOADING:
            return Object.assign({}, state, {
                loginLoading: action.payload
            });
        default:
            return state;
    }
};
//# sourceMappingURL=session.js.map