import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class HeaderNav extends Component {
    render() {
        return (React.createElement(View, { style: styles.wrapper },
            React.createElement(View, { style: styles.mainContainer },
                React.createElement(View, { style: { flex: 1 } }),
                React.createElement(View, { style: { flex: 1, alignItems: 'center' } },
                    React.createElement(View, { style: styles.logoContainer },
                        React.createElement(Text, { style: styles.logo }, "Willo"))),
                this.props.noButtons ? null : React.createElement(View, { style: { flex: 1, alignItems: 'flex-end' } },
                    React.createElement(TouchableOpacity, { onPress: () => this.props.onProfilePress() },
                        React.createElement(Icon, { name: "user", style: styles.icon }))))));
    }
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.hairlinegray,
        paddingTop: 15,
        height: 65,
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        height: 40,
        overflow: 'hidden'
    },
    logo: {
        marginLeft: 10,
        fontFamily: 'Sacramento-Regular',
        fontSize: 36,
        color: colors.seaside
    },
    icon: {
        fontSize: 24,
        color: colors.seaside,
        marginRight: spacing.small
    }
});
//# sourceMappingURL=HeaderNav.js.map