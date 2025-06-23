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
  if (ticket.bill || ticket.tip || ticket.people) {
    resetBtn.removeAttribute("disabled", "");
  }
  if (ticket.bill && ticket.tip && ticket.people) calculateTip(ticket);
});

porcentageBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const prevFocus = document.querySelector(".focused");
    if (prevFocus) {
      prevFocus.classList.remove("focused");
    }
    btn.classList.add("focused");
    ticket.tip = Number(e.target.value);
    if (ticket.bill || ticket.tip || ticket.people) {
      resetBtn.removeAttribute("disabled", "");
    }
    if (ticket.bill && ticket.tip && ticket.people) calculateTip(ticket);
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
  if (ticket.bill || ticket.tip || ticket.people) {
    resetBtn.removeAttribute("disabled", "");
  }
  if (ticket.bill && ticket.tip && ticket.people) calculateTip(ticket);
});

peopleInput.addEventListener("input", (e) => {
  handleError(e, peopleInput, errorMsg, "Can't be 0");
  ticket.people = Number(e.target.value);
  if (ticket.bill && ticket.tip && ticket.people) calculateTip(ticket);
  if (ticket.bill || ticket.tip || ticket.people) {
    resetBtn.removeAttribute("disabled", "");
  }
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

function calculateTip({ bill, tip, people }) {
  if (!bill || !tip || !people) return;
  let percentage = tip / 100;
  let tipPerson = ((bill * percentage) / people).toFixed(2);
  let totTip = tipPerson * people;
  let totBill = ((bill + totTip) / people).toFixed(2);
  showResult(totBill, tipPerson);
}

function showResult(tot, tip) {
  tipAmount.innerText = `$${tip}`;
  total.innerText = `$${tot}`;
  resetBtn.classList.add("active");
}

function handleError(e, element, span, message) {
  const input = Number(e.target.value);
  if (!input || isNaN(input)) {
    element.classList.add("error");
    span ? (span.innerText = message) : null;
  } else {
    element.classList.remove("error");
    span ? (span.innerText = "") : null;
  }
}

function resetFields(...fields) {
  fields.forEach((f) => (f.value = ""));
}

function resetErrors(...spans) {
  spans.forEach((s) => (s.innerText = ""));
}

function resetStyles(...inputs) {
  inputs.forEach((i) => i.classList.remove("error"));
}

function resetTotals(...totals) {
  totals.forEach((tot) => (tot.innerText = "$0.00"));
}
