import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineProps,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    const pipeline = new CodePipeline(this, "pipeline", {
      pipelineName: "MyServicePipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "warren-sadler/cdkpipelines-demo",
          "main"
        ),
        commands: ["npm install", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
