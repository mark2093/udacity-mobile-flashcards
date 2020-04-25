import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { cadetblue, olive,black } from '../utils/colors';
import { connect } from 'react-redux';

const mainDeck = props => {
  const { deck } = props;

  if (deck === undefined) {
    return <View style={styles.mainContainer} />;
  }
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.deckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>{deck.questions.length} cards</Text>
      </View>
    </View>
  );
};
mainDeck.propTypes = {
  deck: PropTypes.object
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 220,
    minHeight: 200,
    borderWidth: 5,
    borderColor: black,
    backgroundColor: cadetblue,
    borderRadius: 8,
    marginBottom: 10
  },
  deckText: {
    fontSize: 50
  },
  cardText: {
    fontSize: 25,
    color: olive
  }
});

const mapStateToProps = (state, { id }) => {
  const deck = state[id];

  return {
    deck
  };
};

export default connect(mapStateToProps)(mainDeck);
