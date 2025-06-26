import { ProjectSdk } from "~/ProjectSdk";

import { createImplementation } from "@webiny/di-container";
import { BeforeBuildHook } from "~/abstractions";

describe("project root detection", () => {
    it("should be able to detect project root", async () => {
        class MyBeforeBuildHook implements BeforeBuildHook.Interface {
            execute() {
                console.log("1");
            }
        }

        class MyOtherBeforeBuildHook implements BeforeBuildHook.Interface {
            execute() {
                console.log("2");
            }
        }

        const cwd = __dirname;
        const project = ProjectSdk.init(cwd, {
            beforeBuildHooks: [
                createImplementation({
                    abstraction: BeforeBuildHook,
                    implementation: MyBeforeBuildHook,
                    dependencies: []
                }),
                createImplementation({
                    abstraction: BeforeBuildHook,
                    implementation: MyOtherBeforeBuildHook,
                    dependencies: []
                })
            ]
        });

        const apiPackages = await project.buildApp({
            app: "api",
            env: "dev"
        });
    });
});

// describe("project root detection", () => {
//     it("should be able to detect project root", async () => {
//         const project = new Project(
//             path.join(__dirname, "mocks", "projectDetection", "a", "b", "c")
//         );
//
//         expect(project.paths).toMatchObject({
//             dotWebinyFolder: expect.stringMatching(
//                 /mocks[\\/]+projectDetection[\\/]+webiny\.config\.ts[\\/]+\.webiny$/
//             ),
//             rootFolder: expect.stringMatching(
//                 /mocks[\\/]+projectDetection[\\/]+webiny\.config\.ts$/
//             )
//         });
//     });
// });
