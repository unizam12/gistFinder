// const express = require("express");
// const app = express();
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
	// auth: "mypersonalaccesstoken123",
	// username: "unizam12",
});
const fetch = require("node-fetch");
// const courses = [
// 	{ id: 1, name: "course1" },
// 	{ id: 2, name: "course2" },
// 	{ id: 3, name: "course3" },
// ];
const url = "https://api.github.com/users/unizam12/gists";
// const t = fetch(url);
// console.log(t);
async function test2() {
	const t = await fetch(url);
	const tt = await t.json();
	console.log(tt);
}
test2();
// app.get("/", (req, res) => {
// 	res.send("Hello World");
// });

// app.get("/api/courses", (req, res) => {
// 	res.send(courses);
// });

// app.get("/api/courses/:id", (req, res) => {
// 	const course = courses.find((c) => c.id === parseInt(req.params.id));
// 	if (!course)
// 		return res.status(404).send("course with given id was not found");
// 	res.send(course );
// });
async function test() {
	const obj = await octokit.request("GET /users/{username}/gists", {
		username: "unizam12",
	});
	console.log(obj);
}
// test();

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server is working at port ${port}`));
