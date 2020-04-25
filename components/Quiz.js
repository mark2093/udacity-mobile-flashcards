import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import TestMain from './TestMain';
//import Quiz_iOS from './Quiz_iOS';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import QuizAPI from './QuizAPI';

export class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  static navigate = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }
  render() {

    const { navigation } = this.props;
    const title = navigation.getParam('title', '');
    return(<TestMain title={title} />);
    
    // if (Constants.platform.android) {
    //   return <TestMain title={title} />;
    // }
    // // return <Quiz_iOS title={title} />;
  }
}

export default Quiz;