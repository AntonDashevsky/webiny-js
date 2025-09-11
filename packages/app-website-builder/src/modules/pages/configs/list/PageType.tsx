import type React from "react";
import { useEffect } from "react";
import { usePageTypes } from "~/features";

export type PageTypeProps =
    | {
          name: string;
          remove: true;
      }
    | {
          name: string;
          label: string;
          element: React.ReactNode;
          remove?: never;
      };

export const PageType = (props: PageTypeProps) => {
    const { addPageType, removePageType } = usePageTypes();

    useEffect(() => {
        if (props.remove) {
            removePageType(props.name);
            return;
        }

        addPageType({
            name: props.name,
            label: props.label,
            element: props.element
        });
    }, []);

    return null;
};
