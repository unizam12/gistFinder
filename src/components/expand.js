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
		// this.getData = this.getData.bind(this);
	}
	// async getData(gistID) {
	// 	const gists = await getGists(gistID);
	// 	const test = Object.values(gists);
	// 	console.log(test);
	// }
	render() {
		const { state } = this.props.location;
		// this.getData(state);
		return (
			<div>
				The Gists are:
				{state.map((elem) => (
					<div> {elem} </div>
				))}
			</div>
		);
	}
}

export default Expand;
