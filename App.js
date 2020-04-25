import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Constants from 'expo-constants';
import HeaderConfiguration from './navigation/HeaderConfiguration';
import { setLocalNotification } from './utils/helpers';

const store = createStore(
  reducer /* preloadedState, */,
  applyMiddleware(thunk, logger)
);

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
// FlashcardStatusBar.propTypes = {
//   backgroundColor: PropTypes.string.isRequired
// };

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashcardStatusBar
            backgroundColor="green"
            barStyle="light-content"
          />
          <HeaderConfiguration />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#dde'
  }
});