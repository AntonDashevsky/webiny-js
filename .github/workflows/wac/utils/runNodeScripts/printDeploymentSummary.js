// This script can only be run if we previously checked out the project and installed all dependencies.
import { getStackOutput } from "@webiny/project";

const args = process.argv.slice(2); // Removes the first two elements
const [cwd] = args;

const adminStackOutput = await getStackOutput({
    folder: "apps/admin",
    env: "dev",
    cwd
});

const websiteStackOutput = await getStackOutput({
    folder: "apps/website",
    env: "dev",
    cwd
});

console.log(`### Deployment Summary
| App | URL |
|-|----|
| Admin Area | [${adminStackOutput.appUrl}](${adminStackOutput.appUrl}) |
| Website | [${websiteStackOutput.appUrl}](${websiteStackOutput.appUrl}) |
`);
