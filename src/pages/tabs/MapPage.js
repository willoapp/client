import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native'
import colors from '../../assets/styles/colors'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import postActions from '../../actions/postActions'

import MapView from 'react-native-maps'

class MapPage extends Component {
  constructor (props) {
    super(props)
  }

  onTextChange (text) {
    this.setState({ text })
  }

  render () {
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 45.5209087,
          longitude: -122.6705107,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
      </MapView>
      // <View style={styles.container}>

      //   <Text>Map</Text>

      // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect(null,
  (dispatch) => ({
    actions: bindActionCreators(postActions, dispatch),
  })
)(MapPage)