const PDFDocument =
require("pdfkit");

const fs =
require("fs");

const generateInvoice =
(data)=>{

    return new Promise((resolve)=>{

        const fileName =
        `invoice-${Date.now()}.pdf`;

        const path =
        `uploads/${fileName}`;

        const doc =
        new PDFDocument();

        doc.pipe(
            fs.createWriteStream(path)
        );

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

        resolve(path);

    });

};

module.exports =
generateInvoice;