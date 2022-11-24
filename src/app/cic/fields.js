const {APP} = require("../../lib/config");

module.exports = {
    photoIdChoice: {
        type: "radios",
        items: [APP.PHOTO_ID_OPTIONS.UK_PASSPORT, APP.PHOTO_ID_OPTIONS.BRP, APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL, APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT],
        validate: ["required"]
    },
    expiryDate: {
        type: "date",
        journeyKey: "expiryDate",
        validate: [
            "required", "date",
            {
                type: "after",
                arguments: [
                    new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() - 18,
                        new Date().getDate()
                    )
                        .toISOString()
                        .split("T")[0],
                ],
            },
        ],
    }
};
