const path = require("path");
const fs = require("fs");
const json2xls = require("json2xls");
const readFileExcel = async () => {
  const pathToFile = path.resolve(__dirname, "./files/text.txt");
  const data = fs.readFileSync(pathToFile, "utf8", (err, data) => {
    if (err) {
      console.error(`ReadFile ${err}`);
      return;
    }
    return data;
  });

  const dataJSON = JSON.parse(data);

//   dataJSON.data.forEach((element) => {
//     element.id = element.id.toString();
//     element.amount = (element.amount / 100).toString();
//     element.nominal = (element.nominal / 100).toString();
//     element.rate = element.rate.toString();
//     element.currency = element.currency.toString();
//   });

  const xls = await json2xls(dataJSON.data, {
    output: "base64",
  });

  fs.mkdir(path.join(__dirname, "newFiles"), { recursive: true }, (err) => {
    if (err) {
      console.error(`MKDIR ${err}`);
      return;
    }
  });

  fs.writeFileSync(
    path.resolve(__dirname, "./newFiles/text.xlsx"),
    xls,
    "binary"
  );
};
readFileExcel();
