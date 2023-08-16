import { writeFile, utils } from "xlsx";
import moment from "moment";

const dataToXLSX = (title, columns, rows) => {
  const newRows = rows.map(row => {
    let newRow = {};
    for (const column of columns) {
      newRow[column.name] = row[column.key];
    }
    return newRow;
  });
  const newColumns = columns.map(column => column.name);
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(newRows, {header: newColumns});
  utils.book_append_sheet(workbook, worksheet, "Unidades");
  writeFile(workbook, `${title}-${ moment().format('MMMM-DD-YYYY hh-mm a') }.xlsx`);
}

export default dataToXLSX