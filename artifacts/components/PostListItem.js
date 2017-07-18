import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../assets/styles/colors';
import fontSizes from '../assets/styles/fontSizes';
import spacing from '../assets/styles/spacing';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from './Avatar';
import LoveCount from './LoveCount';
import { fromNow } from '../utils/moment';
export default class PostListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { post, lovedByCurrentUser, onToggleLove } = this.props;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.alignRowWithPadding },
                React.createElement(View, { style: styles.leftColumn },
                    React.createElement(Avatar, { size: 45, src: post.user.photoURL })),
                React.createElement(View, { style: { flex: 1 } },
                    React.createElement(View, { style: styles.header },
                        React.createElement(Text, { style: styles.user }, post.user.firstName),
                        React.createElement(Text, { style: styles.time }, fromNow(post.createdAt))),
                    React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center' } },
                        React.createElement(Text, { style: { flex: 1, width: 0 } }, post.content)))),
            React.createElement(View, null),
            React.createElement(View, { style: [styles.alignRowWithPadding, { marginTop: spacing.xsmall }] },
                React.createElement(View, { style: styles.leftColumn },
                    React.createElement(Icon, { name: lovedByCurrentUser ? 'heart' : 'heart-o', style: [{ fontSize: 20 }, { color: lovedByCurrentUser ? colors.seaside : colors.darkgray }], onPress: () => onToggleLove(!lovedByCurrentUser) })),
                React.createElement(View, { style: { flex: 1 } },
                    React.createElement(LoveCount, { loveCount: post.loveCount, lovedByCurrentUser: lovedByCurrentUser })))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: spacing.xsmall,
        paddingBottom: spacing.xsmall,
    },
    alignRowWithPadding: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: spacing.small,
        paddingRight: spacing.small,
    },
    leftColumn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        marginRight: spacing.xsmall,
    },
    alert: {
        fontSize: 6,
        color: colors.brick
    },
    header: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    user: {
        fontWeight: 'bold',
        color: colors.slate,
    },
    time: {
        fontSize: fontSizes.xsmall,
        color: colors.gray,
    }
});
//# sourceMappingURL=PostListItem.js.map