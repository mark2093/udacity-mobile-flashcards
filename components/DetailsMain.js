import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import MainDeck from './MainDeck';
import CustomTouch from './CustomTouch';
import CustomButton from './CustomButton';
import { gray, textGray, green, white, red } from '../utils/colors';
import { connect } from 'react-redux';
import { deleteADeck } from '../actions/index';
import { removeDeckAS } from '../utils/api';


export class DetailsMain extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deleteADeck: PropTypes.func.isRequired,
    deck: PropTypes.object
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDeleteDeck = id => {
    const { deleteADeck, navigation } = this.props;

    deleteADeck(id);
    removeDeckAS(id);

    navigation.goBack();
  };
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <MainDeck id={deck.title} />
        <View>
          <CustomTouch
            btnStyle={{ backgroundColor: white, borderColor: textGray }}
            txtStyle={{ color: textGray }}
	    onPress={() =>
  		this.props.navigation.navigate('AddNewCard', { title: deck.title })
            }
          >
            Add New Card
          </CustomTouch>
          <CustomTouch
            btnStyle={{ backgroundColor: green, borderColor: white }}
            txtStyle={{ color: white }}
            onPress={() =>
              this.props.navigation.navigate('Quiz', { title: deck.title })
            }
          >
            Start A Quiz
          </CustomTouch>
        </View>
        <CustomButton
         btnStyle={{ backgroundColor: red, borderColor: white,fontSize: 20 }}
          txtStyle={{ color: red }}
          onPress={() => this.handleDeleteDeck(deck.title)}
        >
          Delete Deck
        </CustomButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect(
  mapStateToProps,
  { deleteADeck }
)(DetailsMain);