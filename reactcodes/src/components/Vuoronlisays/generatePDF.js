
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (shiftAndTasks, searchStart, searchEnd) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Alkaa", "Loppuu", "Nimike", "Tehtävä", "Paikka", "Nimike", "Määrä"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  shiftAndTasks.forEach(a => {
    const data = [
      a.alkaa,
      a.loppuu,
      a.nimike,
      a.tehtävä,
      a.paikka,
      a.nimike,
      a.määrä
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(data);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Työvuororaportti " + searchStart + " - " + searchEnd, 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;