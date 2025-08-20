const principalAmt = document.getElementById("mortgage-amount")
const years = document.getElementById("mortgage-term")
const intRate = document.getElementById("interest-rate")
const mortType = document.querySelector("input[name='mortgage-type']:checked")
const btn = document.getElementById("calculate-btn")

btn.addEventListener("click", calculateMortgage)