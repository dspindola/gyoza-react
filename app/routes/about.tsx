import { api } from "@/app/libs/api";
import { use } from "react";

export default function Route() {
	const data = use(api.index.get().then(r => r.data?.data));

	return <pre className="text-blue-500">{data}</pre>;
}
