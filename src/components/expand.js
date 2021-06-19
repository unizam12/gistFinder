import React from "react";
import { Component } from "react";

async function getGists(gistID) {
	var gistDetails;
	await fetch(`https://api.github.com/gists/${gistID}/gists`)
		.then((res) => {
			if (!res.ok) {
				if (res.status == 404)
					throw new Error(`Gist ${gistID} does not exist!!`);
				else throw new Error(res);
			}
			return res.json();
		})
		.then((data) => {
			gistDetails = JSON.parse(JSON.stringify(data));
		});

	return gistDetails;
}

class Expand extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			gists: [],
		};
	}
	render() {
		const { state } = this.props.location;
		return (
			<div>
				The Gists are:
				{this.props.location.state.content.map((elem, key) => (
					<div>
						<div>Filename: </div>
						<div>{this.props.location.state.fileName[key]} </div>
						<div>File content:</div>
						<div> {elem} </div>
						<div>.........</div>
					</div>
				))}
			</div>
		);
	}
}

export default Expand;
