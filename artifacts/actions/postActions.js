function addPost(firebase, post) {
    const rootRef = firebase.ref();
    const newPostRef = firebase.ref('posts').push();
    const updateObj = {
        [`posts/${newPostRef.key}`]: post,
        [`userPosts/${post.user.id}/${newPostRef.key}`]: true
    };
    return rootRef.update(updateObj);
}
function lovePost(firebase, post, user) {
    const rootRef = firebase.ref();
    const newLoveCount = (post.loveCount || 0) + 1;
    const updateObj = {
        [`posts/${post.id}/loveCount`]: newLoveCount,
        [`posts/${post.id}/postLoves/${user.id}`]: user,
        [`userPostLoves/${user.id}/${post.id}`]: true,
    };
    return rootRef.update(updateObj);
}
function unlovePost(firebase, post, user) {
    const rootRef = firebase.ref();
    let newLoveCount = (post.loveCount || 0) - 1;
    newLoveCount = newLoveCount < 0 ? 0 : newLoveCount;
    const updateObj = {
        [`posts/${post.id}/loveCount`]: newLoveCount,
        [`posts/${post.id}/postLoves/${user.id}`]: null,
        [`userPostLoves/${user.id}/${post.id}`]: null,
    };
    return rootRef.update(updateObj);
}
export const postActions = {
    addPost,
    lovePost,
    unlovePost,
};
export default postActions;
//# sourceMappingURL=postActions.js.map