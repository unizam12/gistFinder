import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Expand from "./expand";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

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
async function getAllForks(forkURL) {
	var forkDetails;
	await fetch(forkURL)
		.then((res) => {
			if (!res.ok) {
				if (res.status == 404) throw new Error(`User does not exist!!`);
				else throw new Error(res);
			}
			return res.json();
		})
		.then((data) => {
			forkDetails = JSON.parse(JSON.stringify(data));
		});
	return forkDetails;
}
async function getGists(gistID) {
	var gistDetails;
	await fetch(`https://api.github.com/gists/${gistID}`)
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
class GitForm extends Component {
	// const GitForm = props () =>{

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			gists: [],
			g: "",
			forks: [],
			num: 0,
			id: [],
			keyy: [],
		};
		this.inputChange = this.inputChange.bind(this);
		this.getGists = this.getGists.bind(this);
		this.goToExpand = this.goToExpand.bind(this);
	}

	// const classes = useStyles();
	inputChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	async getGists() {
		var arrForksURL = [];
		var arrGistID = [];

		const gistDetails = await getAllGists(this.state.username);
		const gistDetailsConverted = Object.values(gistDetails);

		gistDetailsConverted.forEach((element) => {
			arrForksURL = arrForksURL.concat(element.forks_url);
			arrGistID = arrGistID.concat(element.id);
		});
		arrForksURL.forEach((element) => {
			this.getForks(element);
		});

		this.setState({ gists: gistDetails, id: arrGistID });
	}

	async getForks(event) {
		const forkDetails = await getAllForks(event);
		const test = Object.values(forkDetails);

		var arrForkID = [...this.state.forks];

		if (forkDetails.length != 0) {
			var str = "";
			if (forkDetails.length > 3) {
				for (var i = forkDetails.length - 3; i < forkDetails.length; i++) {
					str = str + "," + test[i].owner.login;
				}
			} else {
				for (var i = 0; i < forkDetails.length; i++) {
					str = str + "," + test[i].owner.login;
				}
			}

			arrForkID = arrForkID.concat(str);
		} else {
			arrForkID = arrForkID.concat("none");
		}
		this.setState({ forks: arrForkID });
	}

	async goToExpand(id) {
		// <Expand message="DATA"></Expand>;
		const gists = await getGists(id);
		const gistsFiles = Object.values(gists["files"]);

		// console.log(gists, gists["files"], gists.files[0], test);
		// console.log(1111, t);

		var fileContent = [];
		var fileNameArr = [];

		gistsFiles.forEach((element) => {
			fileContent = fileContent.concat(element.content);
			fileNameArr = fileNameArr.concat(element.filename);
		});

		this.props.history.push({
			pathname: "/expand",
			state: { content: fileContent, fileName: fileNameArr },
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<form>
					<label>Git Username</label>
					<input type="text" name="username" onChange={this.inputChange} />
				</form>

				<button
					className="login-form-btn"
					name="username"
					onClick={this.getGists}
				>
					Submit
				</button>
				<div className="classes.root" padding="12px">
					<Grid
						container
						spacing={3}
						padding="12px"
						justify="center"
						alignItems="center"
						direction="row"
					>
						<Grid item xs={3}>
							{this.state.gists.map((commit, key) => (
								<Paper key={commit.id} style={{ color: "red" }}>
									Description of Gist: {commit.description}
									<div>Forks: {this.state.forks[key]}</div>
									Languages:
									<Grid item xs={12}>
										{Object.values(commit.files).map((name) => (
											<Paper className="classes.paper"> {name.language} </Paper>
										))}
										<div>
											<button
												onClick={this.goToExpand.bind(this, this.state.id[key])}
											>
												Expand
											</button>
										</div>
									</Grid>
								</Paper>
							))}
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default GitForm;
