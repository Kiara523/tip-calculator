export function showResult(tot, tip, tipAmount, total) {
  tipAmount.innerText = `$${tip}`;
  total.innerText = `$${tot}`;
  resetBtn.classList.add("active");
}

export function resetFields(...fields) {
  fields.forEach((f) => (f.value = ""));
}

export function resetErrors(...spans) {
  spans.forEach((s) => (s.innerText = ""));
}

export function resetStyles(...inputs) {
  inputs.forEach((i) => i.classList.remove("error"));
}

export function resetTotals(...totals) {
  totals.forEach((tot) => (tot.innerText = "$0.00"));
}
