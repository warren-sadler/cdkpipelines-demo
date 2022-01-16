import { CfnOutput, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkpipelinesDemoStack } from "./cdkpipelines-demo-stack";

export class CdkpipelinesDemoStage extends Stage {
  public readonly urlOutput: CfnOutput;
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    const service = new CdkpipelinesDemoStack(this, "web-service");
    this.urlOutput = service.urlOutput;
  }
}
