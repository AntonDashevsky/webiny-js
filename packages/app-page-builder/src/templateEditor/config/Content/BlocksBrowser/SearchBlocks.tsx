import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import orderBy from "lodash/orderBy.js";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { plugins } from "@webiny/plugins";
import { OverlayLayout } from "@webiny/app-admin/components/OverlayLayout/index.js";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin/components/SplitView/index.js";
import { ScrollList, ListItem, ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { type GenericFormData } from "@webiny/form";
import { ReactComponent as SearchIcon } from "~/editor/assets/icons/search.svg";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm/index.js";

import { ReactComponent as AllIcon } from "@material-design-icons/svg/round/clear_all.svg";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange/index.js";
import { BlocksList } from "./BlocksList.js";
import EditBlockDialog from "./EditBlockDialog.js";
import {
    IconWrapper,
    listItem,
    activeListItem,
    ListItemTitle,
    listStyle,
    TitleContent
} from "./SearchBlocksStyled.js";
import * as Styled from "./StyledComponents.js";
import { type PbEditorBlockCategoryPlugin, type PbEditorBlockPlugin } from "~/types.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { useKeyHandler } from "~/editor/hooks/useKeyHandler.js";
import { UpdateElementActionEvent } from "~/editor/recoil/actions/index.js";
import { createBlockElements } from "~/editor/helpers.js";
import { createBlockReference } from "~/pageEditor/helpers.js";
import { usePageBlocks } from "~/admin/contexts/AdminPageBuilder/PageBlocks/usePageBlocks.js";
import { useRootElement } from "~/editor/hooks/useRootElement.js";

const allBlockCategory: PbEditorBlockCategoryPlugin = {
    type: "pb-editor-block-category",
    name: "pb-editor-block-category-all",
    categoryName: "all",
    title: "All blocks",
    description: "List of all available blocks.",
    icon: <AllIcon />
};

const sortBlocks = (blocks: PbEditorBlockPlugin[]): PbEditorBlockPlugin[] => {
    return blocks.sort(function (a, b) {
        if (a.name === "pb-editor-block-empty") {
            return -1;
        }

        if (b.name === "pb-editor-block-empty") {
            return 1;
        }

        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
};

export interface SearchBarProps {
    onClose: () => void;
}

export const SearchBlocks = ({ onClose }: SearchBarProps) => {
    const eventActionHandler = useEventActionHandler();
    const { showSnackbar } = useSnackbar();
    const content = useRootElement();
    const [search, setSearch] = useState<string>("");
    const [allBlocks, setAllBlocks] = useState<PbEditorBlockPlugin[]>(
        sortBlocks(plugins.byType<PbEditorBlockPlugin>("pb-editor-block"))
    );
    const [blocksToRender, setBlocksToRender] = useState(allBlocks);
    const [editingBlock, setEditingBlock] = useState<PbEditorBlockPlugin | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const pageBlocks = usePageBlocks();

    const switchCategory = useCallback(
        (category: string) => {
            setActiveCategory(category);
            if (category === "all") {
                setBlocksToRender(allBlocks);
                return;
            }

            let blocksToRender = allBlocks;
            if (category === "saved") {
                blocksToRender = blocksToRender.filter(item => {
                    return item.tags && item.tags.includes("saved");
                });
            } else {
                blocksToRender = blocksToRender.filter(item => {
                    return item.blockCategory === category;
                });
            }

            setBlocksToRender(sortBlocks(blocksToRender));
        },
        [allBlocks]
    );

    useEffect(() => {
        switchCategory(activeCategory);
    }, [allBlocks]);

    const allCategories = useMemo(
        () => [
            allBlockCategory,
            ...orderBy(
                plugins.byType<PbEditorBlockCategoryPlugin>("pb-editor-block-category"),
                "title",
                "asc"
            )
        ],
        []
    );

    const { addKeyHandler, removeKeyHandler } = useKeyHandler();

    useEffect(() => {
        addKeyHandler("escape", e => {
            e.preventDefault();
            onClose();
        });

        return () => removeKeyHandler("escape");
    }, []);

    const addBlockToContent = useCallback(
        (plugin: PbEditorBlockPlugin) => {
            const blockToAdd = plugin.tags.includes("saved")
                ? createBlockReference(plugin.name)
                : createBlockElements(plugin.name);

            const element: any = {
                ...content,
                elements: [...content.elements, blockToAdd]
            };
            eventActionHandler.trigger(
                new UpdateElementActionEvent({
                    element,
                    history: true,
                    triggerUpdateElementTree: true
                })
            );

            onClose();
        },
        [content]
    );

    const refreshBlockPlugins = useCallback(() => {
        setAllBlocks(plugins.byType<PbEditorBlockPlugin>("pb-editor-block"));
    }, []);

    const getCategoryBlocksCount = useCallback(
        (category: string) => {
            if (category === "all") {
                return allBlocks.length;
            }
            return allBlocks.filter(pl => pl.blockCategory === category).length;
        },
        [allBlocks]
    );

    const deleteBlock = useCallback(async (plugin: PbEditorBlockPlugin) => {
        try {
            if (!plugin.id) {
                return;
            }

            await pageBlocks.deleteBlock(plugin.id);
            showSnackbar(
                <span>
                    Block <strong>{plugin.title}</strong> was deleted!
                </span>
            );
        } catch (error) {
            showSnackbar(error.message);
            return;
        }

        refreshBlockPlugins();
    }, []);

    const updateBlock = useCallback(
        async ({ title: name, blockCategory }: GenericFormData) => {
            if (!editingBlock || !editingBlock.id) {
                return;
            }

            try {
                await pageBlocks.updateBlock({
                    id: editingBlock.id,
                    name,
                    category: blockCategory
                });
            } catch (error) {
                showSnackbar(error.message);
                return;
            }

            refreshBlockPlugins();
            setEditingBlock(null);
            setTimeout(() => {
                // For better UX, success message is shown after 300ms.
                showSnackbar(
                    <span>
                        Block <strong>{name}</strong> was saved!
                    </span>
                );
            }, 300);
        },
        [editingBlock]
    );

    const filterBlocks = useCallback((blocks: PbEditorBlockPlugin[], search: string) => {
        if (!search) {
            return blocks;
        }

        return blocks.filter(item => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });
    }, []);

    const renderSearchInput = useCallback(() => {
        return (
            <Styled.Input>
                <Icon className={Styled.searchIcon} icon={<SearchIcon />} />
                <DelayedOnChange value={search} onChange={setSearch}>
                    {({ value, onChange }) => (
                        <input
                            autoFocus
                            type={"text"}
                            placeholder="Search blocks..."
                            value={value}
                            onChange={ev => onChange(ev.target.value)}
                        />
                    )}
                </DelayedOnChange>
            </Styled.Input>
        );
    }, [search]);

    const categoryPlugin = allCategories.find(pl => pl.categoryName === activeCategory) || {
        title: null,
        icon: <></>
    };

    return (
        <OverlayLayout barMiddle={renderSearchInput()} onExited={onClose}>
            <SplitView>
                <LeftPanel span={3}>
                    <ScrollList className={listStyle}>
                        {allCategories.map(p => (
                            <ListItem
                                key={p.name}
                                className={classNames(
                                    listItem,
                                    activeCategory === p.categoryName && activeListItem
                                )}
                                onClick={() => switchCategory(p.categoryName)}
                            >
                                <ListItemGraphic>
                                    <Icon icon={p.icon} />
                                </ListItemGraphic>
                                <TitleContent>
                                    <ListItemTitle>
                                        {p.title} ({getCategoryBlocksCount(p.categoryName)})
                                    </ListItemTitle>
                                    <Typography use={"body2"}>{p.description}</Typography>
                                </TitleContent>
                            </ListItem>
                        ))}
                    </ScrollList>
                </LeftPanel>
                <RightPanel span={9}>
                    {activeCategory && (
                        <SimpleForm>
                            <SimpleFormHeader
                                title={categoryPlugin.title}
                                icon={<IconWrapper>{categoryPlugin.icon}</IconWrapper>}
                            >
                                {/*<IconButton icon={<RefreshIcon />} onClick={refetchBlocks} />*/}
                            </SimpleFormHeader>
                            <SimpleFormContent>
                                <Styled.BlockList>
                                    <BlocksList
                                        category={activeCategory}
                                        addBlock={addBlockToContent}
                                        blocks={filterBlocks(blocksToRender, search)}
                                        onEdit={plugin => setEditingBlock(plugin)}
                                        onDelete={plugin => deleteBlock(plugin)}
                                    />
                                </Styled.BlockList>

                                <EditBlockDialog
                                    onClose={() => setEditingBlock(null)}
                                    onSubmit={data => updateBlock(data)}
                                    open={!!editingBlock}
                                    plugin={editingBlock}
                                    loading={pageBlocks.loading}
                                />
                            </SimpleFormContent>
                        </SimpleForm>
                    )}
                </RightPanel>
            </SplitView>
        </OverlayLayout>
    );
};
