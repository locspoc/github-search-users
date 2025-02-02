import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
export const domain = `${process.env.REACT_APP_AUTH0_DOMAIN}`;
export const clientId = `${process.env.REACT_APP_AUTH0_CLIENTID}`;

// console.log("clientId: ", clientId);
// console.log("clientId: ", process.env.REACT_APP_AUTH0_CLIENTID);

// ${process.env.AUTH0_DOMAIN};
ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin}
			// cacheLocation="localStorage"
		>
			<GithubProvider>
				<App />
			</GithubProvider>
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
