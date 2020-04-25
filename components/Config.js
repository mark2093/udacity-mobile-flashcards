import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { gray, white, red, textGray, green } from '../utils/colors';
import CustomTouch from './CustomTouch';
import { resetDecks } from '../utils/api.js';
import { connect } from 'react-redux';
import { shuffleTheDeck } from '../actions/index';

export class Config extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    shuffleTheDeck: PropTypes.func.isRequired
  };
  handleShuffleDecks = () => {
    const { shuffleTheDeck, navigation } = this.props;

    shuffleTheDeck();
    resetDecks();
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Settings </Text>
        <View style={styles.block}>
          <View style={styles.blockContainer}>
            <Text style={styles.blockText}>
              This will reset the data back to the original data set.
            </Text>
            <View style={{ height: 20 }} />
            <CustomTouch
              btnStyle={{ backgroundColor: red, borderColor: white }}
              onPress={this.handleShuffleDecks}
            >
              Reset Data
            </CustomTouch>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16,
    color: green
  },
  block: {
    marginBottom: 20
  },
  blockContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20
  },
  blockText: {
    fontSize: 18,
    color: textGray
  }
});

export default connect(
  null,
  { shuffleTheDeck }
)(Config);