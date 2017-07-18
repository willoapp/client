import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';
import fontSizes from '../assets/styles/fontSizes';
export default class ProfileHeader extends Component {
    constructor(props) {
        super(props);
    }
    fullName(user) {
        if (user)
            return `${user.firstName} ${user.lastName}`;
        return '';
    }
    render() {
        const { user } = this.props;
        return (React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center', padding: spacing.normal } },
            React.createElement(Avatar, { size: 75, changeable: true, src: user.photoURL, onChange: () => this.props.onChangeAvatar() }),
            React.createElement(View, { style: { marginLeft: spacing.xsmall } },
                React.createElement(Text, { style: { color: colors.slate, fontWeight: 'bold' } }, this.fullName(user)),
                React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center' } }, user && user.birthDate ?
                    React.createElement(View, null,
                        React.createElement(Icon, { name: "gift", style: { fontSize: fontSizes.small, marginRight: spacing.xxsmall, color: colors.gray } }),
                        React.createElement(Text, { style: { color: colors.gray } }, user.birthDate)) : null)),
            React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                React.createElement(TouchableOpacity, { style: styles.editProfileButton, onPress: () => this.props.onEditPress() },
                    React.createElement(Text, { style: { color: colors.blue } }, "Edit Profile")))));
    }
}
const styles = StyleSheet.create({
    editProfileButton: {
        paddingLeft: spacing.large,
        paddingRight: spacing.large,
        paddingTop: spacing.xxsmall,
        paddingBottom: spacing.xxsmall,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.blue
    }
});
//# sourceMappingURL=ProfileHeader.js.map