import omit from "lodash/omit.js";
import { blockAtom, type BlockAtomType, type BlockWithContent } from "~/blockEditor/state/index.js";
import { type EditorStateInitializerFactory } from "~/editor/Editor.js";

export const createStateInitializer = (block: BlockWithContent): EditorStateInitializerFactory => {
    return () => ({
        content: block.content,
        recoilInitializer({ set }) {
            /**
             * We always unset the content because we are not using it via the block atom.
             */
            const blockData: BlockAtomType = omit(block, ["content"]);
            set(blockAtom, { ...blockData });
        }
    });
};
