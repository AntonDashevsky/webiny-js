import blocks from "./graphql/blocks.gql.js";
import pages from "./graphql/pages.gql.js";
import templates from "./graphql/templates.gql.js";
import importExportTask from "./graphql/importExportTasks.gql.js";
import { type GraphQLSchemaPlugin } from "@webiny/handler-graphql/types.js";

export default [blocks, pages, templates, importExportTask] as GraphQLSchemaPlugin[];
