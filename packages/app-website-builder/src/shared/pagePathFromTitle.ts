import slugify from "slugify";

export const pagePathFromTitle = (title: string) => {
    const slugified = slugify(title, {
        replacement: "-",
        lower: true,
        remove: /[*#\?<>_\{\}\[\]+~.()'"!:;@]/g,
        trim: false
    });

    return `/${slugified}`;
};
