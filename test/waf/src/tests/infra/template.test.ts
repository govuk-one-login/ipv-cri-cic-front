import { Template } from "@aws-cdk/assertions";
const { schema } = require("yaml-cfn");
import { readFileSync } from "fs";
import { load } from "js-yaml";

// https://docs.aws.amazon.com/cdk/v2/guide/testing.html <--- how to use this file

let template: Template;

describe("Infra", () => {
	beforeAll(() => {
		const yamltemplate: any = load(
			readFileSync("../../template.yaml", "utf-8"),
			{ schema },
		);
		template = Template.fromJSON(yamltemplate);
	});

	describe("WAF Associations", () => {
		it("there should be a WAF associated with every Application Load Balancer", async () => {
			const loadBalancers = template.findResources("AWS::ElasticLoadBalancingV2::LoadBalancer", {
				Type: "application",
			});
			const loadBalancerList = Object.keys(loadBalancers);
			loadBalancerList.forEach((loadBalancer) => {
				template.hasResourceProperties("AWS::WAFv2::WebACLAssociation", {
					ResourceArn: {
						// "Fn::Sub": "arn:aws:apigateway:${AWS::Region}::/restapis/${"+loadBalancer+"}/stages/${"+loadBalancer+".Stage}",
						"Fn::Ref": loadBalancer,
					},
				});
			});
		});
	});
});
