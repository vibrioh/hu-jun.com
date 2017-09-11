var FooterLink = React.createClass({

	getInitialState: function(){
		return {hover: false};
	},
	toggleHover: function(){
		this.setState({hover: !this.state.hover});
	},
	render: function(){

		var footerLinkStyle = {
			color: "white",
			textDecoration: "none"
		};

		var footerLinkHover = {
			color: "white",
			textDecoration:"underline"
		};

		var inlineStyle = {
			display: "inline-block"
		};

		var footerStyle = (this.state.hover)?footerLinkHover: footerLinkStyle;

		return(	<div style={inlineStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
					<a href={this.props.url} style={footerStyle} target={this.props.target}>
						<span>{this.props.text}</span>
					</a>
				</div>);

	}

})


var Footer = React.createClass({

	render: function(){


		var footerIconStyle = {
			width: "100%"
		};

		var footerLeftStyle = {
			height: 400,
			color: "white"
		};

		var footerRightStyle = {
			height: 400
		};

		var footerImgWrapStyle = {
			position: "absolute",
			bottom: 0,
			right: 0
		};


		var contactStyle = {
			fontSize: 20,
			marginTop: 50,
			marginBottom: 12
		};

		var copyrightStyle = {
			position: "absolute",
			bottom: 20
		};

		var iconWrapStyle = {
			display: "inline-table",
			width: 20,
			marginRight: 10
		};

		var contactRowStyle = {
			marginBottom: 6
		};

		

		return(

		<div className="container">

			<div className="col-md-7" style={footerLeftStyle}>
				<div style={contactStyle}>Contact</div>
				
				<div style={contactRowStyle}>
					<div style={iconWrapStyle}><img src="../img/footer-icon/email.png" style={footerIconStyle}/></div>
					<FooterLink url="mailto:mw10104587@gmail.com" text="mw10104587@gmail.com" target="_top"/>
				</div>
				
				<div style={contactRowStyle}>
					<div style={iconWrapStyle}><img src="../img/footer-icon/twitter.png" style={footerIconStyle} /></div>
					<FooterLink url="https://twitter.com/WangChiAn" text="@WangChiAn" target="_blank"/>
				</div>
				<div style={contactRowStyle}>
					<div style={iconWrapStyle}><img src="../img/footer-icon/facebook.png" style={footerIconStyle} /></div>
					<FooterLink url="https://www.facebook.com/mw10104587" text="mw10104587" target="_blank"/>
				</div>

				<div style={copyrightStyle}>© 2015 | Chi-An Wang</div>

			</div>

			<div className="col-md-5" style={footerRightStyle}>
				<div style={footerImgWrapStyle}><img src="../img/footer-img.png" /></div>
			</div>

		</div>

		);

	}

});

ReactDOM.render(<Footer />, document.getElementById("footer"));