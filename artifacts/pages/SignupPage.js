import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';
import fontSizes from '../assets/styles/fontSizes';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
let { height, width } = Dimensions.get('window');
class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', email: '', password: '', pageType: 'signup' };
    }
    register(firstName, lastName, email, password) {
        if (!firstName) {
            Alert.alert('Please enter your first name');
        }
        else if (!lastName) {
            Alert.alert('Please enter a your last name');
        }
        else {
            this.props.firebase.auth().createUserWithEmailAndPassword(email, password).then(auth => {
                this.props.firebase.ref('users').child(auth.uid).set({ firstName, lastName, email }); // create user data from auth uid
                this.props.navigation.dispatch(NavigationActions.back());
            }).catch(error => Alert.alert(error));
        }
    }
    login(email, password) {
        this.props.firebase.auth().signInWithEmailAndPassword(email, password).then(_ => {
            this.props.navigation.dispatch(NavigationActions.back());
        }).catch(error => Alert.alert(error));
    }
    render() {
        const login = this.state.pageType === 'login';
        const LoginButtons = (React.createElement(View, { style: styles.container },
            React.createElement(TouchableOpacity, { style: { marginBottom: spacing.small }, onPress: () => this.login(this.state.email, this.state.password) },
                React.createElement(Text, { style: [styles.loginButton] }, "Log in")),
            React.createElement(View, { style: { flex: 0, flexDirection: 'row', alignItems: 'center' } },
                React.createElement(View, { style: { marginRight: spacing.xxsmall } },
                    React.createElement(Text, { style: { color: colors.slate, fontSize: fontSizes.normal } }, "New to Willow?")),
                React.createElement(View, null,
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ pageType: 'signup' }) },
                        React.createElement(Text, { style: { color: colors.white, fontSize: fontSizes.normal } }, "Sign up")))),
            React.createElement(View, { style: { marginTop: spacing.xsmall, flex: 0, flexDirection: 'row', alignItems: 'center' } },
                React.createElement(TouchableOpacity, { onPress: () => this.props.uiActions.setPage('forgotPassword') },
                    React.createElement(Text, { style: { color: colors.white, fontSize: fontSizes.normal } }, "Forgot Password?")))));
        const SignupButtons = (React.createElement(View, { style: styles.container },
            React.createElement(TouchableOpacity, { style: { marginBottom: spacing.small }, onPress: () => this.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password) },
                React.createElement(Text, { style: [styles.loginButton] }, "Sign up")),
            React.createElement(View, { style: { flex: 0, flexDirection: 'row', alignItems: 'center' } },
                React.createElement(View, { style: { marginRight: spacing.xxsmall } },
                    React.createElement(Text, { style: { color: colors.slate, fontSize: fontSizes.normal } }, "Already have an account?")),
                React.createElement(View, null,
                    React.createElement(TouchableOpacity, { onPress: () => this.setState({ pageType: 'login' }) },
                        React.createElement(Text, { style: { color: colors.white, fontSize: fontSizes.normal } }, "Log in"))))));
        return (React.createElement(TouchableWithoutFeedback, { onPress: Keyboard.dismiss },
            React.createElement(View, { style: styles.container },
                React.createElement(View, null,
                    React.createElement(Text, { style: styles.logo }, "Willo")),
                React.createElement(View, { style: [styles.inputContainer, { height: login ? 100 : 200 }] },
                    React.createElement(View, { style: styles.innerInputContainer },
                        login ? null : React.createElement(View, { style: [styles.inputWrapper, { borderBottomColor: colors.hairlinegray, borderBottomWidth: StyleSheet.hairlineWidth }] },
                            React.createElement(Icon, { name: "user", style: [styles.icon] }),
                            React.createElement(TextInput, { style: styles.input, placeholder: "First Name", returnKeyType: "next", autoCapitalize: "words", autoCorrect: false, onChangeText: (firstName) => this.setState({ firstName }), onSubmitEditing: (event) => {
                                    this.refs.SecondInput.focus();
                                } })),
                        login ? null : React.createElement(View, { style: [styles.inputWrapper, { borderBottomColor: colors.hairlinegray, borderBottomWidth: StyleSheet.hairlineWidth }] },
                            React.createElement(Icon, { name: "user", style: [styles.icon, { fontSize: 21.5 }] }),
                            React.createElement(TextInput, { ref: 'SecondInput', style: [styles.borderTop, styles.input], placeholder: "Last Name", returnKeyType: "next", autoCapitalize: "words", autoCorrect: false, onChangeText: (lastName) => this.setState({ lastName }), onSubmitEditing: (event) => {
                                    this.refs.ThirdInput.focus();
                                } })),
                        React.createElement(View, { style: [styles.inputWrapper, { borderBottomColor: colors.hairlinegray, borderBottomWidth: StyleSheet.hairlineWidth }] },
                            React.createElement(Icon, { name: "envelope", style: [styles.icon, { fontSize: 18 }] }),
                            React.createElement(TextInput, { ref: 'ThirdInput', style: [styles.borderTop, styles.input], placeholder: "Email", autoCapitalize: "none", autoCorrect: false, returnKeyType: "next", keyboardType: "email-address", onChangeText: (email) => this.setState({ email }), onSubmitEditing: (event) => {
                                    this.refs.FourthInput.focus();
                                } })),
                        React.createElement(View, { style: styles.inputWrapper },
                            React.createElement(Icon, { name: "lock", style: [styles.icon, { fontSize: 25, marginRight: 2 }] }),
                            React.createElement(TextInput, { ref: 'FourthInput', style: [styles.borderTop, styles.input], placeholder: "Password", secureTextEntry: true, autoCorrect: false, returnKeyType: "done", onChangeText: (password) => this.setState({ password }), onSubmitEditing: (event) => {
                                    this.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
                                } })))),
                login ? LoginButtons : SignupButtons)));
    }
}
SignupPage.propTypes = {
    firebase: PropTypes.object,
    auth: PropTypes.object,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.seaside,
    },
    logo: {
        marginTop: spacing.large,
        color: colors.white,
        fontSize: 60,
        fontFamily: 'Sacramento'
    },
    whiteText: {
        color: colors.white
    },
    inputContainer: {
        width: width - (spacing.normal * 2),
        marginBottom: spacing.normal,
        backgroundColor: colors.white,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.gray,
        borderRadius: 20,
    },
    innerInputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    inputWrapper: {
        marginLeft: spacing.normal,
        marginRight: spacing.normal,
        flex: 1,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        height: spacing.xlarge,
        marginLeft: spacing.xsmall,
        alignSelf: 'center'
    },
    icon: {
        fontSize: 20,
        alignSelf: 'center',
        // Padding to alleviate buggy side clipping
        paddingRight: spacing.xxsmall,
        paddingLeft: spacing.xxsmall,
        color: colors.gray
    },
    loginButton: {
        color: colors.white,
        fontSize: fontSizes.xlarge,
    }
});
export default compose(firebaseConnect([]), connect(({ firebase: { auth } }) => ({
    auth
})))(SignupPage);
//# sourceMappingURL=SignupPage.js.map