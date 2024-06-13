import React from "react";
import { App } from "@/server";

async function load() {
	"use server";
	return App().api.index.get();
}

export default function Route() {
	const { data } = React.use(load());

	return <pre className="text-blue-500">{data}</pre>;
}
