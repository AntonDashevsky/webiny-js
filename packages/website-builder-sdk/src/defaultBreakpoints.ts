import type { WebsiteBuilderThemeInput } from "~/types/WebsiteBuilderTheme";

export const defaultBreakpoints: NonNullable<WebsiteBuilderThemeInput["breakpoints"]> = {
    desktop: {
        title: "Desktop",
        description: `Desktop styles apply at all breakpoints, unless they're edited at a lower breakpoint. Start your styling here.`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>`,
        minWidth: 0,
        maxWidth: 4000
    },
    tablet: {
        title: "Tablet",
        description: `Styles added here will apply at 991px and below, unless they're edited at a smaller breakpoint.`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 0h-14A2.5 2.5 0 0 0 2 2.5v19A2.5 2.5 0 0 0 4.5 24h14a2.5 2.5 0 0 0 2.5-2.5v-19A2.5 2.5 0 0 0 18.5 0zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4H4V3h15v16z"/></svg>`,
        minWidth: 0,
        maxWidth: 991
    },
    mobile: {
        title: "Mobile",
        description: `Styles added here will apply at 430px and below.`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/></svg>`,
        minWidth: 0,
        maxWidth: 430
    }
};
