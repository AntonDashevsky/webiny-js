import { buttonProcessor } from "./button.js";
import { imageProcessor } from "./image.js";
import { imagesProcessor } from "./images.js";
import { paragraphProcessor } from "./paragraph.js";

import { PbAcoContext } from "~/types.js";

export const createPageProcessors = (context: PbAcoContext) => {
    buttonProcessor(context);
    imageProcessor(context);
    imagesProcessor(context);
    paragraphProcessor(context);
};
