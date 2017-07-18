import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, Text, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';
import fontSizes from '../assets/styles/fontSizes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessionActions';
import uiActions from '../actions/uiActions';
let { height, width } = Dimensions.get('window');
class EmailConfirmationCodePage extends Component {
    constructor(props) {
        super(props);
        this.state = { verificationCode: '' };
    }
    validateVerificationCode(email, verificationCode) {
        this.props.sessionActions.validateVerificationCode(email, verificationCode);
    }
    verificationCodeLongEnough() {
        return this.state.verificationCode.length === 6;
    }
    render() {
        return (React.createElement(TouchableWithoutFeedback, { onPress: Keyboard.dismiss },
            React.createElement(View, { style: styles.container },
                React.createElement(View, null,
                    React.createElement(Text, { style: styles.logo }, "Willow")),
                React.createElement(Text, { style: { color: colors.slate, fontSize: fontSizes.xlarge, marginBottom: spacing.normal, textAlign: 'center' } },
                    "Please enter the 6 digit code sent to",
                    React.createElement(Text, { style: { color: colors.white } },
                        " ",
                        this.props.state.sessionState.verificationEmail)),
                React.createElement(View, { style: styles.inputContainer },
                    React.createElement(View, { style: styles.innerInputContainer },
                        React.createElement(View, { style: [styles.inputWrapper] },
                            React.createElement(TextInput, { style: styles.input, maxLength: 6, placeholder: "- - - - - -", returnKeyType: "next", keyboardType: "numeric", autoCapitalize: "none", autoCorrect: false, onChangeText: (verificationCode) => this.setState({ verificationCode }), onSubmitEditing: () => this.validateVerificationCode(this.props.state.sessionState.verificationEmail, this.state.verificationCode) })))),
                React.createElement(View, { style: { flex: 0, flexDirection: 'row' } },
                    React.createElement(View, { style: { marginRight: spacing.xlarge } },
                        React.createElement(TouchableOpacity, { onPress: () => this.props.uiActions.setPage('forgotPassword') },
                            React.createElement(Text, { style: styles.loginButton }, "Back"))),
                    React.createElement(TouchableOpacity, { disabled: !this.verificationCodeLongEnough(), onPress: () => this.validateVerificationCode(this.props.state.sessionState.verificationEmail, this.state.verificationCode) },
                        React.createElement(Text, { style: [styles.loginButton, { color: this.verificationCodeLongEnough() ? colors.white : colors.slate }] }, "Next"))))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.seaside,
    },
    logo: {
        marginTop: spacing.xlarge,
        marginBottom: spacing.small,
        color: colors.white,
        fontSize: 60,
        fontFamily: 'Sacramento'
    },
    whiteText: {
        color: colors.white
    },
    inputContainer: {
        height: 50,
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
        textAlign: 'center',
        alignSelf: 'center'
    },
    icon: {
        fontSize: fontSizes.xxlarge,
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
export default connect(state => ({
    state
}), dispatch => ({
    uiActions: bindActionCreators(uiActions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch)
}))(EmailConfirmationCodePage);
//# sourceMappingURL=EmailConfirmationCodePage.js.map