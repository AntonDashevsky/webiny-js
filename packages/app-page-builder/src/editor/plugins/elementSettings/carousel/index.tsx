import React from "react";
import CarouselItems from "./Carousel.js";
import { type PbEditorPageElementAdvancedSettingsPlugin } from "~/types.js";

export default {
    name: "pb-editor-page-element-advanced-settings-carousel",
    type: "pb-editor-page-element-advanced-settings",
    elementType: "carousel",
    render() {
        return <CarouselItems />;
    }
} as PbEditorPageElementAdvancedSettingsPlugin;
