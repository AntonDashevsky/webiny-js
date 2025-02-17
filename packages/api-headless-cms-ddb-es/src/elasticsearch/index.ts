import elasticsearchIndexingPlugins from "./indexing/index.js";
import elasticsearchSearchPlugins from "./search/index.js";

export default () => [elasticsearchIndexingPlugins(), elasticsearchSearchPlugins()];
