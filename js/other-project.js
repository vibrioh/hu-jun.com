// other projects are the ones done in NTUEE

var OtherProjects = React.createClass({
	render: function(){
		// an array of projects
		var otherProjects = this.props.otherProjects;
 		var projectRows = [];

 		for (var i = 0; i < otherProjects.length; i++) {
 			projectRows.push(<ProjectRow projectInfo={otherProjects[i]} />)
 		};

 		return (
 			<div>{projectRows}</div>
 		);

	}
});

var ProjectRow = React.createClass({

	getInitialState: function(){
		return {hover: false};
	},
	toggleHover: function(){

		this.setState({hover: !this.state.hover});
		console.log("toggle function called");

	},
	gotoURL: function(){

		var project_info = this.props.projectInfo;		
		var redirectWindow = window.open(project_info["project_url"]);
    	redirectWindow.location;
		// return;	

	},

	render: function(){
		// a project dictionary
		var project_info = this.props.projectInfo;

		var prize = project_info["project_prize"];
		var project_event = project_info["project_event"]; 
		var trophyClass = (prize!="")? "glyphicon glyphicon-flag flag-icon": "nothing";
		prize = (prize!="")? prize + " - " + project_event: project_event

		var thumbnailStyle = {
			backgroundImage: 'url(../img/ntuee-cell/' + project_info["project_id"] + ".png" + ')',
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			width: "100%",
			height: 180
		};

		var rowStyle = {
			margin: '20px 0px 30px 0px'
		};

		var projectIntroStyle = {
			fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif',
			fontSize: 16
		};

		var prjNameAnchorStyle = {
			textDecoration: "none",
			color: "black"
		};

		var imageURL = '../img/ntuee-cell/' + project_info["project_id"] + ".png";

		var imgClass = 'img';
		if (this.state.hover == true) {
			imgClass = 'img img-hover';
		};

		var prjImgClass = "prj-img";
		if(this.state.hover == true){
			prjImgClass = "prj-img hover";
		}

		var prjImgStyle = {
			height: 190,
			overflow: "hidden"
		};

		
		return (
			<div className="row" style={rowStyle}>
				<div className="col-md-3">
					<div className={prjImgClass} style={prjImgStyle}>
						<img src="img/transparent.png" style={thumbnailStyle} className={imgClass}/>
						<div className="prj-img-overlay" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.gotoURL}>
							<a className="expand">GO</a>
							<a className="close-overlay hidden"></a>
						</div>
					</div>
					
				</div>
				<div className="col-md-9">
					<div className="project-name hvr-buzz">
						<a href={project_info["project_url"]} style={prjNameAnchorStyle}>
							<h3>{project_info["project_name"]}</h3>
						</a>
					</div>
					<div className="project-award-info">
						<span className={trophyClass}></span>
						<span className="project-award-and-event">{prize}</span>
					</div>
					<div className="project-info" style={projectIntroStyle}>
						{project_info["project_intro"]}
					</div>
				</div>
			</div>
		);
	}
});


d3.csv("./data/school_projects.csv", function(schoolProjects){

	ReactDOM.render(<OtherProjects otherProjects={schoolProjects} />,
		document.getElementById("ntuee-prj-wrap")
	);

});