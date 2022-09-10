const fs = require("fs");
const path = require("path");

fs.copyFile("config\\.env.example", path.resolve(__dirname , "../.env"), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("env file created");
    }
})