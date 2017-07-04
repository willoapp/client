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
import Avatar from '../../components/Avatar'

import MapView, { Marker } from 'react-native-maps'

class MapPage extends Component {
  constructor (props) {
    super(props)
    const fakeMarkers = [
      {coordinate: {latitude: 45.5209087, longitude: -100.6705107}, key: 1},
      {coordinate: {latitude: 42.5209087, longitude: -101.6705107}, key: 2},
      {coordinate: {latitude: 40.5209087, longitude: -103.6705107}, key: 3},
      {coordinate: {latitude: 41.5209087, longitude: -122.6705107}, key: 4},
      {coordinate: {latitude: 43.5209087, longitude: -122.6705107}, key: 5},
      {coordinate: {latitude: 38.5209087, longitude: -122.6705107}, key: 6},
    ]
    this.state = {
      latitude: 45.5209087,
      longitude: -122.6705107,
      markers: fakeMarkers,
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(success => {
      this.setState({
        latitude: success.coords.latitude,
        longitude: success.coords.longitude
      })
    })

    navigator.geolocation.watchPosition(success => {
      this.setState({
        latitude: success.coords.latitude,
        longitude: success.coords.longitude
      })
    })
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    navigator.geolocation.clearWatch()
    navigator.geolocation.stopObserving()
  }

  render () {
    return (
      <MapView
        style={styles.container}
        region={{
          latitude: this.state.latitude, // default 45.5209087
          longitude: this.state.longitude, // default -122.6705107
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        {this.state.markers.map(marker => {
          return (
            <Marker {...marker}>
              <Avatar size={35}/>
            </Marker>
          )
        })}
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