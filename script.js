import handleError from "./controllers/validation.js";
import {
  showResult,
  resetErrors,
  resetFields,
  resetStyles,
  resetTotals,
} from "./controllers/ui.js";
import { calculateTip } from "./controllers/calculator.js";

const billInput = document.querySelector(".bill-input");
const porcentageBtn = document.querySelectorAll(".percentage-btn");
const customTip = document.querySelector(".custom-tip");
const peopleInput = document.querySelector("#numPeople");
const tipAmount = document.querySelector("#tipAmount");
const total = document.querySelector("#totalPerson");
const resetBtn = document.getElementById("resetBtn");
const errorMsg = document.querySelector(".error-msg");
const billErrorMsg = document.querySelector(".bill-error-msg");

let ticket = {
  bill: 0,
  tip: 0,
  people: 0,
};

billInput.addEventListener("input", (e) => {
  handleError(e, billInput, billErrorMsg, "Please enter valid Amount");
  ticket.bill = Number(e.target.value);
  if (ticket.bill && ticket.tip && ticket.people)
    calculateTip(ticket, tipAmount, total);
});

porcentageBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    let prevFocus = document.querySelector(".focused");
    if (prevFocus) {
      prevFocus.classList.remove("focused");
    }
    btn.classList.add("focused");
    customTip.classList.remove("error");
    customTip.value = "";
    ticket.tip = Number(e.target.value);
    if (ticket.bill && ticket.tip && ticket.people)
      calculateTip(ticket, tipAmount, total);
  })
);

customTip.addEventListener("input", (e) => {
  porcentageBtn.forEach((btn) => {
    if (btn.classList.contains("focused")) {
      btn.classList.remove("focused");
    }
  });
  handleError(e, customTip, null, "no valid");
  ticket.tip = Number(e.target.value);
  if (ticket.bill && ticket.tip && ticket.people)
    calculateTip(ticket, tipAmount, total);
});

peopleInput.addEventListener("input", (e) => {
  handleError(e, peopleInput, errorMsg, "Can't be 0");
  ticket.people = Number(e.target.value);
  if (ticket.bill && ticket.tip && ticket.people)
    calculateTip(ticket, tipAmount, total);
});

resetBtn.addEventListener("click", () => {
  ticket = {
    bill: 0,
    tip: 0,
    people: 0,
  };
  resetBtn.setAttribute("disabled", "");
  const focusedBtn = document.querySelector(".focused");
  if (focusedBtn) {
    focusedBtn.classList.remove("focused");
  }
  resetFields(billInput, peopleInput, customTip);
  resetErrors(errorMsg, billErrorMsg);
  resetStyles(billInput, peopleInput, customTip);
  resetTotals(tipAmount, total);
});
