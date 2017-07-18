import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import colors from '../../assets/styles/colors';
import spacing from '../../assets/styles/spacing';
import fontSizes from '../../assets/styles/fontSizes';
import postActions from '../../actions/postActions';
import PropTypes from 'prop-types';
import { currentUserWithId } from '../../utils';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, } from 'react-redux-firebase';
class AddActivityPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.navigation.setParams({ addPost: this.addPost, text: '', user: this.props.currentUser, firebase: this.props.firebase });
    }
    addPost(firebase, text, user) {
        if (text.length > 0) {
            const post = {
                content: text,
                user: user,
                createdAt: new Date().toString(),
                loveCount: 0
            };
            return postActions.addPost(firebase, post);
        }
        else {
            Alert.alert(`Your post can't be empty`);
        }
    }
    render() {
        return (React.createElement(TouchableWithoutFeedback, { onPress: Keyboard.dismiss },
            React.createElement(View, { style: styles.container },
                React.createElement(TextInput, { autoFocus: true, style: { marginTop: spacing.normal, padding: spacing.normal, flex: 1, fontSize: fontSizes.normal }, onChangeText: (text) => this.props.navigation.setParams({ text }), value: this.props.navigation.state.params.text, placeholder: "Update your family with your status...", multiline: true }))));
    }
}
AddActivityPage.navigationOptions = navigator => {
    const { addPost, firebase, user, text } = navigator.navigation.state.params;
    return {
        title: 'Update Activity',
        headerLeft: React.createElement(Text, { style: { color: colors.slate, marginLeft: spacing.small, fontSize: fontSizes.normal }, onPress: () => { navigator.navigation.goBack(); } }, "Cancel"),
        headerRight: (React.createElement(Text, { style: { color: colors.slate, marginRight: spacing.small, fontSize: fontSizes.normal, fontWeight: 'bold' }, onPress: () => addPost(firebase, text, user).then(_ => navigator.navigation.goBack()) }, "Post")),
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
    };
},
    AddActivityPage.propTypes = {
        currentUser: PropTypes.object
    };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
});
export default compose(firebaseConnect([
    'users'
]), connect(({ firebase: { auth, data: { users } } }) => ({
    currentUser: currentUserWithId(users, auth)
})))(AddActivityPage);
//# sourceMappingURL=AddActivityPage.js.map