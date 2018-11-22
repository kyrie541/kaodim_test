import React, {Component} from 'react';
import QuestionFormat from "./QuestionFormat"; 
import * as d3 from "d3";

class QuestionForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      message:"* Optional"
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.props.updateAnswer(); 

    let userInput = document.getElementById("textarea").value.length;
    let {min_char_length}=this.props;
    if(!this.props.is_required){
      document.getElementById("next").disabled = false;
    }else if(userInput < min_char_length || userInput===0 ){
      document.getElementById("next").disabled = true;
    }else{
      document.getElementById("next").disabled = false;
    }
  };



  componentWillReceiveProps(nextProps){
    if(nextProps.answer !== undefined){   //image answer3 is undefined, so we need this checking code
      if(nextProps.answer.length < nextProps.min_char_length){
        document.getElementById("next").disabled = true;
      }else{
        document.getElementById("next").disabled = false;
      }
    }

    if(nextProps.is_required){
      this.setState({message:"* Required"});
    }else{
      this.setState({message:"* Optional"});
      document.getElementById("next").disabled = false;
    }

  };
  render(){
    const {
      title, 
      prompt, 
      handleSubmit, 
      previousQuestion,
      fileSelectedHandler,
      handleCheckBoxChange, 
      handleRadioChange,
      answer, 
      message2,
      fileName,
      deleteImage,
      question_type,
      question_number } = this.props;

    const {message} = this.state;

    const scale = d3.scaleLinear()
        .domain([0,5])
        .range([0, 100]); 

    const progress = scale(question_number)+"%";

    return(
      <div className="container1 container">
        <h2>{title}<i className="fa fa-heart" style={{color:"red"}}></i></h2>
        <br/>
        <div className="progress">
          <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="60"
          aria-valuemin="0" aria-valuemax="100" style={{width:progress}}>
            <p style={{opacity:0}}>________________________________________________________</p>
          </div>
        </div>
        <br/>
        <h3>{prompt}</h3>
        <p><i>{message}</i></p>
        <p><i>{message2}</i></p>

        <QuestionFormat 
          answer={answer}
          fileSelectedHandler={fileSelectedHandler}
          handleChange={this.handleChange}
          question_type={question_type}
          handleCheckBoxChange={handleCheckBoxChange}
          handleRadioChange={handleRadioChange}
          fileName={fileName}
          deleteImage={deleteImage}
        />

        <br/>
        <div className="container2">
          <button id="back" className='btn btn-md btn-primary' onClick={previousQuestion}>Back</button>
          <br/>
          <form action="/" id="usrform" onSubmit={handleSubmit}>
            <button id="next" type="submit" className="btn btn-md btn-info">Next</button>
          </form>
        </div>
      </div>
    ) 
  }
};

export default QuestionForm; 