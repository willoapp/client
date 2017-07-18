import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'

import colors from '../../assets/styles/colors'
import spacing from '../../assets/styles/spacing'
import fontSizes from '../../assets/styles/fontSizes'
import commonStyles from '../../assets/styles/commonStyles'

import postActions from '../../actions/postActions'
import { currentUserWithId } from '../../utils'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  firebaseConnect,
  // isLoaded,
  // isEmpty,
} from 'react-redux-firebase'

import { User, Post } from '../../types'

interface IAddActivityPageProps {
  navigation: any,
  currentUser: User,
  firebase: any
}

class AddActivityPage extends Component<IAddActivityPageProps> {
  static navigationOptions = navigator => {
    const { addPost, firebase, user, text } = navigator.navigation.state.params
    return {
      title: 'Update Activity',
      headerLeft: <Text style={{ color: colors.slate, marginLeft: spacing.small, fontSize: fontSizes.normal }} onPress={() => { navigator.navigation.goBack() }}>Cancel</Text>,
      headerRight: (
        <Text
          style={{ color: colors.slate, marginRight: spacing.small, fontSize: fontSizes.normal, fontWeight: 'bold' }}
          onPress={() => addPost(firebase, text, user).then(_ => navigator.navigation.goBack() )}
        >Post</Text>
      ),
      headerStyle: commonStyles.popHeader,
      headerTitleStyle: commonStyles.popHeaderTitle,
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { navigation, currentUser, firebase } = this.props
    navigation.setParams({ addPost: this.addPost, text: '', user: currentUser, firebase })
  }

  addPost(firebase, text, user) {
    if (text.length > 0) {
      const post: Post = {
        content: text,
        user: user,
        createdAt: new Date().toString(),
        loveCount: 0
      }
      return postActions.addPost(firebase, post)
    } else {
      Alert.alert(`Your post can't be empty`)
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            autoFocus={true}
            style={{marginTop: spacing.normal, padding: spacing.normal, flex: 1, fontSize: fontSizes.normal}}
            onChangeText={(text) => this.props.navigation.setParams({ text })}
            value={this.props.navigation.state.params.text}
            placeholder='Update your family with your status...'
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

export default compose(
  firebaseConnect([
    'users'
  ]),
  connect(
    ({ firebase: { auth, data: { users } } }) => ({
      currentUser: currentUserWithId(users, auth)
    })
  )
)(AddActivityPage as any)