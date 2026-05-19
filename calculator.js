
const calCta = document.querySelector(".cal-wrapper");
const resultValue = document.querySelector(".cal-result-rate")
const resultTitle = document.querySelector(".cal-result-title");
const calInputs = document.querySelectorAll(".field-input");
let calCtaBtn = document.querySelector(".cal-cta");

const lumpSum = document.getElementById("lump-sum");
const monthly = document.getElementById("monthly");
const duration = document.getElementById("duration");
const rate = document.getElementById("rate");

const gbpFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function calculateGrowth(lumpSum, monthlySaving, durationYears, annualRate) {
    // 1. Convert annual inputs to monthly periods
    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = durationYears * 12;

    // 2. Handle edge case: if interest rate is 0%
    if (monthlyRate === 0) {
        return lumpSum + (monthlySaving * totalMonths);
    }

    // 3. Calculate the growth of the lump sum
    // Formula: P * (1 + i)^n
    const lumpSumGrowth = lumpSum * Math.pow(1 + monthlyRate, totalMonths);

    // 4. Calculate the growth of the monthly savings (Annuity)
    // Formula: PMT * [((1 + i)^n - 1) / i]
    const savingsGrowth = monthlySaving * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    // 5. Total future value
    const totalFutureValue = lumpSumGrowth + savingsGrowth;

    // Return the breakdown rounded to 2 decimal places
    return parseFloat(totalFutureValue.toFixed(2))
        // totalInvested: parseFloat((lumpSum + (monthlySaving * totalMonths)).toFixed(2)),
        // interestEarned: parseFloat((totalFutureValue - (lumpSum + (monthlySaving * totalMonths))).toFixed(2))

}

calInputs.forEach((fieldInput) => {
    fieldInput.addEventListener("input", () => {
        const allEntered = Array.from(calInputs).every(fieldInput => fieldInput.value.trim() !== "");

        if (allEntered) {
            calCtaBtn.removeAttribute("disabled");
        } else {
            calCtaBtn.setAttribute("disabled", true)
        }
    })
})

calCta.addEventListener("submit", (e) => {
    e.preventDefault();
    resultTitle.innerHTML = `In ${monthly.value} years your savings will be worth:`
    resultValue.innerHTML = `${gbpFormatter.format(calculateGrowth(lumpSum.value, monthly.value, duration.value, rate.value))}`
    document.querySelector(".cal-result").style.display = "flex";
});
