import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '~/Store'
import { ApplicationNavigator } from '~/Navigators'
import './Translations'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import Test from '~/Navigators/Application'
import codePush from 'react-native-code-push'
import * as Config from '~/Config/index'

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
}
class App extends Component {
  state = {
    isLoading: true,
    progress: {},
  }
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.', status)
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.', status)
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.', status)
        break
      case codePush.SyncStatus.UP_TO_DATE:
        this.setState({
          isLoading: false,
        })
        console.log('Up-to-date.', status)
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.', status)
        break
    }
  }
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    )
  }
  codePushDownloadDidProgress(progress) {
    this.setState({ progress })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <ActivityIndicator size="small" color="#0000ff" />
          {/* <TouchableOpacity
            onPress={() => {
              this.sync()
            }}
          >
            <Text>Auto{`${Config.Config.VERSION}`}</Text>
          </TouchableOpacity> */}
          <Text
            style={{
              color: '#000',
            }}
          >
            {this.state.progress.totalBytes
              ? `Update ${
                  this.state.progress.totalBytes
                    ? Math.round(
                        (this.state.progress.receivedBytes /
                          this.state.progress.totalBytes) *
                          100,
                      )
                    : ''
                } %`
              : ''}
          </Text>
        </View>
      )
    }
    return (
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
    )
  }
}

export default codePush(codePushOptions)(App)
