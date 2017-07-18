import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../assets/styles/colors';
import get from 'lodash-es/get';
function LC(props) {
    const { loveCount, lovedByCurrentUser } = props;
    // Box 1
    if (loveCount > 2) {
        if (lovedByCurrentUser) {
            return React.createElement(Text, { style: styles.text },
                "You and ",
                loveCount - 1,
                " love this");
        }
        else {
            return React.createElement(Text, { style: styles.text },
                loveCount,
                " people love this ");
        }
    }
    else if (loveCount === 2) {
        if (lovedByCurrentUser) {
            return React.createElement(Text, { style: styles.text }, "You and 1 other love this");
        }
        else {
            return React.createElement(Text, { style: styles.text }, "2 people love this");
        }
    }
    else if (loveCount === 1) {
        if (lovedByCurrentUser) {
            return React.createElement(Text, { style: styles.text }, "You love this");
        }
        else {
            return React.createElement(Text, { style: styles.text }, "1 person loves this");
        }
    }
    else {
        return React.createElement(Text, { style: styles.text }, "Be the first to love this");
    }
}
export default class LoveCount extends Component {
    constructor(props) {
        super(props);
    }
    loveCount(post) {
        return Object.keys(get(post, 'lovedBy', {})).length;
    }
    render() {
        const { loveCount, lovedByCurrentUser } = this.props;
        return (React.createElement(View, null,
            React.createElement(LC, { loveCount: loveCount, lovedByCurrentUser: lovedByCurrentUser })));
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: colors.textMuted
    }
});
//# sourceMappingURL=LoveCount.js.map