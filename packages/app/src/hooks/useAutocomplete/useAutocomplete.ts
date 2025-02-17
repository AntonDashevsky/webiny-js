import { useDataList } from "../useDataList/index.js";
import debounce from "lodash/debounce.js";
import { DocumentNode } from "graphql";

interface UseAutocompleteHook {
    options: any[];
    onInput(value: string): void;
}

interface Props {
    query: DocumentNode;
    search?: string | ((value: string) => string);
}

export const useAutocomplete = (props: Props): UseAutocompleteHook => {
    const dataList = useDataList({ useRouter: false, ...props });

    return {
        options: dataList.data || [],
        onInput: debounce(query => {
            if (!query) {
                return;
            }

            let search = props.search || query;
            if (typeof search === "function") {
                search = search(query);
            }

            dataList.setSearch(search);
        }, 250)
    };
};
