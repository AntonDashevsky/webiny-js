import crud from "./crud.js";
import graphql from "./graphql.js";
import { type ImportExportPluginsParams } from "~/graphql/types.js";
import { createTasks } from "~/tasks/index.js";

export default (params: ImportExportPluginsParams) => [crud(params), graphql, createTasks()];
