import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lamdba from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import * as path from "path";

export class CdkpipelinesDemoStack extends Stack {
  urlOutput: CfnOutput;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const handler = new lamdba.Function(this, "lambda", {
      runtime: lamdba.Runtime.NODEJS_14_X,
      code: lamdba.Code.fromAsset(path.resolve(__dirname, "./lambdas")),
      handler: "handler.handler",
      logRetention: RetentionDays.ONE_DAY,
    });
    const gw = new apigateway.LambdaRestApi(this, "gw", {
      description: "Endpoint for a simple Lambda-powered web service",
      handler,
    });
    this.urlOutput = new CfnOutput(this, "URL", {
      value: gw.url,
    });
  }
}
