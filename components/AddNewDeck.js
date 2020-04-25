import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import CustomTouch from './CustomTouch';
import { gray,teal, green, white, textGray,black } from '../utils/colors';
import { connect } from 'react-redux';
import { addANewDeck } from '../actions/index';
import { saveDeckTitleAS } from '../utils/api';
import { StackActions, NavigationActions } from 'react-navigation';

export class AddNewDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    addANewDeck: PropTypes.func.isRequired
  };
  state = {
    text: ''
  };
  handleChange = text => {
    this.setState({ text });
  };
  handleSubmit = () => {
    const { addANewDeck, navigation  } = this.props;
    const { text } = this.state;

    addANewDeck(text);
    saveDeckTitleAS(text);

    const resetAction  = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DetailsMain',
          params: { title: text }
        })
      ]
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ text: '' }));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
        </View>
        <CustomTouch
          btnStyle={{ backgroundColor: teal, borderColor: black,borderRadius: 15 }}
          onPress={this.handleSubmit}
          disabled={this.state.text === ''}
        >
          Create Deck
        </CustomTouch>
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
  block: {
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight:'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: textGray,
    backgroundColor: white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    fontSize: 20,
    height: 70,
    marginBottom: 20
  }
});

export default connect(
  null,
  { addANewDeck }
)(AddNewDeck);