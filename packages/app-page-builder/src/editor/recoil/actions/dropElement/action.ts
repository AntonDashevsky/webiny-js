import { type DragObjectWithTypeWithTarget } from "~/editor/components/Droppable.js";
import {
    type PbEditorPageElementPlugin,
    type EventActionCallable,
    type EventActionHandlerCallableState,
    type PbEditorElement
} from "~/types.js";
import { plugins } from "@webiny/plugins";
import { type DropElementActionArgsType } from "./types.js";
import { onReceived } from "~/editor/helpers.js";

const elementPluginType = "pb-editor-page-element";

const getElementTypePlugin = (type: string): PbEditorPageElementPlugin => {
    const pluginsByType = plugins.byType<PbEditorPageElementPlugin>(elementPluginType);
    const plugin = pluginsByType.find(pl => pl.elementType === type);
    if (!plugin) {
        throw new Error(`There is no plugin in "${elementPluginType}" for element type ${type}`);
    }
    return plugin;
};

const getSourceElement = async (
    state: EventActionHandlerCallableState,
    source: DragObjectWithTypeWithTarget
): Promise<PbEditorElement | DragObjectWithTypeWithTarget> => {
    if (source.id) {
        const element = await state.getElementById(source.id);
        return (await state.getElementTree({ element })) as PbEditorElement;
    }

    return source;
};

export const dropElementAction: EventActionCallable<DropElementActionArgsType> = async (
    state,
    meta,
    args
) => {
    if (!args) {
        return {
            actions: []
        };
    }
    const { source, target } = args;
    const { id, type, position } = target;
    const targetElement = await state.getElementById(id);
    if (!targetElement) {
        throw new Error(`There is no element with id "${id}"`);
    }
    const plugin = getElementTypePlugin(type);

    const sourceElement = await getSourceElement(state, source);

    const onReceivedCallback = plugin.onReceived || onReceived;

    return onReceivedCallback!({
        state,
        meta,
        source: sourceElement,
        target: targetElement,
        position: position
    });
};
