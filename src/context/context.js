import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider, Consumer -> GithubContext.Provider

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	// request loading
	const [requests, setRequests] = useState(0);
	const [loading, setIsLoading] = useState(false);
	// error
	const [error, setError] = useState({ show: false, msg: "" });

	const searchGithubUsers = async (user) => {
		toggleError();
		// setLoading(true)
		const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
			console.log(err)
		);
		// console.log(response);
		if (response) {
			setGithubUser(response.data);
			// more logic here
		} else {
			toggleError(true, "there is no user with that username");
		}
	};

	// check rate
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;
				// remaining = 0;
				setRequests(remaining);
				// console.log("remaining: ", remaining);
				// setRequests(0);
				if (remaining === 0) {
					// console.log("inside error");
					// console.log("setEror: ", setError);
					toggleError(
						true,
						"sorry, you have exceeded your hourly rate limit!"
					);
					// console.log("setEror: ", setError);
				}
			})
			.catch((err) => console.log(err));
	};

	function toggleError(show = false, msg = "") {
		// console.log("inside toggle error");
		setError({ show, msg });
	}
	// error
	useEffect(checkRequests, []);
	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				searchGithubUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubProvider, GithubContext };
