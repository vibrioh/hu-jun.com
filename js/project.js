

var ProjectIntro = React.createClass({
	render: function(){

		return (<div>
					<h1 className="left-orange">Introduction</h1>
					<div className="para">{this.props.intro}</div>
				</div>
				);

	}
});

var ProjectContributions = React.createClass({

	render: function(){

		var contributionsDOMS = [];
		for (var i = 0; i < this.props.contributions.length; i++) {
			contributionsDOMS.push(<Contribution contribution={this.props.contributions[i]}/>);	
		};
		return (<div className="contributions-wrap">{contributionsDOMS}</div>);
	}

});

var WhatWeveDone = React.createClass({

	render: function(){

		var ourContributionsDOMs = [];
		for (var i = 0; i < this.props.ourContributions.length; i++) {
			ourContributionsDOMs.push(<Contribution contribution={this.props.ourContributions[i]}/>)
		};
		return (<div className="our-contributions-wrap para">{ourContributionsDOMs}</div>);
	}

});

var Contribution = React.createClass({

	render: function(){

		var listItemStyle = {
			"marginLeft": 4,
			"marginBottom": 2
		};

		var contribution = this.props.contribution;
		if (contribution.substr(-1) != "."){
			contribution = contribution + ".";
		}

		return (<div className="para"><span className="glyphicon glyphicon-minus" aria-hidden="true"></span><span style={listItemStyle}>{contribution}</span></div>);
	}

});

var GoToAppButton = React.createClass({
	render: function(){

		var buttonStyle = {
			fontSize: 26,
			fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif"
		};

		return (<a type="button" className="btn btn-danger" href={this.props.url} target="_blank" style={buttonStyle}>LEARN MORE</a>);
	}
});

var WhyNow = React.createClass({

	render: function(){
		return (<div>
					<h1 className="left-orange">Implementation</h1>
					<div className="para">{this.props.whynow}</div>
				</div>)
	}

});



$(document).ready(function(){



	// get data from local storage and get the project content 
	// with projectID from url parameter

	var projectDataString = localStorage.getItem("project_data")
	var projectData = JSON.parse(projectDataString);

	// project id
	var currentBrowsingProjectId = getProjectId();

	// I suppose there won't be not found... = =
	var projectContent = projectData.filter(function(project){
		return project["project_id"] == currentBrowsingProjectId;
	})[0];

	// set project name 
	$("#project-name-wrap").text(projectContent["project_name"]);

	// set project cover photo
	$("#header-bar").css({"backgroundImage": 'url("../img/prj-cover/' + currentBrowsingProjectId + '.png")'});

	// remove empty cell
	var contributions = projectContent["project_contributions"].split("|");
	contributions = contributions.filter(function(contribution){
		return contribution != "";
	});
	
	contributions.forEach(function(contribution, index, contributions){
		
		contribution = contribution.trim();
		contributions[index] = contribution.replace(/\n|\r/g, "");

	});


	var ourContributions = projectContent["we_done"].split("|");
	ourContributions = ourContributions.filter(function(contribution){
		return contribution != "";
	});

	ourContributions.forEach(function(contribution, index, ourContributions){

		contribution = contribution.trim();
		ourContributions[index] = contribution.replace(/\n|\r/g, "");

	});

	// console.log(contributions);
	console.log(ourContributions)

	var projectURL = projectContent["project_url"];
	console.log(projectURL);


	// react
	
	ReactDOM.render(
		<ProjectIntro intro={projectContent["project_intro"]} />,
		document.getElementById("project-intro")
	);

	// if no data in why now, we skip the rendering and remove the div
	if (projectContent["why_now"] == "") {
		$("#project-why-now").remove();
	}
	// else we render react
	else{
		ReactDOM.render(
			<WhyNow whynow={projectContent["why_now"]} />,
			document.getElementById("project-why-now")
		);
	}

	// contributions
	ReactDOM.render(
		<ProjectContributions contributions={contributions}/>, 
		document.getElementById("contributions-wrap")
	);

	// What we've done
	if (projectContent["we_done"] == "") {
		$(".project-what-we-done").remove();
	}
	// else we render react
	else{
		ReactDOM.render(
			<WhatWeveDone ourContributions={ourContributions} />,
			document.getElementById("we-dones-wrap")
		);
	}



	// add two go to app buttons
	ReactDOM.render(
		<GoToAppButton url={projectContent["project_url"]} />,
		document.getElementById("go-to-app-head")
	);

	/*ReactDOM.render(
		<GoToAppButton url={projectContent["project_url"]} />,
		document.getElementById("go-to-app-tail")
	);*/



})