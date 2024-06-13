import { hydrateRoot } from "react-dom/client";
import App from "./main";

hydrateRoot(document.body, <App />, {
	onCaughtError(error, errorInfo) {
		console.log(error, errorInfo);
	},
});
