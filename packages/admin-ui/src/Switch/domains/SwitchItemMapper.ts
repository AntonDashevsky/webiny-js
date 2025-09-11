import type { SwitchItemFormatted } from "./SwitchItemFormatted";
import type { SwitchItem } from "./SwitchItem";

export class SwitchItemMapper {
    static toFormatted(item: SwitchItem): SwitchItemFormatted {
        return {
            id: item.id,
            label: item.label,
            value: item.value,
            checked: item.checked,
            disabled: item.disabled
        };
    }
}
