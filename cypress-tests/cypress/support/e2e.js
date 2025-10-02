import "@4tw/cypress-drag-drop";
import "@testing-library/cypress/add-commands";
import "./commands";

// Workaround for https://github.com/cypress-io/cypress/issues/29277
Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver loop"));
