import React, { useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { type FormAPI } from "@webiny/form";
import { DrawerContent } from "@webiny/ui/Drawer/index.js";
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { QueryBuilder } from "./QueryBuilder/index.js";

import { type FieldDTOWithElement, type FilterDTO } from "~/components/AdvancedSearch/domain/index.js";

import { DrawerContainer } from "./QueryBuilderDrawer.styled.js";
import { QueryBuilderDrawerPresenter, type QueryBuilderFormData } from "./QueryBuilderDrawerPresenter.js";

interface QueryBuilderDrawerProps {
    fields: FieldDTOWithElement[];
    onClose: () => void;
    onSave: (data: FilterDTO) => void;
    onApply: (data: FilterDTO) => void;
    onValidationError: (message: string) => void;
    filter: FilterDTO;
    vm: {
        isOpen: boolean;
    };
}

export const QueryBuilderDrawer = observer(({ filter, ...props }: QueryBuilderDrawerProps) => {
    const presenter = useMemo<QueryBuilderDrawerPresenter>(() => {
        return new QueryBuilderDrawerPresenter();
    }, []);

    useEffect(() => {
        presenter.load(filter);
    }, [filter]);

    const onChange = (data: QueryBuilderFormData) => {
        presenter.setFilter(data);
    };

    const onApply = () => {
        presenter.onApply(
            filter => {
                props.onApply(filter);
            },
            () => {
                props.onValidationError(presenter.vm.invalidMessage);
            }
        );
    };

    const onSave = () => {
        presenter.onSave(
            filter => {
                props.onSave(filter);
            },
            () => {
                props.onValidationError(presenter.vm.invalidMessage);
            }
        );
    };

    useHotkeys({
        zIndex: 55,
        disabled: !props.vm.isOpen,
        keys: {
            esc: props.onClose
        }
    });

    const ref = useRef<FormAPI | null>(null);

    return (
        <DrawerContainer modal open={props.vm.isOpen} onClose={props.onClose}>
            <DrawerContent>
                <Header onClose={props.onClose} />
                <QueryBuilder
                    onForm={form => (ref.current = form)}
                    onSubmit={onApply}
                    onChange={data => onChange(data)}
                    onDeleteGroup={groupIndex => presenter.deleteGroup(groupIndex)}
                    onSetFilterFieldData={(groupIndex, filterIndex, data) =>
                        presenter.setFilterFieldData(groupIndex, filterIndex, data)
                    }
                    onDeleteFilterFromGroup={(groupIndex, filterIndex) =>
                        presenter.deleteFilterFromGroup(groupIndex, filterIndex)
                    }
                    onAddNewFilterToGroup={groupIndex => presenter.addNewFilterToGroup(groupIndex)}
                    onAddGroup={() => presenter.addGroup()}
                    fields={props.fields}
                    vm={presenter.vm}
                />
                <Footer formRef={ref} onClose={props.onClose} onSave={onSave} />
            </DrawerContent>
        </DrawerContainer>
    );
});
