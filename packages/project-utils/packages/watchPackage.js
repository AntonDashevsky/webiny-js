import path from "path";

// The watch functionality is actually not part of `@babel/core`, but
// part of the `@babel/cli` library. That's the reason we're extracting
// the watch functionality out of it.
export default async options => {
    const [parseArgv, dir, file] = await Promise.all([
        import("@babel/cli/lib/babel/options").then(m => m.default ?? m),
        import("@babel/cli/lib/babel/dir").then(m => m.default ?? m),
        import("@babel/cli/lib/babel/file".then(m => m.default ?? m))
    ]);

    const parsedArgv = parseArgv([
        "_",
        "_",
        path.join(options.cwd, "src"),
        "-d",
        path.join(options.cwd, "dist"),
        "--source-maps",
        "--copy-files",
        "--extensions",
        `.ts,.tsx`,
        "--watch"
    ]);

    if (parsedArgv) {
        const fn = parsedArgv.cliOptions.outDir ? dir : file;
        return fn(parsedArgv).catch(err => {
            console.error(err);
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};
