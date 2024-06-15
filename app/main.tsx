import "@/gyoza-env.d.ts";
import type React from "react";
import { preload } from "react-dom";
import Layout from "./layout";
import classnames from "classnames";

export default function App({
	children,
}: {
	children?: React.ReactNode;
}) {
	preload("https://cdn.tailwindcss.com", {
		as: "script",
	});

	return <Layout>{children}</Layout>;
}
