import { Project } from "ts-morph";
import { convertTypeOnlyImports } from "./convertTypeOnlyImports";

const createTestProjectWithImports = (files: Record<string, string>) => {
    const project = new Project({ useInMemoryFileSystem: true });

    // Add each file to the project
    for (const [filePath, content] of Object.entries(files)) {
        project.createSourceFile(filePath, content);
    }

    return project;
};

const applyConversion = async (entryCode: string, dependencies: Record<string, string> = {}): Promise<string> => {
    const files = {
        "test.ts": entryCode,
        ...dependencies
    };

    const project = createTestProjectWithImports(files);
    const sourceFile = project.getSourceFileOrThrow("test.ts");

    await convertTypeOnlyImports(sourceFile);
    return sourceFile.getFullText();
};

describe("convertTypeOnlyImports", () => {
    it("converts full type-only import", async () => {
        const result = await applyConversion(
            `
            import { MyType } from "./types";
            const x: MyType = { foo: "bar" };
        `,
            {
                "types.ts": `export type MyType = { foo: string };`
            }
        );
        expect(result).toContain('import type { MyType } from "./types";');
    });

    it("splits mixed imports", async () => {
        const result = await applyConversion(
            `
            import { MyType, doSomething } from "./utils";
            const x: MyType = { foo: "bar" };
            doSomething(x);
        `,
            {
                "utils.ts": `
                    export type MyType = { foo: string };
                    export function doSomething(arg: any): void {}
                `
            }
        );
        expect(result).toContain('import { doSomething } from "./utils";');
        expect(result).toContain('import type { MyType } from "./utils";');
    });

    it("leaves value-only imports untouched", async () => {
        const result = await applyConversion(
            `
            import { doSomething } from "./utils";
            doSomething();
        `,
            {
                "utils.ts": `
                    export function doSomething(): void {}
                `
            }
        );
        expect(result).toContain('import { doSomething } from "./utils";');
        expect(result).not.toContain('import type');
    });

    it("converts full type-only export", async () => {
        const result = await applyConversion(
            `
            export { MyType } from "./types";
        `,
            {
                "types.ts": `export type MyType = { foo: string };`
            }
        );
        expect(result).toContain('export type { MyType } from "./types";');
    });

    it("splits mixed exports", async () => {
        const result = await applyConversion(
            `
            export { MyType, doSomething } from "./utils";
        `,
            {
                "utils.ts": `
                    export type MyType = { foo: string };
                    export function doSomething(): void {}
                `
            }
        );
        expect(result).toContain('export { doSomething } from "./utils";');
        expect(result).toContain('export type { MyType } from "./utils";');
    });

    it("leaves value-only exports untouched", async () => {
        const result = await applyConversion(
            `
            export { doSomething } from "./utils";
        `,
            {
                "utils.ts": `
                    export function doSomething(): void {}
                `
            }
        );
        expect(result).toContain('export { doSomething } from "./utils";');
        expect(result).not.toContain('export type');
    });

    it("converts unused type re-export", async () => {
        const result = await applyConversion(
            `
            export { MyType } from "./types";
        `,
            {
                "types.ts": `export type MyType = { bar: number };`
            }
        );
        expect(result).toContain('export type { MyType } from "./types";');
    });
});
