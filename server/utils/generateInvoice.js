const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (data) => {

  return new Promise((resolve, reject) => {

    const uploadsDir =
      path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadsDir)) {

      fs.mkdirSync(
        uploadsDir,
        { recursive: true }
      );

    }

    const fileName =
      `invoice-${Date.now()}.pdf`;

    const filePath =
      path.join(
        uploadsDir,
        fileName
      );

    const doc =
      new PDFDocument();

    const stream =
      fs.createWriteStream(
        filePath
      );

    doc.pipe(stream);

    doc.fontSize(20)
       .text(
         "FITNESS BOOKING INVOICE"
       );

    doc.moveDown();

    doc.text(
      `Customer: ${data.user}`
    );

    doc.text(
      `Class: ${data.className}`
    );

    doc.text(
      `Amount: ₹${data.amount}`
    );

    doc.text(
      `Transaction ID: ${data.transactionId}`
    );

    doc.text(
      `Status: PAID`
    );

    doc.end();

    stream.on(
      "finish",
      () => resolve(filePath)
    );

    stream.on(
      "error",
      reject
    );

  });

};

module.exports =
generateInvoice;