import { Cli2Sdk } from "./Cli2Sdk";

async function main() {
    const cli2Sdk = Cli2Sdk.init();
    // const pro = await cli2.getCli2();
    //
    // console.log("1.", pro);
    //
    // const api = await cli2.getApp("api");
    // console.log("2.", api);

    const apiPackages = cli2Sdk.listCommands();
}

await main();
