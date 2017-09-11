
// load project data and feed in!


var ProjectList = React.createClass({
	render: function(){

		var projectRows = [];
		var projectsData = this.props.data;

		while (projectsData.length >= 4 ) {

			// get the first four and push it into the project list
			var subData = projectsData.slice(0,4);

			// remove it from the original data, so that one day we can leave the while loop.
			projectsData = projectsData.slice(4);
			projectRows.push(<ProjectRow rowinfo={subData} />);

		};

		if (projectsData.length != 0) {
			projectRows.push(<ProjectRow rowinfo={projectsData} />);
		};

		return (
			<div className="container-fluid">
				{projectRows}
			</div>
		);

	}

});


var ProjectRow = React.createClass({

	render: function(){

		var cells = [];
		var rowInfo = this.props.rowinfo;

		for (var i = 0; i < rowInfo.length; i++) {
			cells.push(<ProjectCell info={rowInfo[i]} key={i} />);
		};

		var rowStyle = {
			marginTop: 25,
			marginBottom: 25
		};

		return (

			<div className="row" style={rowStyle}>
				{cells}
			</div>

		);
	}

});

var ProjectCell = React.createClass({

	gotoProject: function(){

		var project_info = this.props.info;
		var projectId = project_info["project_id"];

		if (projectId.indexOf("prj") == -1 && projectId.indexOf("story") != -1) {
			// this is story 
			var redirectWindow = window.open(project_info["project_url"]);
    		redirectWindow.location;
			return;	
		};
		
		
    	window.location.assign('project.html?projectid=' + projectId);

	},
	render: function(){

		var project_info = this.props.info;
		// console.log(project_info);
		// var institute = project_info["project_id"].split("_")[2];
		// console.log(institute);

		var prj_img_style = {
			height: 290,
			backgroundImage: "url(img/prj-cell/" + project_info["project_id"] + ".png" + ")",
			backgroundSize: "cover",
			backgroundPosition: "center"
		};

		var prj_over_style = {
			opacity: 0,
			width: "100%",
			height: "100%"
		};

		var proj_name_wrap_style = {
			marginTop: 5,
			fontSize: 20,
			textAlign: "center",
			fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif"
		};

		var project_intro = project_info["project_intro"];
		if (project_intro.length > 230) {
			project_intro = project_info["project_intro"].slice(0, 230) + "..."
		};

		// is it is a story that I wrote, we turn the introduction string into a DOM element
		// console.log("Hello we're here!!");
		if (project_info["project_id"].indexOf("story") != -1) {
			project_intro = <URLIcon />;

			console.log(" hello we're in the right place!! ");
		}

		return (
			<div className = "col-md-6">
				<div className = "prj-frame">
					<div className = "prj-img-wrap" style={prj_img_style}>

						<div className = "prj-img-over" onClick={this.gotoProject}>
							{project_intro}
						</div>
					</div>
					<div className="project-name" style={proj_name_wrap_style}>
					{project_info["project_name"]}
					</div>
				</div>
			</div>
		);

	}

});



var URLIcon = React.createClass({

	render: function(){

		var fullWidthStyle = {
			width: "100%",
			height: "100%"
		};

		var iconWrapStyle = {
			margin: "auto",
			display: "table",
			marginTop: 53
		};

		var urlIconStyle = {
			fontSize: 20,
		};
		
		return(
			<div style={fullWidthStyle}>
				<div style={iconWrapStyle}>
					<span className="glyphicon glyphicon-link" style={urlIconStyle}></span>
				</div>
			</div>

		);
		
	}
});




var data = [];

d3.csv("./data/portfolio-projects.csv", function(prj_data){

	// console.log(prj_data);
	// save the data to local storage
	localStorage.setItem("project_data", JSON.stringify(prj_data));

	ReactDOM.render(
		<ProjectList data= {prj_data}/>,
		document.getElementById('news-prj-wrap')
	);



});


// d3.csv("./data/stories.csv", function(story_data){
//
// 	// console.log(story_data);
//
// 	localStorage.setItem("stories-data", JSON.stringify(story_data));
//
// 	ReactDOM.render(
// 		<ProjectList data={story_data} />,
// 		document.getElementById("stories-prj-wrap")
// 	);
//
//
// })


/*for (var i = 0; i < 9; i++) {

	data.push({
		"project_id": "prj_228_udn",
		"project_name": "THE “228 MASSACRE”",
		"project_intro": 'The “228 massacre” was a uprise that happened in 1947, when KMT fled to Taiwan from China, “the mother country.” Original residents in Taiwan were disappointed of the mother country, and consequently, there were lots of conflicts between the citizens and the police. On the night of February 27th, a 40-year-old widow was hit by an official of the Tobacco Monopoly Bureau. The crowds surrounded the officials, and one of the agents fired a gun into the crowd and accidentally killed a bystander. We visualized the reparation data provided by the The Memorial Foundation of 228, and tried to tell this story by mapping data back to history events.',
		"project_url": "http://bit.ly/udn-228"
	});	


	if (i == 8){
		ReactDOM.render(
			<ProjectList data= {data}/>,
			document.getElementById('news-prj-wrap')
		);
	}


};*/






