import React, { Component } from "react";

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
	// auth: "mypersonalaccesstoken123",
	// username: "unizam12",
});
async function test() {
	const obj = await octokit.request("GET /users/{username}/gists", {
		username: "unizam12",
	});
	console.log(obj);
	return obj;
}

async function getAllGists(userName) {
	var gistDetails;
	await fetch(`https://api.github.com/users/${userName}/gists`)
		.then((res) => {
			if (!res.ok) {
				if (res.status == 404)
					throw new Error(`User ${userName} does not exist!!`);
				else throw new Error(res);
			}
			return res.json();
		})
		.then((data) => {
			gistDetails = JSON.parse(JSON.stringify(data));
		});

	return gistDetails;
}

class GitForm extends Component {
	// const GitForm = props () =>{
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			gists: [],
			g: "",
		};
		this.handleClick = this.handleClick.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.getGists = this.getGists.bind(this);
	}
	inputChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleClick(event) {
		console.log("SUBMITTED", this.state.username, test());
		const data1 = test();
		this.setState({ gists: data1 });
	}

	async getGists() {
		// const url = "https://api.github.com/users/unizam12/gists";
		// const t = await fetch(url);
		// const tt = await t.json();
		// console.log(123, tt);

		// const obj = await octokit.request("GET /users/{username}/gists", {
		// 	username: "unizam12",
		// });
		// console.log(obj.data[0]);
		// const data1 = obj.data[0].json();
		// .then(
		// 	this.setState({ gists: obj });
		// );
		// console.log(obj.data);

		const gistDetails = await getAllGists(this.state.username);
		console.log(1234, gistDetails);
		this.setState({ gists: gistDetails });
		console.log(this.state.gists);
		console.log(gistDetails[0]["files"][0]);
		// const test = JSON.stringify(gistDetails[0].files);
		const test = Object.values(gistDetails[0].files);
		console.log(test[0].language);
		// return obj;
	}

	render() {
		return (
			<div>
				<form>
					<label>Git Username</label>
					<input
						type="text"
						name="username"
						// value="username"
						onChange={this.inputChange}
					/>
				</form>

				<button
					className="login-form-btn"
					name="username"
					// onClick={this.handleClick}
					onClick={this.getGists}
				>
					Submit
				</button>
				{/* <div>{this.state.gists}</div> */}
				<ul>
					{this.state.gists.map((commit) => (
						<li key={commit.id}>
							{commit.description}
							<ul>
								{Object.values(commit.files).map((name) => (
									<li> {name.language} </li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default GitForm;
