import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import CustomTouch from './CustomTouch';
import {  green, red, textGray, orange, white, black, slategray } from '../utils/colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import ViewPager from '@react-native-community/viewpager';


const screen = {
  QUESTION_ASKED: 'question_asked',
  QUESTIONS_ANSWERED: 'questions_answered',
  RESULT: 'result'
};
const answer = {
  RIGHT_ANSWER: 'right_answer',
  WRONG_ANSWER: 'wrong_answer'
};

export class TestMain extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  };
  state = {
    show: screen.QUESTIONS_ASKED,
    right_answer: 0,
    wrong_answer: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };
  handlePageChange = evt => {

    this.setState({
      show: screen.QUESTIONS_ASKED
    });
  };
  handleAnswer = (response, page) => {
    if (response === answer.RIGHT_ANSWER) {
      this.setState(prevState => ({ right_answer: prevState.right_answer + 1 }));
    } else {
      this.setState(prevState => ({ wrong_answer: prevState.wrong_answer + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
      }),
      () => {
        const { right_answer, wrong_answer, questionCount } = this.state;

        if (questionCount === right_answer + wrong_answer) {
          this.setState({ show: screen.RESULT });
        } else {
          this.viewPager.setPage(page + 1);
          this.setState(prevState => ({
            show: screen.QUESTIONS_ASKED
          }));
        }
      }
    );
  };
  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTIONS_ASKED,
      right_answer: 0,
      wrong_answer: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const { right_answer, questionCount } = this.state;
      const percent = ((right_answer / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Quiz Complete!
            </Text>
            <Text style={resultStyle}>
              {right_answer} / {questionCount} Correct
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Percentage Received
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <CustomButton
              btnStyle={{ backgroundColor: green, borderColor: white }}
              onPress={this.handleReset}
            >
              Restart Quiz
            </CustomButton>
            <CustomButton
              btnStyle={{ backgroundColor: white, borderColor: white }}
              txtStyle={{ color: textGray }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.goBack();
              }}
            >
              Back To Deck
            </CustomButton>
            <CustomButton
              btnStyle={{ backgroundColor: white, borderColor: textGray }}
              txtStyle={{ color: textGray }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate('Home');
              }}
            >
              Home
            </CustomButton>
          </View>
        </View>
      );
    }

    return (
      <ViewPager
        style={styles.viewPager}
        scrollEnabled={true}
        onPageSelected={this.handlePageChange}
        ref={viewPager => {
          this.viewPager = viewPager;
        }}
      >
        {questions.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.Container]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTIONS_ASKED ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTIONS_ASKED
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTIONS_ASKED ? (
              <CustomButton
                txtStyle={{ color: orange }}
                onPress={() => this.setState({ show: screen.QUESTIONS_ANSWERED })}
              >
                Show Answer
              </CustomButton>
            ) : (
                <CustomButton
                  txtStyle={{ color: orange }}
                  onPress={() => this.setState({ show: screen.QUESTIONS_ASKED })}
                >
                  Show Question
                </CustomButton>
              )}
            <View>
              <CustomTouch
                btnStyle={{ backgroundColor: green, borderColor: white }}
                onPress={() => this.handleAnswer(answer.RIGHT_ANSWER, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Correct Answers
              </CustomTouch>
              <CustomTouch
                btnStyle={{ backgroundColor: red, borderColor: white }}
                onPress={() => this.handleAnswer(answer.WRONG_ANSWER, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                WRONG Answers
              </CustomTouch>
            </View>
          </View>
        ))}
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  },
  pageStyle: {
    flex: 1,
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 18,
    backgroundColor: slategray,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20,
    color: white
  },
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: white
  },
  Container: {
    borderWidth: 2,
    borderColor: white,
    backgroundColor: black,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 35,
    color: white
  },
  resultTextGood: {
    color: green,
    fontSize: 46,
    textAlign: 'center'
  },
  resultTextBad: {
    color: red,
    fontSize: 46,
    textAlign: 'center'
  }
});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(TestMain));