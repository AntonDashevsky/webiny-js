import { createWorkflow, NormalJob } from "github-actions-wac";
import {
    createGlobalBuildCacheSteps,
    createInstallBuildSteps,
    createRunBuildCacheSteps,
    createYarnCacheSteps,
    withCommonParams
} from "./steps/index.js";
import { AWS_REGION, BUILD_PACKAGES_RUNNER, NODE_OPTIONS, NODE_VERSION } from "./utils/index.js";
import { createJob } from "./jobs/index.js";
import {
    DdbStorageOps,
    DdbEsStorageOps,
    DdbOsStorageOps,
    type AbstractStorageOps
} from "./storageOps/index.js";

const ddbStorageOps = new DdbStorageOps();
const ddbEsStorageOps = new DdbEsStorageOps();
const ddbOsStorageOps = new DdbOsStorageOps();

// Will print "next" or "dev". Important for caching (via actions/cache).
const DIR_WEBINY_JS = "${{ needs.baseBranch.outputs.base-branch }}";

const installBuildSteps = createInstallBuildSteps({ workingDirectory: DIR_WEBINY_JS });
const yarnCacheSteps = createYarnCacheSteps({ workingDirectory: DIR_WEBINY_JS });
const globalBuildCacheSteps = createGlobalBuildCacheSteps({ workingDirectory: DIR_WEBINY_JS });
const runBuildCacheSteps = createRunBuildCacheSteps({ workingDirectory: DIR_WEBINY_JS });

const createCheckoutPrSteps = () =>
    [
        {
            name: "Checkout Pull Request",
            "working-directory": DIR_WEBINY_JS,
            run: "gh pr checkout ${{ github.event.issue.number }}",
            env: { GITHUB_TOKEN: "${{ secrets.GH_TOKEN }}" }
        }
    ] as NonNullable<NormalJob["steps"]>;

const createVitestTestsJob = (storageOps?: AbstractStorageOps) => {
    const env: Record<string, string> = { AWS_REGION };

    if (storageOps) {
        if (storageOps.id === "ddb-es,ddb") {
            env["AWS_ELASTIC_SEARCH_DOMAIN_NAME"] = "${{ secrets.AWS_ELASTIC_SEARCH_DOMAIN_NAME }}";
            env["ELASTIC_SEARCH_ENDPOINT"] = "${{ secrets.ELASTIC_SEARCH_ENDPOINT }}";
            env["ELASTIC_SEARCH_INDEX_PREFIX"] = "${{ matrix.testCommand.id }}";
        } else if (storageOps.id === "ddb-os,ddb") {
            // We still use the same environment variables as for "ddb-es" setup, it's
            // just that the values are read from different secrets.
            env["AWS_ELASTIC_SEARCH_DOMAIN_NAME"] = "${{ secrets.AWS_OPEN_SEARCH_DOMAIN_NAME }}";
            env["ELASTIC_SEARCH_ENDPOINT"] = "${{ secrets.OPEN_SEARCH_ENDPOINT }}";
            env["ELASTIC_SEARCH_INDEX_PREFIX"] = "${{ matrix.testCommand.id }}";
        }
    }

    const testCommands = [] as any[];

    return createJob({
        needs: ["constants", "build"],
        name: "${{ matrix.testCommand.title }}",
        strategy: {
            "fail-fast": false,
            matrix: {
                os: ["ubuntu-latest"],
                node: [NODE_VERSION],
                testCommand: "${{ fromJson('" + JSON.stringify(testCommands) + "') }}"
            }
        },
        "runs-on": "${{ matrix.os }}",
        env,
        awsAuth: storageOps && (storageOps.id === "ddb-es,ddb" || storageOps.id === "ddb-os,ddb"),
        checkout: { path: DIR_WEBINY_JS },
        steps: [
            ...yarnCacheSteps,
            ...runBuildCacheSteps,
            ...installBuildSteps,
            ...withCommonParams(
                [{ name: "Run tests", run: "yarn test ${{ matrix.testCommand.cmd }}" }],
                { "working-directory": DIR_WEBINY_JS }
            )
        ]
    });
};

export const pullRequestsCommandVitest = createWorkflow({
    name: "Pull Requests Command - Vitest",
    on: "issue_comment",
    env: {
        NODE_OPTIONS,
        AWS_REGION
    },
    jobs: {
        checkComment: createJob({
            name: `Check comment for /vitest`,
            if: "${{ github.event.issue.pull_request }}",
            checkout: false,
            steps: [
                {
                    name: "Check for Command",
                    id: "command",
                    uses: "xt0rted/slash-command-action@v2",
                    with: {
                        "repo-token": "${{ secrets.GITHUB_TOKEN }}",
                        command: "vitest",
                        reaction: "true",
                        "reaction-type": "eyes",
                        "allow-edits": "false",
                        "permission-level": "write"
                    }
                },
                {
                    name: "Create comment",
                    uses: "peter-evans/create-or-update-comment@v2",
                    with: {
                        "issue-number": "${{ github.event.issue.number }}",
                        body: "Vitest tests have been initiated (for more information, click [here](https://github.com/webiny/webiny-js/actions/runs/${{ github.run_id }})). :sparkles:"
                    }
                }
            ]
        }),
        baseBranch: createJob({
            needs: "checkComment",
            name: "Get base branch",
            outputs: {
                "base-branch": "${{ steps.base-branch.outputs.base-branch }}"
            },
            steps: [
                {
                    name: "Get base branch",
                    id: "base-branch",
                    env: { GITHUB_TOKEN: "${{ secrets.GH_TOKEN }}" },
                    run: 'echo "base-branch=$(gh pr view ${{ github.event.issue.number }} --json baseRefName -q .baseRefName)" >> $GITHUB_OUTPUT'
                }
            ]
        }),
        constants: createJob({
            needs: "baseBranch",
            name: "Create constants",
            outputs: {
                "global-cache-key": "${{ steps.global-cache-key.outputs.global-cache-key }}",
                "run-cache-key": "${{ steps.run-cache-key.outputs.run-cache-key }}"
            },
            checkout: false,
            steps: [
                {
                    name: "Create global cache key",
                    id: "global-cache-key",
                    run: `echo "global-cache-key=\${{ needs.baseBranch.outputs.base-branch }}-\${{ runner.os }}-$(/bin/date -u "+%m%d")-\${{ vars.RANDOM_CACHE_KEY_SUFFIX }}" >> $GITHUB_OUTPUT`
                },
                {
                    name: "Create workflow run cache key",
                    id: "run-cache-key",
                    run: 'echo "run-cache-key=${{ github.run_id }}-${{ github.run_attempt }}-${{ vars.RANDOM_CACHE_KEY_SUFFIX }}" >> $GITHUB_OUTPUT'
                }
            ]
        }),
        build: createJob({
            name: "Build",
            needs: ["baseBranch", "constants"],
            checkout: { path: DIR_WEBINY_JS },
            "runs-on": BUILD_PACKAGES_RUNNER,
            steps: [
                ...createCheckoutPrSteps(),
                ...yarnCacheSteps,
                ...globalBuildCacheSteps,
                ...installBuildSteps,
                ...runBuildCacheSteps
            ]
        }),
        vitestTestsNoStorage: createVitestTestsJob(),
        vitestTestsDdb: createVitestTestsJob(ddbStorageOps),
        vitestTestsDdbEs: createVitestTestsJob(ddbEsStorageOps),
        vitestTestsDdbOs: createVitestTestsJob(ddbOsStorageOps)
    }
});
