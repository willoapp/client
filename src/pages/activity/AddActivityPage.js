import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import colors from '../../assets/styles/colors';
import spacing from '../../assets/styles/spacing';
import fontSizes from '../../assets/styles/fontSizes';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../../actions/postActions';

class AddActivityPage extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  addPost(text, user) {
    const post = { content: text, userId: user._id }
    this.props.postActions.addPost(post);
    this.props.navigation.goBack();
  }

  render() {
    const user = this.props.navigation.state.params.user;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={{padding: spacing.normal, height: 300}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Update your family with your status..."
            multiline={true}
          />
          <Button
            onPress={() => this.addPost(this.state.text, user)}
            title="Add Activity"
            color={colors.slate}
            accessibilityLabel="Add activity button"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});

export default connect(state => ({
    state
  }),
  dispatch => ({
    postActions: bindActionCreators(postActions, dispatch)
  })
)(AddActivityPage);