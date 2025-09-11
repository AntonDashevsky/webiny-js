import type { RadioItemFormatted } from "./RadioItemFormatted";
import type { RadioItem } from "./RadioItem";

export class RadioItemFormatter {
    static format(item: RadioItem): RadioItemFormatted {
        return {
            id: item.id,
            label: item.label,
            value: String(item.value),
            disabled: item.disabled
        };
    }
}
