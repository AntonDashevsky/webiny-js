import searchDataByKey from "./searchDataByKey.js";

export default (response: Record<string, string>) => searchDataByKey("meta", response);
