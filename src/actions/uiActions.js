export const types = {
  SET_PAGE: "SET_PAGE",
}

function setPage(page) {
  return {
    type: types.SET_PAGE,
    payload: page
  };
}

const uiActions = {
  setPage
};
export default uiActions;