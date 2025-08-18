export default async () => {
    const { initializeProject } = await import("@webiny/cli");
    await initializeProject();

    const projectApplication = await import("../webiny.application.js").then(m => m.default ?? m);

    const pulumi = await projectApplication.getPulumi();
    return pulumi.run({
        env: "{DEPLOY_ENV}",
        variant: "{DEPLOY_VARIANT}"
    });
};
