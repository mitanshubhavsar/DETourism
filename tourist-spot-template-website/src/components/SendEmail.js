import emailjs from "@emailjs/browser";
import { getOverallTourTotal } from "../ContextAPI/reducer";
import { useEffect } from "react";

export const SendEmail = (basket, tourInfo, user) => {
  let packageNames = " ";
  for (let i = 0; i < basket.length; i++) {
    packageNames = packageNames + " " + basket[i].state;
  }

  let packagePrices = " ";
  for (let i = 0; i < basket.length; i++) {
    packagePrices = packagePrices + " Rs." + basket[i].price;
  }

  const date = new Date();

  const amountnum = getOverallTourTotal(tourInfo);

  const data = {
    package: packageNames,
    price: packagePrices,
    orderedAt: date.toUTCString(),
    amount: amountnum.toString(),
    user: user.email,
  };

  emailjs
    .send("service_6qtdtk4", "template_xdemt7s", data, "ElHkpJiW6H0cwIUmt")
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};
