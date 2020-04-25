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
    question_asked: '',
    questions_answered: ''
  };
  handleChangeofQuestion = question_asked => {
    this.setState({ question_asked });
  };
  handleChangeofAnswer = questions_answered => {
    this.setState({ questions_answered });
  };
  handleSubmit = () => {
    const { addANewCard, title, navigation } = this.props;
    const card = {
        question_asked: this.state.question_asked,
        questions_answered: this.state.questions_answered
    };

    addANewCard(title, card);
    addCardToDeckAS(title, card);

    this.setState({ question_asked: '', questions_answered: '' });
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add a question</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question_asked}
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
              value={this.state.questions_answered}
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
            btnStyle={{ backgroundColor: green, borderColor: '#fff' }}
            onPress={this.handleSubmit}
            disabled={this.state.question_asked === '' || this.state.questions_answered === ''}
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
    fontSize: 32
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40
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