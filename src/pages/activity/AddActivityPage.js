import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

import colors from '../../assets/styles/colors'
import spacing from '../../assets/styles/spacing'
import fontSizes from '../../assets/styles/fontSizes'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import postActions from '../../actions/postActions'

class AddActivityPage extends Component {

  componentDidMount() {
    this.props.navigation.setParams({ props: this.props, addPost: this.addPost })
  }

  constructor(props) {
    super(props)
  }

  addPost(text, user, props) {
    const post = { content: text, user: {firstName: user.firstName, lastName: user.lastName} }
    props.postActions.addPost(post)
    props.navigation.goBack()
  }

  render() {
    const user = this.props.navigation.state.params.user
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            autoFocus={true}
            style={{padding: spacing.normal, flex: 1, fontSize: fontSizes.normal}}
            onChangeText={(text) => this.props.navigation.setParams({ text })}
            value={this.props.navigation.state.params.text}
            placeholder="Update your family with your status..."
            multiline={true}
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
})

export default connect(state => ({
    state
  }),
  dispatch => ({
    postActions: bindActionCreators(postActions, dispatch)
  })
)(AddActivityPage)