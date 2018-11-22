import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import QuestionForm from '../components/QuestionForm';
import AnswerList from '../components/AnswerList';
import {data} from '../payload';
import { connect } from "react-redux";
import { nextQuestion, previousQuestion, resetQuestion } from "../store/actions/question";

class Main extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      answer0:"",
      answer1:"",
      answer2:"",
      fileName:"",
      answer3:"",
      value: "", 
      answer4:[], 
      answer5:"",
      message2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.backToTop = this.backToTop.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this); 
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  handleRadioChange = event =>{
    this.setState({answer5:event.target.value});
  }

  deleteImage(){
    this.setState({
      fileName:"",
      answer3: ""
    });
  }

  handleCheckBoxChange = event => {
    this.setState({value: event.target.value})
    if(event.target.checked){
      this.setState(state => {
        const answer4 = [...state.answer4, state.value];
        return {
          answer4,
          value: '',
        };
      });
    }else{
      this.setState(state => {
        const answer4 = state.answer4.filter(val => val !== state.value);
        return {
          answer4,
          value: '',
        };
      });
    }
  }

  fileSelectedHandler= event => {
    this.setState({ 
      fileName: event.target.files[0].name,
      answer3: URL.createObjectURL(event.target.files[0])
    });
  }

  updateAnswer(){
    let answer= "answer"+this.props.question_number;
    this.setState({
      [answer]:document.getElementById("textarea").value
    });


    let userInput = document.getElementById("textarea").value.length;
    let question = data.questions[this.props.question_number];
    let { min_char_length} = question;
    if(userInput > 0 && userInput < min_char_length){
      let moreInput = min_char_length-userInput;
      this.setState({
        message2: `* At least ${min_char_length} character (${moreInput} more character)`
      }); 
    }else{
      this.setState({
        message2: ""
      });
    }

  }

  handleSubmit(e){
    e.preventDefault();
    let number = this.props.question_number;

    if(number === 5){
      this.setState({ message2: ""});
      this.props.history.push("/answer"); 
    }

    if(number < 5){
      number++;
      this.setState({
        message2: ""
      });
      this.props.nextQuestion(); 
    }
    this.showMessage2(number);
  }

  previousQuestion(){
    let number = this.props.question_number;
    if(number > 0){
      number--;
      this.setState({ message2: ""});
      this.props.previousQuestion();
    }
    this.showMessage2(number);
    
  }

  showMessage2(question_number){
    const question = data.questions[question_number];
    const {question_type} = question;
    if(question_type==="imageQuestion"){
      this.setState({message2:"* Image file type only"});
    }else if(question_type==="checkboxQuestion"){
      this.setState({message2:"* Can choose up to one option"});
    }else if(question_type==="radioQuestion"){
      this.setState({message2:"* Only can choose one option"});
    }else{
      this.setState({message2:""});
    }
  }

  backToTop(){
    this.props.history.push("/"); 
    this.setState({message2: ""});
    this.props.resetQuestion();
  };

  render(){
    const question = data.questions[this.props.question_number];
    const title = data.title;
    const {prompt, is_required, min_char_length, question_type} = question;
    const {answer0, answer1, answer2, answer3, message2, answer4, answer5, fileName} = this.state;
    const answerArray= [answer0, answer1, answer2, answer3, answer4, answer5];

    return(
      <Switch>
        <Route path="/answer" render={()=>(
          <AnswerList
            answer0={answer0}
            answer1={answer1}
            answer2={answer2}
            answer3={answer3}
            answer4={answer4}
            answer5={answer5}
            backToTop={this.backToTop}
          />
        )}/>

        <Route path="/" render = {() => (
          <QuestionForm 
            title={title}
            prompt={prompt}
            is_required={is_required}
            min_char_length={min_char_length}
            handleSubmit = {this.handleSubmit}
            previousQuestion = {this.previousQuestion}
            fileSelectedHandler= {this.fileSelectedHandler}
            answer={answerArray[this.props.question_number]}
            fileName={fileName}
            updateAnswer = {this.updateAnswer}
            message2 = {message2}
            question_type = {question_type}
            handleCheckBoxChange = {this.handleCheckBoxChange}
            handleRadioChange = {this.handleRadioChange}
            deleteImage={this.deleteImage}
            question_number={this.props.question_number}
          />
        )}/>
      </Switch>
    )
  }
};

function mapStateToProps(state){
  return {
    question_number: state.question.question_number
  };
}


export default withRouter(connect (mapStateToProps, {nextQuestion, previousQuestion, resetQuestion})  (Main));

