import { Project } from "ts-morph";
import { convertTypeOnlyImports } from "./convertTypeOnlyImports";

function setupTestProject(
    fileContent: string,
    dependencies: Record<string, string> = {},
    entryName = "src/index.ts"
) {
    const project = new Project({ useInMemoryFileSystem: true });
    const entryFile = project.createSourceFile(entryName, fileContent);

    for (const [path, code] of Object.entries(dependencies)) {
        project.createSourceFile(path, code);
    }

    return { project, entryFile };
}

describe("convertTypeOnlyImports", () => {
    it("splits mixed imports", async () => {
        const { entryFile } = setupTestProject(
            `import { A, B } from "./utils";
            const a: A = {};
            console.log(B);`,
            {
                "src/utils.ts": `
                    export type A = { value: string };
                    export const B = 123;
                `
            }
        );

        await convertTypeOnlyImports(entryFile);
        const output = entryFile.getText();
        expect(output).toContain('import { B } from "./utils";');
        expect(output).toContain('import type { A } from "./utils";');
    });

    it("removes full type import and avoids empty import", async () => {
        const { entryFile } = setupTestProject(
            `import { A, B } from "./types";\nconst a: A = {};\nconst b: B = {};`,
            {
                "src/types.ts": `
                    export type A = { a: number };
                    export interface B { b: string }
                `
            }
        );

        await convertTypeOnlyImports(entryFile);
        const output = entryFile.getText();
        expect(output.trim()).toBe(
            'import type { A, B } from "./types";\n\nconst a: A = {};\nconst b: B = {};'
        );
    });

    it("preserves value-only imports", async () => {
        const { entryFile } = setupTestProject(
            `import { A, B } from "./values";\nconsole.log(A, B);`,
            {
                "src/values.ts": `
                    export const A = 1;
                    export function B() {}
                `
            }
        );

        await convertTypeOnlyImports(entryFile);
        const output = entryFile.getText();
        expect(output).toContain('import { A, B } from "./values";');
        expect(output).not.toContain("import type");
    });

    it("splits mixed exports", async () => {
        const { entryFile } = setupTestProject(`export { A, B } from "./mod";`, {
            "src/mod.ts": `
                    export interface A { x: number }
                    export const B = () => {};
                `
        });

        await convertTypeOnlyImports(entryFile);
        const output = entryFile.getText();
        expect(output).toContain('export { B } from "./mod";');
        expect(output).toContain('export type { A } from "./mod";');
    });

    it("removes full type-only re-export correctly", async () => {
        const { entryFile } = setupTestProject(`export { A, B } from "./types";`, {
            "src/types.ts": `
                    export type A = number;
                    export interface B { b: string }
                `
        });

        await convertTypeOnlyImports(entryFile);
        const output = entryFile.getText();
        expect(output).toContain('export type { A, B } from "./types";');
        expect(output).not.toContain("export {");
    });

    it("does not convert value exports", async () => {
        const { entryFile } = setupTestProject(`export { A, B } from "./values";`, {
            "src/values.ts": `
                    export const A = 1;
                    export function B() {}
                `
        });

        await convertTypeOnlyImports(entryFile);
        const output = entryFile.getText();
        expect(output).toContain('export { A, B } from "./values";');
        expect(output).not.toContain("export type");
    });

    it("preserves already correct mixed exports", async () => {
        const { entryFile } = setupTestProject(
            `
        export { something, type SomethingType } from "./mod";
        `,
            {
                "src/mod.ts": `
                export function something() {}
                export interface SomethingType {}
            `
            }
        );

        await convertTypeOnlyImports(entryFile);
        const output = entryFile.getText();
        expect(output).toContain('export { something, type SomethingType } from "./mod";');
    });
});
