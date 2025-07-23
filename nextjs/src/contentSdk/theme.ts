import { createTheme } from "@webiny/website-builder-nextjs";

// Theme object.
export const theme = createTheme({
    themeUrl: "/webiny/theme.css",
    breakpoints: {
        mobile: {
            description: `Styles added here will apply at 480px and below, unless they're edited at a smaller breakpoint.`,
            maxWidth: 480
        },
        custom: {
            wide: {
                title: "Wide",
                description: `Styles added here will apply at 700px and below, unless they're edited at a smaller breakpoint.`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 0h-14A2.5 2.5 0 0 0 2 2.5v19A2.5 2.5 0 0 0 4.5 24h14a2.5 2.5 0 0 0 2.5-2.5v-19A2.5 2.5 0 0 0 18.5 0zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4H4V3h15v16z"/></svg>`,
                minWidth: 481,
                maxWidth: 700
            }
        }
    },
    styles: {
        colors: {
            color1: "var(--wb-theme-color1)",
            color2: "var(--wb-theme-color2)",
            color3: "var(--wb-theme-color3)",
            color4: "var(--wb-theme-color4)",
            color5: "var(--wb-theme-color5)",
            color6: "var(--wb-theme-color6)"
        },
        typography: {
            headings: [
                {
                    id: "heading1",
                    name: "Heading 1",
                    tag: "h1",
                    className: "wb-heading-1"
                },
                {
                    id: "heading2",
                    name: "Heading 2",
                    tag: "h2",
                    className: "wb-heading-2"
                },
                {
                    id: "heading3",
                    name: "Heading 3",
                    tag: "h3",
                    className: "wb-heading-3"
                },
                {
                    id: "heading4",
                    name: "Heading 4",
                    tag: "h4",
                    className: "wb-heading-4"
                },
                {
                    id: "heading5",
                    name: "Heading 5",
                    tag: "h5",
                    className: "wb-heading-5"
                },
                {
                    id: "heading6",
                    name: "Heading 6",
                    tag: "h6",
                    className: "wb-heading-6"
                }
            ],
            paragraphs: [
                {
                    id: "paragraph1",
                    name: "Paragraph 1",
                    tag: "p",
                    className: "wb-paragraph-1"
                },
                {
                    id: "paragraph2",
                    name: "Paragraph 2",
                    tag: "p",
                    className: "wb-paragraph-2"
                }
            ],
            quotes: [
                {
                    id: "quote",
                    name: "Quote",
                    tag: "blockquote",
                    className: "wb-blockquote-1"
                }
            ],
            lists: [
                { id: "list1", name: "List 1", tag: "ul", className: "wb-unordered-list-1" },
                { id: "list2", name: "List 2", tag: "ol", className: "wb-ordered-list-1" }
            ]
        }
    }
});
