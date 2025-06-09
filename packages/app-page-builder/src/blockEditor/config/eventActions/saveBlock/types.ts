import { type UpdatePageBlockInput } from "~/admin/contexts/AdminPageBuilder/PageBlocks/BlockGatewayInterface.js";

export interface SaveBlockActionArgsType {
    execute(data: UpdatePageBlockInput): Promise<void>;
    debounce?: boolean;
    onFinish?: () => void;
}
