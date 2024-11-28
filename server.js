const express = require("express");
const { exec } = require("child_process");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/run_code", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).send("No code provided");
  }

 
  const fs = require("fs");   // here i am creating a file and writing the code in it temporarily
  const fileName = "temp_code.py";
  fs.writeFileSync(fileName, code);

 
  exec(`python ${fileName}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(stdout);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
