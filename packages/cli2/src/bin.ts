async function main() {
    // todo: configs
    // yarn parse

    const cli = Cli.fromConfig({...});

    await cli.run();

}