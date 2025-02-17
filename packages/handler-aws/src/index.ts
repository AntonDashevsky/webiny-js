import "./gateway/register.js";
import "./s3/register.js";
import "./dynamodb/register.js";
import "./sqs/register.js";
import "./eventBridge/register.js";
import "./sns/register.js";

export * from "./utils/index.js";

/**
 * API Gateway
 */
export {
    createHandler as createApiGatewayHandler,
    type HandlerParams as CreateApiGatewayHandlerParams,
    type HandlerCallable as ApiGatewayHandlerCallable,
    RoutePlugin,
    createRoute as createApiGatewayRoute
} from "~/gateway/index.js";

/**
 * S3
 */
//
export {
    createHandler as createS3Handler,
    type HandlerParams as CreateS3HandlerParams,
    S3EventHandler,
    type S3EventHandlerCallable,
    type S3EventHandlerCallableParams,
    createEventHandler as createS3EventHandler
} from "~/s3/index.js";

/**
 * DynamoDB Stream
 */
//
export {
    createHandler as createDynamoDBHandler,
    type HandlerParams as CreateDynamoDBHandlerParams,
    DynamoDBEventHandler,
    type DynamoDBEventHandlerCallable,
    type DynamoDBEventHandlerCallableParams,
    createEventHandler as createDynamoDBEventHandler
} from "~/dynamodb/index.js";

/**
 * SQS
 */
//
export {
    createHandler as createSQSHandler,
    type HandlerParams as CreateSQSHandlerParams,
    SQSEventHandler,
    type SQSEventHandlerCallable,
    type SQSEventHandlerCallableParams,
    createEventHandler as createSQSEventHandler
} from "~/sqs/index.js";

/**
 * SNS
 */
//
export {
    createHandler as createSNSHandler,
    type HandlerParams as CreateSNSHandlerParams,
    SNSEventHandler,
    type SNSEventHandlerCallable,
    type SNSEventHandlerCallableParams,
    createEventHandler as createSNSEventHandler
} from "~/sns/index.js";

/**
 * EventBridge
 */
//
export {
    createHandler as createEventBridgeHandler,
    type HandlerParams as CreateEventBridgeHandlerParams,
    EventBridgeEventHandler,
    type EventBridgeEventHandlerCallable,
    type EventBridgeEventHandlerCallableParams,
    createEventHandler as createEventBridgeEventHandler
} from "~/eventBridge/index.js";

export {
    createHandler as createRawHandler,
    type CreateHandlerParams as CreateRawHandlerParams,
    type HandlerCallable as RawHandlerCallable,
    createEventHandler as createRawEventHandler,
    type RawEventHandlerCallableParams,
    type RawEventHandlerCallable,
    RawEventHandler
} from "~/raw/index.js";

export { ContextPlugin, createContextPlugin, type ContextPluginCallable } from "@webiny/handler";

export * from "./createHandler.js";
export * from "./sourceHandler.js";
