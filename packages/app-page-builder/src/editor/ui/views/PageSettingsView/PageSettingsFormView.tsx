import { type UIElement } from "@webiny/app-admin/ui/UIElement.js";
import { FormView } from "@webiny/app-admin/ui/views/FormView.js";
import { PageSettingsView } from "../PageSettingsView.js";
import { type UsePageSettings } from "~/pageEditor/hooks/usePageSettings.js";

export class PageSettingsFormView extends FormView {
    constructor(id: string) {
        super(id, { setupForm: false });

        this.getSubmitButtonElement().setLabel("Save Settings");
        this.applyPlugins(PageSettingsFormView);
    }

    /**
     * Add a field to form content.
     */
    public addField<TElement extends UIElement = UIElement>(element: TElement): TElement {
        return this.getFormContentElement().addElement<TElement>(element);
    }

    public getPageSettingsHook(): UsePageSettings {
        const parent = this.getParentByType<PageSettingsView>(PageSettingsView);
        return parent.getPageSettingsHook();
    }
}
