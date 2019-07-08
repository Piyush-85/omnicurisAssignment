import React from 'react';
import './index.css';

class JavascriptMcqTest extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
           data: [],
           score: 0,
           showOnSubmission: false,
           submitting: false
        };
    }
    componentDidMount() {
    	fetch("https://Piyush-85.github.io/jsonData/omnicurisAssignment.json")
		.then(res => res.json())
		.then(
			(result) => {
				console.log(result.questions)
			  	this.setState({ data: result.questions})
			},
			(error) => {
			 
			}
		)
    }

    renderQuestions(listItems) {
	    var questions = listItems.map((item, i) => {
	      return (
	        <li key={i}>
	            <p>{item.question}</p>
	            {this.renderOptions(item.answerChoices, i)}
	        </li>
	      );
	    });
    	return questions;
    }

    renderOptions(choices,quesNumber){
    	var options = choices.map((item, i) => {
	      return (
	        <div key={i} className="optionsItem">
	   			<label>
	        		<input type="radio" name={quesNumber} quesno={quesNumber} value={i} onChange={this.handleChange.bind(this)}/>
	        		{item}
	        	</label>
	        </div>
	      );
	    });
    	return options;
    }

    handleChange(e){
    	var quesNumber = e.target.name
    	var changedData = this.state.data
    	for(var i=0;i<changedData.length;i++){
    		if(i === parseInt(quesNumber)){
    			changedData[i].selectedAnswer = e.target.value;
    			console.log(e.target.value)
    			return;
    		}
    	}
    	this.setState({data: changedData})
    }

    submission(e){
    	e.preventDefault();
    	var finalData = this.state.data
    	var marks = 0;
    	for(var i=0;i<finalData.length;i++){
    		if(parseInt(finalData[i].selectedAnswer) === finalData[i].correctAnswerIndex){
    			marks++;
    		}
    	}
    	this.setState({score: marks});
    	this.setState({showOnSubmission: true});
    	this.setState({submitting: true});
    	setTimeout(function(){
    		window.scrollTo(0,document.body.scrollHeight);
    	},100)
    }

    showSubmission(){
    	var finalData = this.state.data
    	var resultExp = finalData.map((item, i) => {
	      return (
			<li key={i} className="marginBtm8">
				{parseInt(item.selectedAnswer) === item.correctAnswerIndex ? 'Correct': 'Wrong'}
			</li>
	      );
	    });
    	return resultExp;
    }

    showAnswers(){
    	var data = this.state.data
    	var resultExp = data.map((item, i) => {
	      return (
			<li key={i} className="marginBtm8">
				{item.answerChoices[item.correctAnswerIndex]}
			</li>
	      );
	    });
    	return resultExp;
    }

    retakeTest(){
    	window.location.reload();
    }

	render(){
		return (
			<div className="background">
				<h1 className="textAlignCen">Javascript Multiple choice questions</h1>
				<div className="formContainer">
					<form>
						<ol>
							{this.renderQuestions(this.state.data)}
						</ol>
						<p className="textAlignCen"> <input type="button" className="primaryButton" value="Submit" disabled={this.state.submitting} onClick={this.submission.bind(this)}/></p>
					</form>
					{this.state.showOnSubmission === true &&
						<div className="showOnSubmission">
							<h2 className="textAlignCen"> Your Score is {this.state.score} </h2>
							<div className="displayFlex">
								<div>
									<p className="loud">Correct Answers</p>
									<ol>{this.showAnswers()}</ol>
								</div>
								<div>
									<p className="loud">Your Answers</p>
									<ol>{this.showSubmission()}</ol>
								</div>
							</div>
							<p className="textAlignCen"> <input type="button" className="primaryButton" value="Retake Test" onClick={this.retakeTest}/></p>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default JavascriptMcqTest;