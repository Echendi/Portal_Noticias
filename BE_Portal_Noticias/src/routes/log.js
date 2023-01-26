const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require("readline");
let logs = []

router.get('/', (req, res) => {
    let reader = readline.createInterface({
        input: fs.createReadStream(__dirname.replace("routes","access.log"))
    });
    
    reader.on("line", line => {
        let lines = line.split(" ");
        let method = lines[0];
        let link =  lines[1];
        let status = lines[2];
        let date = lines[3]+" "+lines[4]+" "+lines[5]+" "+lines[6]+" "+lines[7]+" "+lines[8];
        logs.push(
            {
                method,
                date,
                link,
                status
            }
        );
        console.log("logs", logs);
    });
    res.send(logs);
});

module.exports = router;