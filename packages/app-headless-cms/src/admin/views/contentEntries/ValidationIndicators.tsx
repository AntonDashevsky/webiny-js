import React, { useEffect } from "react";
import type { FormValidation } from "@webiny/form";
import { makeDecoratable } from "@webiny/react-composition";
import { Global, css } from "@emotion/react";

// To customize the icon, define a CSS variable within the validation class:
// .wby-content-entry-invalid-field {
//     --error-icon: "🤔"
// }
// To customize the border color, use the Admin UI Colors APIs to override the default `destructive` color palette.

const errorColor = `hsl(var(--border-destructive-default))`;
const errorIcon = `var(--error-icon, "⚠️")`;

const errorTitleMixin = `
    content: ${errorIcon}!important;
    margin-right: var(--spacing-xs-plus)!important;
`;

const noErrorTitleMixin = `
    content: "";
    margin: 0;
`;

const errorBorderMixin = `
    border: 1px solid ${errorColor};
`;

const defaultClass = css`
    .wby-content-entry-invalid-field {
        // Default fields
        .webiny_label-invalid {
            left: var(--spacing-sm-extra);

            .webiny_label-text::before {
                ${errorTitleMixin}
            }
        }

        // accordion
        .webiny_accordion-item-title::before {
            ${errorTitleMixin}
        }
        .webiny_accordion-title-text::before {
            ${errorTitleMixin}
        }

        // multiple entries
        > hcms-parent-field-provider .webiny_group-label-text::before {
            ${errorTitleMixin}
        }

        // radio buttons
        &[data-field-renderer="radio-buttons"] {
            [role="radiogroup"] .webiny_label-text::before {
                ${noErrorTitleMixin}
            }
        }

        // checkboxes
        &[data-field-renderer="checkboxes"] {
            [role="checkbox"] + label .webiny_label-text::before {
                ${noErrorTitleMixin}
            }
        }
    }

    // reference field
    .wby-content-entry-invalid-field[data-field-type="ref"] {
        .webiny_group-label-text::before {
            ${errorTitleMixin}
        }

        .webiny_ref-field-container {
            ${errorBorderMixin}
        }

        &[data-field-renderer="ref-simple-single"] {
            [role="radiogroup"] .webiny_label-text::before {
                ${noErrorTitleMixin}
            }

            [role="checkbox"] + label .webiny_label-text::before {
                ${noErrorTitleMixin}
            }
        }
    }

    // Object field
    .wby-content-entry-invalid-field[data-field-type="object"] {
        &[data-field-renderer="object"],
        &[data-field-renderer="objects"] {
            .webiny_group-label-text::before {
                ${errorTitleMixin}
            }

            label {
                left: 0;

                .webiny_label-text::before {
                    ${noErrorTitleMixin}
                }
            }
        }
    }
`;

export interface ValidationIndicatorsProps {
    invalidFields: FormValidation;
    className?: string;
}

export const ValidationIndicators = makeDecoratable(
    "ValidationIndicators",
    ({
        invalidFields,
        className = "wby-content-entry-invalid-field"
    }: ValidationIndicatorsProps) => {
        const visualizeDomByPath = (path: string) => {
            const selector = `hcms-field-validation[data-path="${path}"]`;
            const marker = Array.from(document.querySelectorAll(selector).values())[0];
            if (marker) {
                marker.classList.add(className);
            }

            if (path.includes(".")) {
                const paths = path.split(".");
                const parentPath = paths.slice(0, paths.length - 1);
                visualizeDomByPath(parentPath.join("."));
            }
        };

        useEffect(() => {
            document.querySelectorAll(`.${className}`).forEach(el => {
                el.classList.remove(className);
            });

            for (const key of Object.keys(invalidFields)) {
                visualizeDomByPath(key);
            }
        }, [invalidFields]);

        return <Global styles={defaultClass} />;
    }
);
