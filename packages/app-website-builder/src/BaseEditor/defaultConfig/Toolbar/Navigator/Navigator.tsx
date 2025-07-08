import React, { useMemo, useCallback } from "react";
import { type NodeDto, Tree, type TreeProps } from "@webiny/admin-ui";
import type { Document } from "~/sdk";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { EditorState } from "~/editorSdk/Editor";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { InlineSvg } from "~/BaseEditor/defaultConfig/Toolbar/InsertElements/InlineSvg";
import get from "lodash/get";
import { observer } from "mobx-react-lite";
import { InfoMessage } from "~/BaseEditor/defaultConfig/Sidebar/InfoMessage";

// Node type for the Tree component.
type ElementNode = NodeDto<{
    draggable: boolean;
    icon: React.ReactNode;
    parent: {
        id: string;
        slot: string;
        index: number;
    };
}>;

// Element data extracted from the Document state.
type ElementNodeData = {
    id: string;
    label: string;
    image: string;
    canDrag: boolean;
    parent: {
        id: string;
        slot: string;
        index: number;
    };
};

function flattenElements(elements: Record<string, ElementNodeData>, activeElementId?: string) {
    const result: ElementNode[] = [];
    const asArray = Object.values(elements);

    for (const key in elements) {
        const node = elements[key];

        // Skip root element.
        if (!node.parent) {
            continue;
        }

        result.push({
            id: node.id,
            label: node.label,
            parentId: node.parent.id,
            active: node.id === activeElementId,
            droppable: asArray.filter(el => el.parent?.id === node.id).length > 0,
            data: {
                parent: node.parent,
                icon: <InlineSvg src={node.image} className={"wby-fill-neutral-strong"} />,
                draggable: node.canDrag
            }
        });
    }

    return result;
}

function getElementNodeData(
    components: EditorState["components"],
    elements: Document["elements"],
    bindings: Document["bindings"]
): Record<string, ElementNodeData> {
    const getIndex = (elementId: string, parentId: string, slot: string) => {
        const elementBindings = bindings[parentId];
        if (!elementBindings) {
            return -1;
        }

        const slotValue = get(elementBindings, `inputs.${slot}`);
        if (!slotValue) {
            return -1;
        }

        if (slotValue.list) {
            return slotValue.static.indexOf(elementId);
        }

        return -1;
    };

    return Object.values(elements).reduce((acc, element) => {
        if (element.id === "root") {
            return {
                ...acc,
                [element.id]: {
                    id: element.id,
                    label: "Root",
                    image: ""
                }
            };
        }

        const component = components[element.component.name];

        const parentId = element.parent!.id;
        const slot = element.parent!.slot;

        return {
            ...acc,
            [element.id]: {
                id: element.id,
                label: component.label ?? component.name,
                image: component.image,
                canDrag: component.canDrag,
                parent: {
                    id: parentId,
                    slot,
                    index: getIndex(element.id, parentId, slot)
                }
            }
        };
    }, {});
}

export const Navigator = observer(() => {
    const editor = useDocumentEditor();
    const [activeElement] = useActiveElement();

    const elements = editor.getDocumentState().read().elements;
    const bindings = editor.getDocumentState().read().bindings;

    const components = useSelectFromEditor(state => {
        return state.components;
    });

    const elementNodes = getElementNodeData(components, elements, bindings);

    const activeAncestors = useMemo(() => {
        if (!activeElement) {
            return [];
        }

        const ancestors: string[] = [activeElement.id];
        let parent = elementNodes[activeElement.id].parent;
        while (parent) {
            ancestors.push(parent.id);
            parent = elementNodes[parent.id].parent;
        }
        return ancestors.reverse();
    }, [elementNodes, activeElement]);

    const nodes = useMemo(() => {
        return flattenElements(elementNodes, activeElement?.id).sort((a, b) => {
            return a.data!.parent.index - b.data!.parent.index;
        });
    }, [elementNodes, activeElement]);

    const highlightElement = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const nodeId = e.currentTarget.getAttribute("data-node-id");

        if (nodeId) {
            editor.executeCommand(Commands.HighlightElement, { id: nodeId });
        }
    }, []);

    const activateElement = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const nodeId = e.currentTarget.getAttribute("data-node-id");

        if (nodeId) {
            editor.executeCommand(Commands.SelectElement, { id: nodeId });
        }
    }, []);

    const renderer: TreeProps["renderer"] = node => {
        return (
            <Tree.Item.Content
                data-node-id={node.id}
                onMouseOver={highlightElement}
                onClick={activateElement}
            >
                <Tree.Item.Icon label={node.label} element={node.icon} size={"sm"} />
                {node.label}
                {/* ({node.id.substring(0, 6)})*/}
            </Tree.Item.Content>
        );
    };

    if (Object.keys(elementNodes).length <= 1) {
        return <InfoMessage message={"No elements to display."} />;
    }

    return (
        <Tree
            autoExpandOnDragOver={false}
            insertDroppableFirst={false}
            nodes={nodes}
            rootId={"root"}
            renderer={renderer}
            sort={false}
            defaultOpenNodeIds={activeAncestors}
            dropTargetOffset={5}
            placeholderRender={(node, { depth }) => {
                return <Placeholder depth={depth} node={node} />;
            }}
            onDrop={(newTree, { dragSource }) => {
                if (!dragSource || !dragSource.data) {
                    return;
                }

                const parent = dragSource.data.parent;

                const sameLevelNodes = newTree.filter(n => n.parentId === dragSource.parentId);
                const newIndex = sameLevelNodes.findIndex(n => n.id === dragSource.id);
                editor.executeCommand(Commands.MoveElement, {
                    elementId: dragSource.id,
                    parentId: parent.id,
                    slot: parent.slot,
                    index: newIndex
                });
            }}
            canDrag={node => node.data?.draggable ?? true}
            canDrop={(_, { dragSource, dropTargetId }) => {
                // Only allow dropping within the same parent (for now).
                if (dragSource?.parentId === dropTargetId) {
                    return true;
                }
                return false;
            }}
        />
    );
});

type PlaceholderProps = {
    node: any;
    depth: number;
};

const Placeholder = (props: PlaceholderProps) => (
    <div
        className={"wby-bg-primary-default"}
        style={{
            height: 2,
            zIndex: 999,
            position: "absolute",
            right: 0,
            transform: "translateY(-50%)",
            top: -2,
            left: props.depth * 24
        }}
    ></div>
);
