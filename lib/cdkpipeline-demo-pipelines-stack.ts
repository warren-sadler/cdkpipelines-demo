import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineProps,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { CdkpipelinesDemoStage } from "./cdkpipelines-demo-stage";

export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    const preprod = new CdkpipelinesDemoStage(this, "pre-prod");
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
    pipeline.addStage(preprod, {
      post: [
        new ShellStep("TestService", {
          commands: ["curl -Ssf $ENDPOINT_URL"],
          envFromCfnOutputs: {
            ENDPOINT_URL: preprod.urlOutput,
          },
        }),
      ],
    });
  }
}
