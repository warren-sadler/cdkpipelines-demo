#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkpipelinesDemoPipelineStack } from "../lib/cdkpipeline-demo-pipelines-stack";
const app = new cdk.App();
new CdkpipelinesDemoPipelineStack(app, "cdkpipelines-demo-pipelines-stack", {});

app.synth();
