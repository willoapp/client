function updateUser(firebase, userId, updates) {
    const rootRef = firebase.ref();
    // Lookups
    const userPostsLookup = firebase.ref(`userPosts/${userId}`);
    const userPostLovesLookup = firebase.ref(`userPostLoves/${userId}`);
    // Update Object for Multipath atomic update
    let updateObj = {};
    // Update the user for each lookup
    userPostsLookup.once('value', snap => {
        snap.forEach(postSnap => {
            Object.keys(updates).forEach(updateKey => {
                updateObj[`posts/${postSnap.key}/user/${updateKey}`] = updates[updateKey];
            });
        });
    })
        .then(_ => {
        userPostLovesLookup.once('value', snap => {
            snap.forEach(postLoveSnap => {
                Object.keys(updates).forEach(updateKey => {
                    updateObj[`posts/${postLoveSnap.key}/postLoves/${userId}/${updateKey}`] = updates[updateKey];
                });
            });
        })
            .then(_ => {
            // Update the user directly as well
            Object.keys(updates).forEach(updateKey => {
                updateObj[`users/${userId}/${updateKey}`] = updates[updateKey];
            });
            return rootRef.update(updateObj);
        });
    });
}
const userActions = {
    updateUser
};
export default userActions;
//# sourceMappingURL=userActions.js.map