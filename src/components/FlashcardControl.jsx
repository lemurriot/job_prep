import React from 'react';
import skinnylogo from './../assets/logo-slim.png';
import PropTypes from 'prop-types';


class FlashcardControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersVisibleOnPage: false,
      randomCard: Math.floor((Math.random() * 14) + 1)
    };
    this.state.flipCurrentCard = false;
    this.state.showNextCard = false;
    this.animationDone = this.animationDone.bind(this);
    this.handleFlashcardToggle = this.handleFlashcardToggle.bind(this);
    this.handleNewFlashcard = this.handleNewFlashcard.bind(this);
  }

  componentDidMount () {
    this.refs.button.addEventListener('animationend', this.animationDone);
  }
  componentWillUnmount () {
    this.refs.button.removeEventListener('animationend', this.animationDone);
  }
  animationDone() {
    this.setState({flipCurrentCard: false});
    this.setState({showNextCard: false});
  }


  handleFlashcardToggle(){
    this.setState({flipCurrentCard: true});
    if (this.state.answersVisibleOnPage){
      this.setState({answersVisibleOnPage: false});
    } else {
      this.setState({answersVisibleOnPage: true});
    }
  }

  handleNewFlashcard(){
    let x = Math.floor((Math.random() * 14) + 1);
    this.setState({randomCard: x});
    this.setState({answersVisibleOnPage: false});
    this.setState({showNextCard: true});
  }

  render() {
    const flipCurrentCard = this.state.flipCurrentCard;
    const showNextCard = this.state.showNextCard;
    const flipme = this.state.flipme;
    const cardContainer = {
      minHeight: '20vh',
      border: '10px solid #2fe6d8',
      padding: '2%',
      margin: '5%',
      position: 'relative',
      boxShadow: '.5px 3px 4px #00000063'
    };
    const nextButton = {
      width: '100%',
      height: 50,
      fontFamily: 'Comfortaa, cursive',
      fontSize: 20,
      backgroundColor: '#1fb5a9',
      border: '1px solid black'
    };
    const metaTopic = {
      backgroundColor: '#ff9bd4',
      padding: '2%',
      paddingLeft: '4%',
      fontFamily: 'Didact Gothic, sans-serif',
      fontSize: '.8em',
      marginBottom: 10
    };
    const yourAnswer = {
      padding: '1%',
      paddingRight: '4%',
      fontFamily: 'Didact Gothic, sans-serif',
      textAlign: 'justify'
    };
    const page = {
      marginBottom: '80px'
    };
    const bold = {
      fontFamily: 'Rubik Mono One, sans-serif'
    };
    const logoImg = {
      height: 120,
      width: 120,
      marginLeft: '33%'
    }


    let currentlyVisibleContent = null;
    let currentInfoCard = null;
    let logoSlim = <img style={logoImg} src={skinnylogo} alt='logo'/>;
    let x;
    if (this.props.questionList[this.state.randomCard].type === 'a'){
      x = 1;
    } else if (this.props.questionList[this.state.randomCard].type === 'b'){
      x = 2;
    } else {
      x = 3;
    }
    if (!this.state.answersVisibleOnPage) {
      currentlyVisibleContent = null;
    } else {
      currentlyVisibleContent =
        <div style={yourAnswer}><h3>Your Answer:</h3> <p>{this.props.questionList[this.state.randomCard].answer}</p></div> ;
      currentInfoCard = <div><div style={metaTopic}><p><span style={bold}>Meta-Topic:</span> {this.props.infoCard[x].title}</p> <p><span style={bold}>Focus on:</span> {this.props.infoCard[x].questionSet}</p>
      </div>{logoSlim}</div>;
    }

    return(
      <div style={page}>
        <link href="https://fonts.googleapis.com/css?family=Comfortaa|Didact+Gothic|Ropa+Sans|Rubik+Mono+One" rel="stylesheet" />
        <div style={cardContainer} ref='button' className={flipCurrentCard ? 'flipCurrentCard' : ''}
          onClick={this.handleFlashcardToggle}>
          <style jsx>{`
          .clickme {
            font-size: 12px;
            position: absolute;
            font-family: 'Didact Gothic', sans-serif;
            top: 0;
            right: 1%;
            color: #ff3ede;
            animation: flipWordflip 9.5s ease-out;
          }
          .flipme {
            position: absolute;
            animation: flipWordflip 10s;
          }
          .flipPlaceHold {
            opacity: 0;
          }
          .cardWrapper h4 {
            text-align: center;
            font-family: 'Ropa Sans', sans-serif;
            font-weight: lighter;
            font-size: 1.3em;
            text-shadow: .5px .5px #027068;
          }
          .answerWrapper {
            display: flex;
          }
          .infocard {
            width: 30%;
          }
          .answer {
            width: 69%;
          }
          .flipCurrentCard {
            animation: flipX .3s, small .4s, fadeBackground .3s;
          }
          .showNextCard {
            animation: flipY .5s ease-out;
          }
          @keyframes fadeBackground {
            from {background-color: #a9dcd8}
            to {background-color: white}
          }
          @keyframes flipX {
            from {transform: rotateX(0deg)}
            to {transform: rotateX(360deg)}
          }
          @keyframes flipY {
            from {transform: rotateY(0deg)}
            to {transform: rotateY(360deg)}
          }
          @keyframes small {
            from {box-shadow: 6px 15px 15px #000000ab}
            to {box-shadow: 0px .5px .5px #000000ab}
          }
          @keyframes flipWordflip {
            0% {transform: rotateX(0deg)}
            86% {transform: rotateX(0deg); color: #ff3ede}
            90% {transform: rotateX(360deg); color: #ff3edd}
            100% {transform: rotateX(0deg)}
          }`}</style>
          <div className='cardWrapper'>
            <h4 className={showNextCard ? 'showNextCard' : ''}>{this.props.questionList[this.state.randomCard].question}</h4>
            <div className="answerWrapper">
              <div className="answer">
                {currentlyVisibleContent}
              </div>
              <div className="infocard">
                {currentInfoCard}
              </div>
            </div>
            <p className="clickme">Click anywhere to <span className="flipme">flip</span><span className="flipPlaceHold">flip</span> the card</p>
          </div>
        </div>
        <button style={nextButton} onClick={this.handleNewFlashcard} ref='nextbutton'>Click here to go to next flashcard</button>
      </div>
    );
  }
}


FlashcardControl.propTypes = {
  questionList: PropTypes.object,
  infoCard: PropTypes.object
};

export default FlashcardControl;
