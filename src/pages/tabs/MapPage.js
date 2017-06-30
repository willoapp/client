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
import BackgroundGeolocation from 'react-native-background-geolocation'

class MapPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      latitude: 45.5209087,
      longitude: -122.6705107,
      markers: [{coordinate: {latitude: 45.5209087, longitude: -122.6705107}}],
    }
    this.onLocation = this.onLocation.bind(this)
    this.onError = this.onError.bind(this)
    this.onProviderChange = this.onProviderChange.bind(this)
  }

  componentWillMount() {
    // 1.  Wire up event-listeners

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation)

    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', this.onError)

    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', this.onProviderChange)

    // 2.  #configure the plugin (just once for life-time of app)
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled)

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success")
        })
      }
    })
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
  }

  onLocation(location) {
    console.log('- [js]location: ', JSON.stringify(location))
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude })
  }
  onError(error) {
    const type = error.type
    const code = error.code
    alert(type + " Error: " + code)
  }
  onProviderChange(provider) {
    console.log('- Location provider changed: ', provider.enabled);
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
        showsUserLocation={true}>
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