import React from "react";
import { jsPDF } from "jspdf";

export const Bookingpdf = (orderData, i) => {
  const doc = new jsPDF("landscape", "px", "a4", "false");
  doc.text("Thank you For Booking the Package", 230, 20);
  doc.text("Your Booked Package details are given below: ", 210, 40);

  orderData[i].basket.map((des, h) => {
    return (
      doc.text(`${des.state}`, 260, 210 * h + 60),
      doc.text(`${des.days} Days ${des.nights} Nights`, 70, 210 * h + 90),
      doc.text(`Package Price: Rs. ${des.price}`, 70, 210 * h + 110),
      doc.text(`Tour Information`, 70, 210 * h + 130),
      doc.text(
        `Start Date: ${new Date(
          orderData[i].tourInfo[h].startTour?.toDate()
        ).toDateString()}`,
        70,
        210 * h + 150
      ),
      doc.text(
        `End Date: ${new Date(
          orderData[i].tourInfo[h].endTour?.toDate()
        ).toDateString()}`,
        70,
        210 * h + 170
      ),
      doc.text(
        `Duration: ${orderData[i].tourInfo[h].TourDuration}`,
        70,
        210 * h + 190
      ),
      doc.text(
        `Adults: ${orderData[i].tourInfo[h].TourAdults}`,
        270,
        210 * h + 190
      ),
      doc.text(
        `Children: ${orderData[i].tourInfo[h].TourChild}`,
        370,
        210 * h + 190
      ),
      doc.text(
        `Tour SubTotal:   Rs. ${orderData[i].tourInfo[
          h
        ].TourSubtotal.toLocaleString(navigator.language)}
        `,
        70,
        210 * h + 210
      )
    );
  });
  doc.text(
    ` SubTotal:    Rs. ${orderData[i].amount.toLocaleString(
      navigator.language
    )}`,
    70,
    440
  );
  doc.text(
    `Ordered on:  ${new Date(orderData[i].orderedAt?.toDate()).toDateString()}`,
    280,
    440
  );
  doc.save("a4.pdf");
};
