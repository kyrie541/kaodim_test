import React from "react";

const AnswerList =({answer0, answer1, answer2, answer3, answer4, answer5, backToTop}) => {
  return(
    <div className="container1 container">
      <h2>Check your answer</h2>
      <br/>
      <h4>How are you? (Optional)</h4>
      <p className="crop">{answer0}</p>
      <br/>
      <h4>Your Interest</h4>
      <p className="crop">{answer1}</p>
      <br/>
      <h4>Favourite Movie</h4>
      <p className="crop">{answer2}</p>
      <br/>
      <h4>Your Image (Optional)</h4>
      {answer3 && (
      <img src={answer3} alt="Profile Piture"/>
      )}
      <br/>
      <h4>Favourite Fruits</h4>
      <p>{answer4.toString()}</p>
      <br/>
      <h4>Gender</h4>
      <p>{answer5}</p>
      <br/>
      <button className="btn btn-md btn-danger" onClick={backToTop}>Answer Again</button>
    </div>
  ) 
};

export default AnswerList; 