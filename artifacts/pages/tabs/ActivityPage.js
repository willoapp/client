import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, } from 'react-native';
import Avatar from '../../components/Avatar';
import colors from '../../assets/styles/colors';
import spacing from '../../assets/styles/spacing';
import fontSizes from '../../assets/styles/fontSizes';
import { currentUserWithId, collectionToArrayWithIds } from '../../utils';
import Spinner from 'react-native-spinkit';
import postActions from '../../actions/postActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty, } from 'react-redux-firebase';
import PostListItem from '../../components/PostListItem';
class ActivityPage extends Component {
    constructor(props) {
        super(props);
    }
    composePost(user) {
        this.props.navigation.navigate('AddActivityPage', { user });
    }
    _onPressItem(post) { }
    componentWillMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate('LoginNavigator');
            }
        });
    }
    toggleLove(post, currentUser, val) {
        if (val) {
            postActions.lovePost(this.props.firebase, post, currentUser);
        }
        else {
            postActions.unlovePost(this.props.firebase, post, currentUser);
        }
    }
    lovedByUser(post, currentUser) {
        if (currentUser && post && post.postLoves)
            return Object.keys(post.postLoves).includes(currentUser.id);
    }
    render() {
        const { posts, currentUser, uiState, uiActions } = this.props;
        const loaded = isLoaded(posts);
        const empty = isEmpty(posts);
        let data = [];
        if (posts) {
            data = collectionToArrayWithIds(posts).reverse();
            data.unshift({ id: 1 });
        }
        return (React.createElement(View, { style: { flex: 1 } }, !loaded ?
            React.createElement(View, { style: [styles.container, { justifyContent: 'center', alignItems: 'center' }] },
                React.createElement(Spinner, { isVisible: !loaded, size: 35, type: 'ThreeBounce', color: colors.gray }))
            :
                React.createElement(View, { style: styles.container },
                    React.createElement(FlatList, { data: data, keyExtractor: item => item.id, renderItem: ({ item, index }) => {
                            if (index === 0)
                                return (React.createElement(View, { style: [styles.shareContainer] },
                                    React.createElement(TouchableOpacity, { style: styles.textInputMock, onPress: () => this.composePost(currentUser) },
                                        React.createElement(Avatar, { size: 45, src: currentUser && currentUser.photoURL }),
                                        React.createElement(Text, { style: styles.placeholder }, "Share something with your family..."))));
                            else
                                return React.createElement(PostListItem, { post: item, lovedByCurrentUser: this.lovedByUser(item, currentUser), onToggleLove: (val) => this.toggleLove(item, currentUser, val) });
                        }, onPressItem: this._onPressItem, ItemSeparatorComponent: () => React.createElement(View, { style: styles.divider }) }))));
    }
}
ActivityPage.propTypes = {
    posts: PropTypes.object,
    firebase: PropTypes.object,
    currentUser: PropTypes.object,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bggray,
    },
    // Create a post
    shareContainer: {
        backgroundColor: colors.white,
        height: 60,
    },
    textInputMock: {
        marginLeft: spacing.small,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    placeholder: {
        marginLeft: spacing.xsmall,
        fontSize: fontSizes.small,
        color: colors.gray,
        fontStyle: 'italic'
    },
    divider: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.gray
    },
});
export default compose(firebaseConnect([
    'posts',
    'users'
]), connect(({ firebase: { auth, data }, uiState }) => ({
    posts: data.posts,
    currentUser: currentUserWithId(data.users, auth),
    uiState
})))(ActivityPage);
//# sourceMappingURL=ActivityPage.js.map