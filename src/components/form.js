import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Expand from "./expand";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	paper: {
// 		padding: theme.spacing(2),
// 		textAlign: "center",
// 		color: theme.palette.text.secondary,
// 	},
// }));
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
const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
});

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
			// if (res.length == 0) {
			// 	return;
			// }
			if (!res.ok) {
				if (res.status == 404) throw new Error(`User does not exist!!`);
				else throw new Error(res);
			}
			return res.json();
		})
		.then((data) => {
			forkDetails = JSON.parse(JSON.stringify(data));
		});
	console.log("DETAILS", forkDetails);
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
		this.handleClick = this.handleClick.bind(this);
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
		var arr = [];
		var arr1 = [];
		const gistDetails = await getAllGists(this.state.username);
		const test = Object.values(gistDetails);
		console.log(gistDetails[0].forks_url);

		test.forEach((element) => {
			// console.log("OOO", element.forks_url);
			arr = arr.concat(element.forks_url);
			arr1 = arr1.concat(element.id);
		});
		arr.forEach((element) => {
			// const forkDetails = await getAllForks(element);
			// const test = Object.values(forkDetails);
			// // console.log("heret", test);

			// if (forkDetails.length != 0) {
			// 	console.log("heret", test[0].owner.login);
			// }
			// console.log(element);
			this.getForks(element);
		});

		console.log(1234, gistDetails, arr);
		this.setState({ gists: gistDetails, id: arr1 });
		// console.log(this.state.gists);
		// console.log(gistDetails[0]["files"][0]);
		// const test = JSON.stringify(gistDetails[0].files);
		// const test = Object.values(gistDetails[0].files);
		// console.log("here", test[0].language);
		// return obj;
	}

	async getForks(event) {
		const forkDetails = await getAllForks(event);
		const test = Object.values(forkDetails);
		console.log("heret", test);

		var arr = [...this.state.forks];

		if (forkDetails.length != 0) {
			var str = "";
			for (var i = 0; i < forkDetails.length; i++) {
				console.log("heret", test[i].owner.login);
				// this.setState({ forks: test[0].owner.login });
				str = str + "," + test[i].owner.login;
			}
			arr = arr.concat(str);
		} else {
			// this.setState({ forks: 0 });
			arr = arr.concat("none");
		}
		this.setState({ forks: arr });
		console.log("emergency", this.state.forks);
		// return 1;
	}
	async goToExpand(id) {
		console.log("ys", id);
		// <Expand message="DATA"></Expand>;
		const gists = await getGists(id);
		const test = Object.values(gists);
		const t = Object.values(gists["files"]);
		console.log(gists, gists["files"], gists.files[0], test);
		console.log(1111, t);
		for (var i = 0; i < gists["files"].length; i++) {
			console.log(111, test[8][i]);
		}
		var arr = [];
		t.forEach((element) => {
			arr = arr.concat(element.content);
			console.log("JALDO", element.content);
		});

		this.props.history.push({
			pathname: "/expand",
			state: arr,
		});
		// this.props.history.push("/expand");

		// console.log("JALDI");
		// <Expand message={this.state.forks}></Expand>;
	}

	render() {
		const { classes } = this.props;
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
					// onClick={this.getForks(this.state.forks)}
				>
					Submit
				</button>
				{/* <div>{this.state.gists}</div> */}
				<div className="classes.root" padding="12px">
					<Grid
						container
						spacing={3}
						padding="12px"
						justify="center"
						alignItems="center"
						direction="row"
					>
						<Grid
							item
							// spacing={3}
							xs={3}
							// style={{ color: "red", padding: "theme.spacing.unit", flexGrow: 1 }}
							// justify="center"
							// alignItems="center"
							// direction="row"
						>
							{this.state.gists.map((commit, key) => (
								<Paper key={commit.id} style={{ color: "red" }}>
									Description of Gist: {commit.description}
									<div>Forks: {this.state.forks[key]}</div>
									{this.state.id[key]}
									Languages:
									<Grid
										// container
										item
										xs={12}
										// justify="center"
										// alignItems="center"
										// direction="row"
									>
										{Object.values(commit.files).map((name) => (
											<Paper className="classes.paper"> {name.language} </Paper>
										))}
										{/* {this.getForks(commit.forks_url)} */}
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
							{/* {this.state.forks} */}
						</Grid>
					</Grid>
				</div>
				{/* <Grid container spacing={3}>
					<Grid item xs={6}>
						<Paper>xs=12</Paper>
					</Grid> */}
				{/* </Grid> */}
			</div>
		);
	}
}

export default GitForm;
