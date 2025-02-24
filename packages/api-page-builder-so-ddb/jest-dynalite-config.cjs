const { createDynaliteTables } = require("../../dynalite.cjs");

module.exports = createDynaliteTables({
    data: [
        {
            PK: "PS#SETTINGS",
            SK: "default",
            data: {
                appUrl: "https://www.test.com",
                bucket: "bucket",
                cloudfrontId: "cloudfrontId",
                deliveryUrl: "https://www.test.com"
            }
        }
    ]
});
