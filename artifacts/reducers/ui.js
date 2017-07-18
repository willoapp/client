export const initialState = {};
export default reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        // react-redux-firebase handles these sorts of things through isLoaded, isEmpty
        // case types.SET_ACTIVITY_LOADING:
        //   return Object.assign({}, state, {
        //     activityLoading: action.payload
        //   })
        default:
            return state;
    }
};
//# sourceMappingURL=ui.js.map