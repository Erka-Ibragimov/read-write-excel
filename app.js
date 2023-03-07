const path = require("path");
const fs = require("fs");
const json2xls = require("json2xls");
const readFileExcel = async () => {
  const pathToFile = path.resolve(__dirname, "./files/01-28-02-2023-mts.json");

  const data = fs.readFileSync(pathToFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
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

  fs.writeFileSync(
    path.resolve(__dirname, "./newFiles/01-28-mts.xlsx"),
    xls,
    "binary"
  );
};
readFileExcel();
