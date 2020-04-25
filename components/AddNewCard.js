import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import CustomTouch from './CustomTouch';
import { gray, green } from '../utils/colors';
import { connect } from 'react-redux';
import { addANewCard } from '../actions/index';
import { addCardToDeckAS } from '../utils/api';

export class AddNewCard extends Component {
  // static propTypes = {
  //   navigation: PropTypes.object.isRequired,
  //   title: PropTypes.string.isRequired,
  //   addANewCard: PropTypes.func.isRequired
  // };
  state = {
    question: '',
    answer: ''
  };
  handleChangeofQuestion = question => {
    this.setState({ question });
  };
  handleChangeofAnswer = answer => {
    this.setState({ answer });
  };
  handleSubmit = () => {
    const { addANewCard, title, navigation } = this.props;
    const card = {
        question: this.state.question,
        answer: this.state.answer
    };

    addANewCard(title, card);
    addCardToDeckAS(title, card);

    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add A New Question</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleChangeofQuestion}
              placeholder="Question"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleChangeofAnswer}
              placeholder="Answer"
              ref={input => {
                this.answerTextInput = input;
              }}
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <CustomTouch
            btnStyle={{ backgroundColor: 'green', borderColor: '#fff',} }
            onPress={this.handleSubmit}
            disabled={this.state.question === '' || this.state.answer === ''}
          >
            Submit
          </CustomTouch>
        </View>
        <View style={{ height: '30%' }} />
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
    backgroundColor: gray,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    fontSize: 20,
    height: 70
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

export default connect(
  mapStateToProps,
  { addANewCard }
)(AddNewCard);