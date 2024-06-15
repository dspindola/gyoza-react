import { APIHandler } from "@/packages/api";

export const GET = APIHandler(() => {
	return {
		data: "hi",
	};
});

export const POST = APIHandler(({ request }) => {
	return request.url;
});

export const DELETE = APIHandler(() => "ok");
