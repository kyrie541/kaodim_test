import React, {Component} from "react";
import './QuestionFormat.css';

class QuestionFormat extends Component {

  componentDidUpdate(prevProps, prevState){
    let {answer} = this.props;
    if(Array.isArray(answer)){
      let checkCheckBox1 = answer.some(value => value === "Apple");
      let checkCheckBox2 = answer.some(value => value === "Orange");
      let checkCheckBox3 = answer.some(value => value === "Banana");
      checkCheckBox1?document.getElementById("apple").checked=true
      :document.getElementById("apple").checked=false;

      checkCheckBox2?document.getElementById("orange").checked=true
      :document.getElementById("orange").checked=false;

      checkCheckBox3?document.getElementById("banana").checked=true
      :document.getElementById("banana").checked=false;
      
    }
    if(this.props.question_type === "radioQuestion"){
      answer === "Male"?document.getElementById("male").checked=true
      :document.getElementById("male").checked=false;

      answer === "Female"?document.getElementById("female").checked=true
      :document.getElementById("female").checked=false;
      
      answer === "Other"?document.getElementById("other").checked=true
      :document.getElementById("other").checked=false;
    }

  }

  render(){
  const {answer, 
    fileSelectedHandler, 
    handleChange,
    question_type, 
    handleCheckBoxChange, 
    handleRadioChange, 
    fileName, 
    deleteImage}=this.props;

  if(question_type==="TextQuestion"){
    return(
      <div>
        <textarea id="textarea" className='form-control' rows="4" cols="50" value={answer} name="answer" form="usrform" placeholder="haha" onChange={handleChange}/>
      </div>)
    }else if(question_type==="imageQuestion"){
    return(
      <div className="container3">   
        <input style={{display: 'none'}} type="file" onChange={fileSelectedHandler} id="fileUploader" accept="image/*"/>
        <button className="animationButton" onClick={() => document.getElementById("fileUploader").click()}>Choose File</button>
        <br/>
        <p>{fileName}</p>
        {answer && (
        <div className="container4">
          <img src={answer} alt="Profile Piture"/>
          <br/>
          <button className="animationButton" onClick={deleteImage}>Delete Image</button>
        </div>
        )}
        
      </div>)
    }else if(question_type==="checkboxQuestion"){
    return(
      <div>
        <form>

          <label class="container5">Apple
            <input type="checkbox" name="apple" value="Apple" onChange={handleCheckBoxChange} id="apple"/>
            <span class="checkmark"></span>
          </label>

          <label class="container5">Orange
            <input type="checkbox" name="orange" value="Orange" onChange={handleCheckBoxChange} id="orange"/>
            <span class="checkmark"></span>
          </label>

          <label class="container5">Banana
            <input type="checkbox" name="banana" value="Banana" onChange={handleCheckBoxChange} id="banana"/>
            <span class="checkmark"></span>
          </label>

        </form>
      </div>
      
      )
    }else if(question_type === "radioQuestion"){
      return(
      <div>
        <form>

          <label class="container5">Male
            <input type="radio" name="gender" value="Male" onChange={handleRadioChange} id="male"/>
            <span class="checkmark"></span>
          </label>

          <label class="container5">Female
            <input type="radio" name="gender" value="Female" onChange={handleRadioChange} id="female"/>
            <span class="checkmark"></span>
          </label>

          <label class="container5">Other
            <input type="radio" name="gender" value="Other" onChange={handleRadioChange} id="other"/>
            <span class="checkmark"></span>
          </label>

        </form>
      </div>)
    }
  }
}



export default QuestionFormat;