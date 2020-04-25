import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import MainDeck from './MainDeck';
import { gray, green } from '../utils/colors';
import { handleInitialData } from '../actions/index';

export class ListofDecks extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    handleInitialData: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { decks, navigation } = this.props;

    return (
      <ScrollView style={styles.Stylecontainer}>
        <Text style={styles.title}>Mobile Flashcards</Text>
        {Object.values(decks).map(deck => {
          return (
            <TouchableOpacity
              key={deck.title}
              onPress={() =>
                navigation.navigate('DetailsMain', { title: deck.title })
              }
            >
              <MainDeck id={deck.title} />
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 28 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Stylecontainer: {
    flex: 1,
    paddingTop: 13,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 13,
    backgroundColor: gray
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 14,
    color: green
  }
});

const mapStateToProps = state => ({ decks: state });

export default connect(
  mapStateToProps,
  { handleInitialData }
)(ListofDecks);