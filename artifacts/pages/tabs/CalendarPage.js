import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import colors from '../../assets/styles/colors';
export default class CalendarPage extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "Calendar Page")));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bggray,
    }
});
//# sourceMappingURL=CalendarPage.js.map