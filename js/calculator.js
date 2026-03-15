
const toolConfigs = {
    'emi-calculator': [
        { id: 'amount', label: 'Loan Amount', type: 'number', prefix: '$', value: 50000 },
        { id: 'rate', label: 'Interest Rate (Yearly)', type: 'number', suffix: '%', value: 8.5 },
        { id: 'years', label: 'Loan Tenure (Years)', type: 'number', value: 5 }
    ],
    'loan-calculator': [
        { id: 'amount', label: 'Loan Amount', type: 'number', prefix: '$', value: 10000 },
        { id: 'rate', label: 'Interest Rate', type: 'number', suffix: '%', value: 5 },
        { id: 'years', label: 'Years', type: 'number', value: 3 }
    ],
    'sip-calculator': [
        { id: 'amount', label: 'Monthly Investment', type: 'number', prefix: '$', value: 500 },
        { id: 'rate', label: 'Expected Return Rate', type: 'number', suffix: '%', value: 12 },
        { id: 'years', label: 'Time Period (Years)', type: 'number', value: 10 }
    ],
    'fd-calculator': [
        { id: 'amount', label: 'Total Investment', type: 'number', prefix: '$', value: 10000 },
        { id: 'rate', label: 'Interest Rate', type: 'number', suffix: '%', value: 6.5 },
        { id: 'years', label: 'Time Period (Years)', type: 'number', value: 5 }
    ],
    'rd-calculator': [
        { id: 'amount', label: 'Monthly Investment', type: 'number', prefix: '$', value: 1000 },
        { id: 'rate', label: 'Interest Rate', type: 'number', suffix: '%', value: 6.5 },
        { id: 'years', label: 'Time Period (Years)', type: 'number', value: 5 }
    ],
    'compound-interest-calculator': [
        { id: 'amount', label: 'Principal Amount', type: 'number', prefix: '$', value: 10000 },
        { id: 'rate', label: 'Interest Rate', type: 'number', suffix: '%', value: 5 },
        { id: 'years', label: 'Time Period (Years)', type: 'number', value: 10 }
    ],
    'simple-interest-calculator': [
        { id: 'amount', label: 'Principal Amount', type: 'number', prefix: '$', value: 10000 },
        { id: 'rate', label: 'Interest Rate', type: 'number', suffix: '%', value: 5 },
        { id: 'years', label: 'Time Period (Years)', type: 'number', value: 5 }
    ],
    'mortgage-calculator': [
        { id: 'amount', label: 'Home Value', type: 'number', prefix: '$', value: 300000 },
        { id: 'downpayment', label: 'Down Payment', type: 'number', prefix: '$', value: 60000 },
        { id: 'rate', label: 'Interest Rate', type: 'number', suffix: '%', value: 4.5 },
        { id: 'years', label: 'Loan Term (Years)', type: 'number', value: 30 }
    ],
    'credit-card-payoff-calculator': [
        { id: 'amount', label: 'Credit Card Balance', type: 'number', prefix: '$', value: 5000 },
        { id: 'rate', label: 'Interest Rate (APR)', type: 'number', suffix: '%', value: 18.9 },
        { id: 'payment', label: 'Monthly Payment', type: 'number', prefix: '$', value: 200 }
    ],
    'gst-calculator': [
        { id: 'amount', label: 'Initial Amount', type: 'number', prefix: '$', value: 1000 },
        { id: 'rate', label: 'GST Rate', type: 'number', suffix: '%', value: 18 }
    ],
    'salary-calculator': [
        { id: 'amount', label: 'Hourly Wage', type: 'number', prefix: '$', value: 25 },
        { id: 'hours', label: 'Hours per Week', type: 'number', value: 40 }
    ],
    'income-tax-calculator': [
        { id: 'amount', label: 'Annual Income', type: 'number', prefix: '$', value: 60000 },
        { id: 'rate', label: 'Estimated Tax Rate', type: 'number', suffix: '%', value: 20 }
    ],
    'budget-planner': [
        { id: 'income', label: 'Monthly Income', type: 'number', prefix: '$', value: 5000 },
        { id: 'expenses', label: 'Monthly Expenses', type: 'number', prefix: '$', value: 3000 }
    ],
    'savings-calculator': [
        { id: 'goal', label: 'Savings Goal', type: 'number', prefix: '$', value: 10000 },
        { id: 'months', label: 'Months to Save', type: 'number', value: 12 }
    ],
    'investment-return-calculator': [
        { id: 'amount', label: 'Initial Investment', type: 'number', prefix: '$', value: 10000 },
        { id: 'rate', label: 'Expected Return', type: 'number', suffix: '%', value: 8 },
        { id: 'years', label: 'Years', type: 'number', value: 10 }
    ],
    'retirement-calculator': [
        { id: 'amount', label: 'Current Savings', type: 'number', prefix: '$', value: 50000 },
        { id: 'monthly', label: 'Monthly Contribution', type: 'number', prefix: '$', value: 500 },
        { id: 'years', label: 'Years to Retire', type: 'number', value: 20 },
        { id: 'rate', label: 'Expected Return', type: 'number', suffix: '%', value: 7 }
    ],
    'currency-converter': [
        { id: 'amount', label: 'Amount', type: 'number', value: 100 },
        { id: 'rate', label: 'Exchange Rate', type: 'number', value: 1.2 }
    ],
    'profit-loss-calculator': [
        { id: 'cost', label: 'Cost Price', type: 'number', prefix: '$', value: 100 },
        { id: 'sell', label: 'Selling Price', type: 'number', prefix: '$', value: 150 }
    ],
    'discount-calculator': [
        { id: 'amount', label: 'Original Price', type: 'number', prefix: '$', value: 100 },
        { id: 'rate', label: 'Discount', type: 'number', suffix: '%', value: 20 }
    ],
    'inflation-calculator': [
        { id: 'amount', label: 'Current Amount', type: 'number', prefix: '$', value: 1000 },
        { id: 'rate', label: 'Inflation Rate', type: 'number', suffix: '%', value: 3 },
        { id: 'years', label: 'Years', type: 'number', value: 10 }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const calcForm = document.getElementById('calc-form');
    if (!calcForm) return;

    const toolId = calcForm.getAttribute('data-tool');
    const config = toolConfigs[toolId] || toolConfigs['emi-calculator'];
    const container = document.getElementById('dynamic-inputs');

    // Generate Inputs
    config.forEach(field => {
        const div = document.createElement('div');
        let inputHtml = `<input type="${field.type}" id="${field.id}" value="${field.value}" required step="any" class="w-full ${field.prefix ? 'pl-8' : 'pl-4'} ${field.suffix ? 'pr-8' : 'pr-4'} py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white" />`;
        
        let wrapperHtml = inputHtml;
        if (field.prefix || field.suffix) {
            wrapperHtml = `<div class="relative">
                ${field.prefix ? `<span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">${field.prefix}</span>` : ''}
                ${inputHtml}
                ${field.suffix ? `<span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">${field.suffix}</span>` : ''}
            </div>`;
        }

        div.innerHTML = `
            <label class="block text-sm font-semibold text-slate-700 mb-2">${field.label}</label>
            ${wrapperHtml}
        `;
        container.appendChild(div);
    });

    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const vals = {};
        config.forEach(f => {
            vals[f.id] = parseFloat(document.getElementById(f.id).value) || 0;
        });

        let result = 0;
        let details = '';

        const formatMoney = (val) => '$' + val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        switch(toolId) {
            case 'emi-calculator':
            case 'loan-calculator':
            case 'mortgage-calculator': {
                let p = vals.amount;
                if(toolId === 'mortgage-calculator') p = vals.amount - vals.downpayment;
                const r = (vals.rate / 100) / 12;
                const n = vals.years * 12;
                if (r === 0) result = p / n;
                else result = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                
                const totalPayment = result * n;
                const totalInterest = totalPayment - p;
                details = `Total Principal: ${formatMoney(p)}<br>Total Interest: ${formatMoney(totalInterest)}<br>Total Payment: ${formatMoney(totalPayment)}`;
                break;
            }
            case 'sip-calculator': {
                const p = vals.amount;
                const r = (vals.rate / 100) / 12;
                const n = vals.years * 12;
                result = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
                const invested = p * n;
                details = `Total Invested: ${formatMoney(invested)}<br>Est. Returns: ${formatMoney(result - invested)}`;
                break;
            }
            case 'fd-calculator':
            case 'compound-interest-calculator':
            case 'investment-return-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const t = vals.years;
                result = p * Math.pow(1 + r, t);
                details = `Principal: ${formatMoney(p)}<br>Interest Earned: ${formatMoney(result - p)}`;
                break;
            }
            case 'rd-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const n = vals.years * 12;
                // RD formula approximation
                result = p * n + p * n * (n + 1) / 2 * r / 12;
                details = `Total Invested: ${formatMoney(p * n)}<br>Interest Earned: ${formatMoney(result - (p * n))}`;
                break;
            }
            case 'simple-interest-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const t = vals.years;
                const interest = p * r * t;
                result = p + interest;
                details = `Principal: ${formatMoney(p)}<br>Interest Earned: ${formatMoney(interest)}`;
                break;
            }
            case 'credit-card-payoff-calculator': {
                const b = vals.amount;
                const p = vals.payment;
                const r = (vals.rate / 100) / 12;
                if (p <= b * r) {
                    result = 0;
                    details = "Payment is too low to cover interest.";
                } else {
                    const months = -Math.log(1 - (b * r) / p) / Math.log(1 + r);
                    result = Math.ceil(months);
                    const totalPaid = result * p;
                    details = `Total Months: ${result}<br>Total Interest Paid: ${formatMoney(totalPaid - b)}`;
                    document.getElementById('result-value').innerText = result + ' Months';
                }
                break;
            }
            case 'gst-calculator': {
                const p = vals.amount;
                const gst = p * (vals.rate / 100);
                result = p + gst;
                details = `Original Amount: ${formatMoney(p)}<br>GST Amount: ${formatMoney(gst)}`;
                break;
            }
            case 'salary-calculator': {
                const h = vals.amount;
                const w = vals.hours;
                const weekly = h * w;
                const monthly = weekly * 52 / 12;
                result = weekly * 52;
                details = `Weekly: ${formatMoney(weekly)}<br>Monthly: ${formatMoney(monthly)}`;
                break;
            }
            case 'income-tax-calculator': {
                const inc = vals.amount;
                const tax = inc * (vals.rate / 100);
                result = inc - tax;
                details = `Gross Income: ${formatMoney(inc)}<br>Tax Amount: ${formatMoney(tax)}`;
                break;
            }
            case 'budget-planner': {
                const inc = vals.income;
                const exp = vals.expenses;
                result = inc - exp;
                details = `Total Income: ${formatMoney(inc)}<br>Total Expenses: ${formatMoney(exp)}`;
                break;
            }
            case 'savings-calculator': {
                const g = vals.goal;
                const m = vals.months;
                result = g / m;
                details = `Goal: ${formatMoney(g)}<br>Time: ${m} months`;
                break;
            }
            case 'retirement-calculator': {
                const p = vals.amount;
                const m = vals.monthly;
                const t = vals.years;
                const r = vals.rate / 100 / 12;
                const n = t * 12;
                const futureP = p * Math.pow(1 + r, n);
                const futureM = m * ((Math.pow(1 + r, n) - 1) / r);
                result = futureP + futureM;
                const invested = p + (m * n);
                details = `Total Invested: ${formatMoney(invested)}<br>Interest Earned: ${formatMoney(result - invested)}`;
                break;
            }
            case 'currency-converter': {
                result = vals.amount * vals.rate;
                details = `Rate: ${vals.rate}`;
                document.getElementById('result-value').innerText = result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                break;
            }
            case 'profit-loss-calculator': {
                const cp = vals.cost;
                const sp = vals.sell;
                result = sp - cp;
                const percent = (result / cp) * 100;
                details = `Margin: ${percent.toFixed(2)}%`;
                break;
            }
            case 'discount-calculator': {
                const p = vals.amount;
                const d = p * (vals.rate / 100);
                result = p - d;
                details = `Original Price: ${formatMoney(p)}<br>You Save: ${formatMoney(d)}`;
                break;
            }
            case 'inflation-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const t = vals.years;
                result = p * Math.pow(1 + r, t);
                details = `Purchasing power equivalent in ${t} years.`;
                break;
            }
        }

        if (toolId !== 'credit-card-payoff-calculator' && toolId !== 'currency-converter') {
            document.getElementById('result-value').innerText = formatMoney(result);
        }
        
        document.getElementById('result-details').innerHTML = details;
        document.getElementById('result-container').classList.remove('hidden');
    });
});
