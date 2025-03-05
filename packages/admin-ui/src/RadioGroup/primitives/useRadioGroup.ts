import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { RadioGroupPrimitiveProps } from "./RadioGroupPrimitive";
import { RadioGroupPresenter, RadioGroupPresenterParams } from "./presenters/RadioGroupPresenter";

export const useRadioGroup = (props: RadioGroupPrimitiveProps) => {
    const params: RadioGroupPresenterParams = useMemo(
        () => ({
            items: props.items,
            onValueChange: props.onValueChange
        }),
        [props.items, props.onValueChange]
    );

    const presenter = useMemo(() => {
        const presenter = new RadioGroupPresenter();
        presenter.init(params);
        return presenter;
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValue: presenter.changeValue };
};
