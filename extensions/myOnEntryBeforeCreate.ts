import { createImplementation } from "@webiny/di-container";
import { OnEntryBeforeCreate } from "@webiny/extensions/api";

class MyOnEntryBeforeCreate implements OnEntryBeforeCreate.Interface {
    execute({ model, entry }: OnEntryBeforeCreate.Params) {
        // Do something.
    }
}

export default createImplementation({
    abstraction: OnEntryBeforeCreate,
    implementation: MyOnEntryBeforeCreate,
    dependencies: [GetCmsEntry, GetCmsModel]
});
