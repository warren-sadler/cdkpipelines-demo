import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async () => ({
  statusCode: 200,
  body: "Hello from a Lambda Function!",
});
