import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import Header from './Header';
import LandingPage from './LandingPage';
import TutorialStaticInfoCards from './TutorialStaticInfoCards';
import FlashcardControl from './FlashcardControl';
import EditForm from './EditForm';
import Footer from './Footer';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questionList: {
        '1': {
          question: 'Tell me about yourself',
          answer: 'I am a student of web development, looking to break into the web development industry.',
          type: 'a'
        },
        '2': {
          question: 'What is your biggest weakness?',
          answer: 'You have not answered this question',
          type: 'b'
        },
        '3': {
          question: 'How did you find out about our company?',
          answer: 'You have not answered this question',
          type: 'c'
        },
        '4': {
          question: 'Why should we hire you?',
          answer: 'You have not answered this question',
          type: 'c'
        },
        '5': {
          question: 'Tell about a time you demonstrated leadership',
          answer: 'You have not answered this question',
          type: 'a'
        },
        '6': {
          question: 'Tell me about a problem you had at a previous job and how you solved it',
          answer: 'You have not answered this question',
          type: 'b'
        },
        '7': {
          question: 'What is your biggest strength?',
          answer: 'You have not answered this question',
          type: 'b'
        },
        '8': {
          question: 'Tell me about your work history...',
          answer: 'You have not answered this question.',
          type: 'a'
        },
        '9': {
          question: 'What career accomplishments are you most proud of?',
          answer: 'You have not answered this question.',
          type: 'a'
        },
        '10': {
          question: 'Why do you have an employment gap?',
          answer: 'You have not answered this question.',
          type: 'a'
        },
        '11': {
          question: 'What experience do you have doing (specific skill listed in job post)?',
          answer: 'You have not answered this question.',
          type: 'b'
        },
        '12': {
          question: 'What issues do you foresee facing in this position?',
          answer: 'You have not answered this question.',
          type: 'b'
        },
        '13': {
          question: 'Why are applying for this postion?',
          answer: 'You have not answered this question.',
          type: 'b'
        },
        '14': {
          question: 'Why did you decide to enter this industry?',
          answer: 'You have not answered this question.',
          type: 'b'
        }
      },
      infoCard: {
        '1': {
          title: 'Your Work History',
          questionSet: 'what you did to prepare for this job and what you will do once hired'
        },
        '2': {
          title: 'Your Skills',
          questionSet: 'what skills you have and how you developed them'
        },
        '3': {
          title: 'Our Company & Your Fit',
          questionSet: 'what you will do for the company'
        }
      },
      selectedQuestion: '1'
    };
    this.handleAddingNewAnswerToQuestionList = this.handleAddingNewAnswerToQuestionList.bind(this);
    this.handleChangingSelectedQuestion = this.handleChangingSelectedQuestion.bind(this);
  }

  handleAddingNewAnswerToQuestionList(newAnswer){
    let x = this.state.selectedQuestion;
    let newQuestionList = Object.assign({}, this.state.questionList);
    newQuestionList[x].answer = newAnswer;
    this.setState({ questionList: newQuestionList});
    console.log('we up here');
  }

  handleChangingSelectedQuestion(questionId){
    this.setState({selectedQuestion: questionId});
    console.log('changed to', questionId);
  }

  render(){
    console.log(this.state);
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/tutorial' render={()=><TutorialStaticInfoCards questionList={this.state.questionList}
            infoCard={this.state.infoCard} />} />
          <Route path='/flashcards' render={()=><FlashcardControl questionList={this.state.questionList}
            infoCard={this.state.infoCard} />} />
          <Route path='/edit' render={()=><EditForm onNewAnswerAddition={this.handleAddingNewAnswerToQuestionList}
            onQuestionSelection={this.handleChangingSelectedQuestion}
            questionList={this.state.questionList}
            selectedQuestion={this.state.selectedQuestion} />} />
          <Route component={Error404} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}



export default App;
