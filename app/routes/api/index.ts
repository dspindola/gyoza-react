import { APIHandler } from "@/packages/api/route";

export const GET = APIHandler((ctx) => {
	return {
		data: "hi"
	}
})

export const POST = APIHandler(({ request }) => {
	return request.url
});

export const DELETE = APIHandler(() => "ok")