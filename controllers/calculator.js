import { showResult } from "./ui.js";

export function calculateTip({ bill, tip, people }, tipAmount, total) {
  if (!bill || !tip || !people) return;
  let percentage = tip / 100;
  let tipPerson = ((bill * percentage) / people).toFixed(2);
  let totTip = tipPerson * people;
  let totBill = ((bill + totTip) / people).toFixed(2);
  showResult(totBill, tipPerson, tipAmount, total);
}
