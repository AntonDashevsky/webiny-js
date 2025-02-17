import path from "path";
import fs from "fs";
import archiver from "archiver";

export default async (destination = "./pageBuilderInstallation.zip"): Promise<void> => {
    if (fs.existsSync(destination)) {
        return;
    }

    const dir = path.dirname(destination);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const source = path.join(import.meta.dirname, "files");
    const archive = archiver.create("zip", {
        zlib: {
            level: 9
        }
    });
    const stream = fs.createWriteStream(destination);

    return new Promise<void>((resolve, reject) => {
        archive
            .directory(source, false)
            .on("error", err => reject(err))
            .pipe(stream);

        stream.on("close", () => resolve());
        archive.finalize();
    });
};
