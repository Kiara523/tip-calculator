export default function handleError(e, element, span, message) {
  resetBtn.removeAttribute("disabled", "");
  const input = Number(e.target.value);
  if (!input || isNaN(input)) {
    element.classList.add("error");
    span ? (span.innerText = message) : null;
  } else {
    element.classList.remove("error");
    span ? (span.innerText = "") : null;
  }
}
