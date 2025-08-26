const mortForm = document.getElementById("mort-form")
const principalAmt = document.getElementById("mortgage-amount")
const years = document.getElementById("mortgage-term")
const intRate = document.getElementById("interest-rate")
const btn = document.getElementById("calculate-btn")
const resultSection2 = document.querySelector(".result-section-2")
const resultSection1 = document.querySelector(".result-section-1")
const monthAmt = document.querySelector(".monthly-amt")
const totRepayAmount = document.querySelector(".total-amt")
const principalAmtError = document.querySelector(".principal-amt-error")
const yearsError = document.querySelector(".years-error")
const intRateError = document.querySelector(".int-rate-error")
const mortTypeError = document.querySelector(".mort-type-error")

///////////// /////////////Form Validation ////////////////////////////////////////////

mortForm.noValidate = true
let errMessage = ""
mortForm.addEventListener("focusout", function(e){
    let field = e.target
    let validityState = field.validity.valueMissing
    if(field.disabled || field.type === "file" || field.type === "reset" || field.type === "submit" || field.type === "button") return
    if(validityState) {
        showError(field)
    }

    if(!validityState) {
        hideError(field)
    }
 }, true)

function showError(field) {
    errMessage = "This field is required."
    field.closest(".form-group").querySelector("p").textContent = errMessage
    field.classList.replace("border-slate-300", "border-red-500")
    field.closest(".form-group").querySelector("span").classList.replace("text-slate-700", "text-slate-100")
    field.closest(".form-group").querySelector(".input-symbol").classList.replace("bg-slate-100", "bg-red-500")
    field.closest(".form-group").querySelector(".input-symbol").classList.replace("border-slate-300", "border-red-500")
}

function hideError(field) {
    errMessage = ""
    field.closest(".form-group").querySelector("p").textContent = errMessage
    field.classList.replace("border-red-500", "border-slate-300")
    field.closest(".form-group").querySelector("span").classList.replace("text-slate-100", "text-slate-700")
    field.closest(".form-group").querySelector(".input-symbol").classList.replace("bg-red-500", "bg-slate-100")
    field.closest(".form-group").querySelector(".input-symbol").classList.replace("border-red-500", "border-slate-300")
}

mortForm.addEventListener("submit", function(e) {
    let allFields = e.target.elements
    let isValid = true
    for(oneField of allFields) {
        if(oneField.validity.valueMissing) {
            isValid = false
            e.preventDefault()
            showError(oneField)
        } 
    }
    if(isValid) {
    e.preventDefault()
    calculateMortgage()
    }
})

function calculateMortgage() {
    let p = principalAmt.value
    let r = intRate.value/100/12
    let n = years.value*12
    const selectedType = mortForm.querySelector("input[name='mortgage-type']:checked")

    let repaymentMonthly = ((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(2)
    let totalPayment = repaymentMonthly * n
    let totInterest = totalPayment - p


    resultSection2.style.display = "flex"
    resultSection1.style.display = "none"

    if(selectedType.value === "repayment") {
        monthAmt.textContent = repaymentMonthly
        totRepayAmount.textContent = totalPayment
    } else {
            totRepayAmount.textContent = `Total Interest: ${totInterest}`
    }


}