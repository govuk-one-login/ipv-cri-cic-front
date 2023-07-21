import axios from "axios";

const API = axios.create({baseURL: "https://frontend-ddunford-cic.review-c.dev.account.gov.uk/"});

describe("CIC frontend API WAF association smoke test", () => {
	it("should filter this bad request with a known bad bot user agent", async () => {
		const path = "/test";
		const headers = {
			"User-Agent": "nessus",
		};
		const response = await API.get(path,{
			validateStatus: status => (status >= 200 && status < 501),
			headers,
		});
		expect(response.status).toBe(403);
	});
});
