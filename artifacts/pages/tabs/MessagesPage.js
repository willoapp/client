import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../assets/styles/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../../actions/postActions';
class MessagesPage extends Component {
    constructor(props) {
        super(props);
    }
    onTextChange(text) {
        this.setState({ text });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "Invitations")));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bggray,
    }
});
export default connect(null, (dispatch) => ({
    actions: bindActionCreators(postActions, dispatch)
}))(MessagesPage);
//# sourceMappingURL=MessagesPage.js.map