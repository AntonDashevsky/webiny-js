import path from "path";
import dotProp from "dot-prop-immutable";
import loadJson from "load-json-file";
import fs from "fs-extra";
import { PbImportExportContext } from "~/graphql/types.js";
import { FileUploadsData } from "~/types.js";
import { PageBlock } from "@webiny/api-page-builder/types.js";
import { s3Stream } from "~/export/s3Stream.js";
import { uploadAssets } from "~/import/utils/uploadAssets.js";
import { deleteFile } from "@webiny/api-page-builder/graphql/crud/install/utils/downloadInstallFiles.js";
import { deleteS3Folder } from "~/import/utils/deleteS3Folder.js";
import { updateFilesInData } from "~/import/utils/updateFilesInData.js";
import { INSTALL_EXTRACT_DIR } from "~/import/constants.js";
import { ExportedBlockData } from "~/export/process/exporters/BlockExporter.js";
import { ElementIdsProcessor } from "~/import/process/blocks/ElementIdsProcessor.js";

interface ImportBlockParams {
    key: string;
    blockKey: string;
    context: PbImportExportContext;
    fileUploadsData: FileUploadsData;
}

export async function importBlock({
    blockKey,
    context,
    fileUploadsData
}: ImportBlockParams): Promise<Pick<PageBlock, "name" | "content" | "blockCategory">> {
    const log = console.log;

    // Making Directory for block in which we're going to extract the block data file.
    const BLOCK_EXTRACT_DIR = path.join(INSTALL_EXTRACT_DIR, blockKey);
    fs.ensureDirSync(BLOCK_EXTRACT_DIR);

    const blockDataFileKey = dotProp.get(fileUploadsData, `data`);
    const BLOCK_DATA_FILE_PATH = path.join(BLOCK_EXTRACT_DIR, path.basename(blockDataFileKey));

    log(`Downloading Block data file: ${blockDataFileKey} at "${BLOCK_DATA_FILE_PATH}"`);
    // Download and save block data file in disk.
    const readStream = await s3Stream.readStream(blockDataFileKey);
    const writeStream = fs.createWriteStream(BLOCK_DATA_FILE_PATH);

    await new Promise((resolve, reject) => {
        readStream.on("error", reject).pipe(writeStream).on("finish", resolve).on("error", reject);
    });

    // Load the block data file from disk.
    log(`Load file ${blockDataFileKey}`);

    const {
        category,
        files,
        block: rawBlock
    } = await loadJson<ExportedBlockData>(BLOCK_DATA_FILE_PATH);

    const blockProcessor = new ElementIdsProcessor();
    const block = blockProcessor.process(rawBlock);

    // Only update block data if there are files.
    if (files && Array.isArray(files) && files.length > 0) {
        // Upload block assets.
        const fileIdToNewFileMap = await uploadAssets({
            context,
            files,
            fileUploadsData
        });

        console.log(
            "After uploadAssets:fileIdToNewFileMap",
            JSON.stringify(Object.fromEntries(fileIdToNewFileMap))
        );

        const settings = await context.fileManager.getSettings();

        const { srcPrefix = "" } = settings || {};
        updateFilesInData({
            data: block.content || {},
            fileIdToNewFileMap,
            srcPrefix
        });
    }

    let loadedCategory;
    if (category) {
        loadedCategory = await context.pageBuilder.getBlockCategory(category?.slug);
        if (!loadedCategory) {
            loadedCategory = await context.pageBuilder.createBlockCategory({
                name: category.name,
                slug: category.slug,
                icon: category.icon,
                description: category.description
            });
        }
    } else {
        let importedBlocksCategory = await context.pageBuilder.getBlockCategory("imported-blocks");

        if (!importedBlocksCategory) {
            importedBlocksCategory = await context.pageBuilder.createBlockCategory({
                name: "Imported Blocks",
                slug: "imported-blocks",
                description: "Imported blocks",
                icon: "fas/star"
            });
        }

        loadedCategory = importedBlocksCategory;
    }

    log("Removing Directory for block...");
    await deleteFile(blockKey);

    log(`Remove block contents from S3...`);
    await deleteS3Folder(path.dirname(fileUploadsData.data));

    return { ...block, blockCategory: loadedCategory!.slug };
}
