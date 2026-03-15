const fs = require('fs');
const path = require('path');

const tools = [
  { id: 'emi-calculator', name: 'EMI Calculator', desc: 'Calculate Equated Monthly Installment for loans.' },
  { id: 'loan-calculator', name: 'Loan Calculator', desc: 'Estimate your loan payments and interest.' },
  { id: 'sip-calculator', name: 'SIP Calculator', desc: 'Calculate returns on your Systematic Investment Plan.' },
  { id: 'fd-calculator', name: 'FD Calculator', desc: 'Find out the maturity amount of your Fixed Deposit.' },
  { id: 'rd-calculator', name: 'RD Calculator', desc: 'Calculate the maturity value of your Recurring Deposit.' },
  { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', desc: 'See how your money grows over time with compounding.' },
  { id: 'simple-interest-calculator', name: 'Simple Interest Calculator', desc: 'Quickly calculate simple interest on your principal amount.' },
  { id: 'mortgage-calculator', name: 'Mortgage Calculator', desc: 'Estimate your monthly mortgage payments and schedule.' },
  { id: 'credit-card-payoff-calculator', name: 'Credit Card Payoff Calculator', desc: 'Find out how long it will take to pay off your credit card.' },
  { id: 'gst-calculator', name: 'GST Calculator', desc: 'Easily calculate Goods and Services Tax (GST) amounts.' },
  { id: 'salary-calculator', name: 'Salary Calculator', desc: 'Convert between hourly, monthly, and annual salary.' },
  { id: 'income-tax-calculator', name: 'Income Tax Calculator', desc: 'Estimate your income tax liability based on your earnings.' },
  { id: 'budget-planner', name: 'Budget Planner', desc: 'Plan and track your monthly income and expenses.' },
  { id: 'savings-calculator', name: 'Savings Calculator', desc: 'Determine how much you need to save to reach your goals.' },
  { id: 'investment-return-calculator', name: 'Investment Return Calculator', desc: 'Calculate the expected return on your investments.' },
  { id: 'retirement-calculator', name: 'Retirement Calculator', desc: 'Plan your future and see if you are on track for retirement.' },
  { id: 'currency-converter', name: 'Currency Converter', desc: 'Convert between different global currencies instantly.' },
  { id: 'profit-loss-calculator', name: 'Profit Loss Calculator', desc: 'Calculate gross profit, net profit, and profit margins.' },
  { id: 'discount-calculator', name: 'Discount Calculator', desc: 'Find out the final price after applying a discount.' },
  { id: 'inflation-calculator', name: 'Inflation Calculator', desc: 'See how inflation affects the purchasing power of money.' }
];

const layout = (title, content, isRoot = true, metaDesc = '', ogImage = '') => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | SmartFinance Tools</title>
    <meta name="description" content="${metaDesc || 'Free ' + title + '. SmartFinance Tools provides 20+ free financial calculators.'}">
    <meta property="og:title" content="${title} | SmartFinance Tools">
    <meta property="og:description" content="${metaDesc || 'Free ' + title + '. SmartFinance Tools provides 20+ free financial calculators.'}">
    <meta property="og:type" content="website">
    ${ogImage ? `<meta property="og:image" content="${ogImage}">` : ''}
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${isRoot ? '' : '../'}css/style.css">
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col relative font-sans">
    <!-- Navbar -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <a href="${isRoot ? '' : '../'}index.html" class="flex items-center gap-2">
                    <div class="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-sm">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <span class="font-bold text-xl tracking-tight text-slate-800">Smart<span class="text-blue-600">Finance</span></span>
                </a>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="${isRoot ? '' : '../'}index.html" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</a>
                    <a href="${isRoot ? '' : '../'}tools.html" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">All Tools</a>
                    <a href="${isRoot ? '' : '../'}blog.html" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Blog</a>
                    <a href="${isRoot ? '' : '../'}about.html" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About Us</a>
                    <a href="${isRoot ? '' : '../'}contact.html" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
                </div>
                <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-b border-slate-200 absolute w-full shadow-lg">
            <div class="px-4 pt-2 pb-4 space-y-1">
                <a href="${isRoot ? '' : '../'}index.html" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Home</a>
                <a href="${isRoot ? '' : '../'}tools.html" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">All Tools</a>
                <a href="${isRoot ? '' : '../'}blog.html" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Blog</a>
                <a href="${isRoot ? '' : '../'}about.html" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">About Us</a>
                <a href="${isRoot ? '' : '../'}contact.html" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Contact</a>
            </div>
        </div>
    </nav>

    <main class="flex-grow">
        ${content}
    </main>

    <!-- Footer Ad -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div class="w-full h-[90px] bg-slate-200 border border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500">
            <span class="text-xs uppercase tracking-wider font-semibold mb-1">Advertisement</span>
            <span class="text-sm">728 x 90 Banner Space</span>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="bg-blue-600 p-1.5 rounded-lg">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span class="font-bold text-lg tracking-tight text-slate-800">Smart<span class="text-blue-600">Finance</span></span>
                    </div>
                    <p class="text-slate-500 text-sm max-w-md leading-relaxed">
                        Your trusted source for free, accurate, and easy-to-use financial calculators. Make smarter decisions about your money today.
                    </p>
                </div>
                <div>
                    <h4 class="font-semibold text-slate-900 mb-4">Top Tools</h4>
                    <ul class="space-y-3 text-sm text-slate-500">
                        <li><a href="${isRoot ? '' : '../'}tools/emi-calculator.html" class="hover:text-blue-600 transition-colors">EMI Calculator</a></li>
                        <li><a href="${isRoot ? '' : '../'}tools/sip-calculator.html" class="hover:text-blue-600 transition-colors">SIP Calculator</a></li>
                        <li><a href="${isRoot ? '' : '../'}tools/income-tax-calculator.html" class="hover:text-blue-600 transition-colors">Income Tax Calculator</a></li>
                        <li><a href="${isRoot ? '' : '../'}tools/mortgage-calculator.html" class="hover:text-blue-600 transition-colors">Mortgage Calculator</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-slate-900 mb-4">Company</h4>
                    <ul class="space-y-3 text-sm text-slate-500">
                        <li><a href="${isRoot ? '' : '../'}about.html" class="hover:text-blue-600 transition-colors">About Us</a></li>
                        <li><a href="${isRoot ? '' : '../'}contact.html" class="hover:text-blue-600 transition-colors">Contact</a></li>
                        <li><a href="${isRoot ? '' : '../'}privacy-policy.html" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="${isRoot ? '' : '../'}terms-of-service.html" class="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                        <li><a href="${isRoot ? '' : '../'}disclaimer.html" class="hover:text-blue-600 transition-colors">Disclaimer</a></li>
                        <li><a href="${isRoot ? '' : '../'}cookie-policy.html" class="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                <div>&copy; 2026 SmartFinance Tools. All rights reserved.</div>
                <div>Designed for financial empowerment.</div>
            </div>
        </div>
    </footer>

    <script src="${isRoot ? '' : '../'}js/main.js"></script>
    ${!isRoot ? `<script src="../js/calculator.js"></script>` : ''}
</body>
</html>`;

const homeContent = `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <div class="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Professional Financial Tools for <br class="hidden md:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Smarter Decisions</span>
        </h1>
        <p class="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Access 20 free, mobile-friendly financial calculators. From EMI and SIP to Income Tax and Retirement planning, we've got the tools you need to succeed.
        </p>
        <a href="tools.html" class="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30 text-lg">
            Explore All Tools
        </a>
    </div>

    <!-- Ad Banner Top -->
    <div class="w-full max-w-4xl mx-auto h-[90px] bg-slate-200 border border-slate-300 rounded-xl flex flex-col items-center justify-center mb-16 text-slate-500 animate-on-scroll stagger-1">
        <span class="text-xs uppercase tracking-wider font-semibold mb-1">Advertisement</span>
        <span class="text-sm">728 x 90 Banner Space</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        ${tools.slice(0, 8).map((tool, index) => `
        <a href="tools/${tool.id}.html" class="group bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col h-full animate-on-scroll" style="animation-delay: ${index * 0.1}s">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">${tool.name}</h3>
            <p class="text-sm text-slate-500 flex-grow leading-relaxed">${tool.desc}</p>
        </a>`).join('')}
    </div>
    
    <div class="text-center">
        <a href="tools.html" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            View all 20 calculators &rarr;
        </a>
    </div>
</div>`;

const toolsContent = `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <div class="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">All Financial Tools</h1>
        <p class="text-lg text-slate-600">Choose from our comprehensive suite of 20 financial calculators.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        ${tools.map((tool, index) => `
        <a href="tools/${tool.id}.html" class="group bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col h-full animate-on-scroll" style="animation-delay: ${(index % 4) * 0.1}s">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h2 class="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">${tool.name}</h2>
            <p class="text-sm text-slate-500 flex-grow leading-relaxed">${tool.desc}</p>
        </a>`).join('')}
    </div>
</div>`;

const aboutContent = `
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <h1 class="text-4xl font-extrabold text-slate-900 mb-6 animate-on-scroll">About SmartFinance Tools</h1>
    <div class="prose prose-slate prose-blue max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-on-scroll stagger-1">
        <p class="text-lg text-slate-600 mb-6">Welcome to SmartFinance Tools, your number one source for all financial calculators. We're dedicated to giving you the very best of financial tools, with a focus on accuracy, ease of use, and mobile-friendly design.</p>
        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Mission</h2>
        <p class="text-slate-600 mb-6">Our mission is to empower individuals to make smarter financial decisions by providing accessible, fast, and reliable calculation tools.</p>
        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Why Choose Us?</h2>
        <ul class="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li><strong>100% Free:</strong> All our 20+ tools are completely free to use.</li>
            <li><strong>Mobile Optimized:</strong> Calculate on the go with our responsive design.</li>
            <li><strong>Privacy First:</strong> We don't store your financial data. All calculations happen right in your browser.</li>
            <li><strong>Fast & Reliable:</strong> Instant results without page reloads.</li>
        </ul>
    </div>
</div>`;

const contactContent = `
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <h1 class="text-4xl font-extrabold text-slate-900 mb-6 animate-on-scroll">Contact Us</h1>
    <p class="text-lg text-slate-600 mb-10 animate-on-scroll stagger-1">Have a question, suggestion, or found a bug? We'd love to hear from you.</p>
    
    <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm max-w-2xl text-center mx-auto animate-on-scroll stagger-2">
        <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Email Us Directly</h2>
        <p class="text-slate-600 mb-8">For any inquiries, support, or feedback, please reach out to us via email. We typically respond within 24-48 hours.</p>
        <a href="mailto:rk3768768@gmail.com" class="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md shadow-blue-500/20 text-lg">
            rk3768768@gmail.com
        </a>
    </div>
</div>`;

const privacyContent = `
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <h1 class="text-4xl font-extrabold text-slate-900 mb-6 animate-on-scroll">Privacy Policy</h1>
    <div class="prose prose-slate prose-blue max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-on-scroll stagger-1">
        <p>Last updated: March 2026</p>
        <h2>1. Information We Collect</h2>
        <p>Our financial calculators run entirely in your browser. We do not store, collect, or transmit any of the financial data you enter into our calculators to our servers. All calculations are performed locally on your device.</p>
        <h2>2. Cookies and Web Beacons</h2>
        <p>Like any other website, SmartFinance Tools uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>
        <h2>3. Third-Party Privacy Policies</h2>
        <p>SmartFinance Tools's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>
    </div>
</div>`;

const termsContent = `
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <h1 class="text-4xl font-extrabold text-slate-900 mb-6 animate-on-scroll">Terms and Conditions</h1>
    <div class="prose prose-slate prose-blue max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-on-scroll stagger-1">
        <h2>1. Terms</h2>
        <p>By accessing the website at SmartFinance Tools, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        <h2>2. Disclaimer</h2>
        <p>The materials on SmartFinance Tools's website are provided on an 'as is' basis. SmartFinance Tools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
    </div>
</div>`;

const disclaimerContent = `
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <h1 class="text-4xl font-extrabold text-slate-900 mb-6 animate-on-scroll">Disclaimer</h1>
    <div class="prose prose-slate prose-blue max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-on-scroll stagger-1">
        <p><strong>Not Financial Advice:</strong> The calculators and information provided on SmartFinance Tools are for educational and informational purposes only. They do not constitute financial, investment, tax, or legal advice.</p>
        <p>While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
    </div>
</div>`;

const cookieContent = `
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <h1 class="text-4xl font-extrabold text-slate-900 mb-6 animate-on-scroll">Cookie Policy</h1>
    <div class="prose prose-slate prose-blue max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-on-scroll stagger-1">
        <p>Last updated: March 2026</p>
        <h2>1. What Are Cookies</h2>
        <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.</p>
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
        <h2>3. The Cookies We Set</h2>
        <ul>
            <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it.</li>
            <li><strong>Third-party cookies:</strong> In some special cases, we also use cookies provided by trusted third parties, such as analytics or advertising partners (e.g., Google AdSense).</li>
        </ul>
        <h2>4. Disabling Cookies</h2>
        <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.</p>
    </div>
</div>`;

const generateToolSEOContent = (tool) => {
    return `
        <div class="prose prose-slate prose-blue max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">What is the ${tool.name}?</h2>
            <p class="text-slate-600 mb-4">
                The ${tool.name} is an advanced, user-friendly financial utility designed to help individuals and professionals make accurate, data-driven decisions. 
                In today's fast-paced economic environment, having a clear understanding of your financial trajectory is more important than ever. 
                This tool specifically addresses the need for precise calculations regarding ${tool.desc.toLowerCase()} By automating complex mathematical formulas, 
                it removes the guesswork from your financial planning process.
            </p>
            <p class="text-slate-600 mb-6">
                Whether you are a seasoned investor, a student trying to manage debt, a prospective homebuyer, or simply someone looking to optimize their monthly budget, 
                the ${tool.name} provides instant clarity. It serves as a digital advisor, allowing you to model various financial scenarios by simply adjusting the input parameters. 
                This level of insight is crucial for setting realistic goals, avoiding unnecessary financial strain, and maximizing your potential returns or savings over time.
            </p>
            
            <h2 class="text-2xl font-bold text-slate-900 mb-4">How it Works</h2>
            <p class="text-slate-600 mb-4">
                At its core, the ${tool.name} operates on established financial algorithms and standard mathematical principles used by banks, financial institutions, and certified planners worldwide. 
                When you input your specific variables—such as principal amounts, interest rates, time horizons, or regular contribution amounts—the calculator's underlying JavaScript engine processes these figures in real-time.
            </p>
            <p class="text-slate-600 mb-6">
                Because all calculations are performed locally within your web browser, the tool offers instantaneous results without any lag. 
                More importantly, this client-side processing ensures that your sensitive financial data is never transmitted to or stored on our servers. 
                Your privacy and security are maintained at all times. The tool accounts for compounding periods, amortization schedules, and proportional distributions where applicable, 
                delivering a comprehensive breakdown that goes beyond a simple final number.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mb-4">Example Calculation</h2>
            <p class="text-slate-600 mb-4">
                To illustrate the practical value of the ${tool.name}, let's consider a hypothetical scenario. 
                Imagine you are trying to evaluate a financial decision involving a baseline figure of $10,000, an annual rate or variable of 5%, over a standard period of 5 years. 
                If you were to calculate this manually, you would need to account for compounding effects, periodic adjustments, and potential fees, which can quickly become a tedious and error-prone task.
            </p>
            <p class="text-slate-600 mb-6">
                By entering these exact figures into the ${tool.name}, the complex arithmetic is handled instantly. 
                The calculator not only provides the final projected outcome but also breaks down the total interest, principal, or net difference accumulated over the specified term. 
                This granular visibility allows you to see exactly how much of your money is working for you, or conversely, how much a loan might truly cost you in the long run. 
                Adjusting the rate by just 1% or the term by a single year instantly updates the results, demonstrating the profound impact of seemingly small variables on your overall financial health.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mb-4">How to Use the Tool</h2>
            <p class="text-slate-600 mb-4">
                We have designed the ${tool.name} to be as intuitive and accessible as possible, requiring no prior financial expertise to operate effectively. 
                To get the most accurate results, follow these simple steps:
            </p>
            <ol class="list-decimal pl-6 text-slate-600 space-y-3 mb-6">
                <li><strong>Gather Your Data:</strong> Before starting, ensure you have the correct figures at hand. This might include your current balance, expected interest rates, target goals, or specific timeframes.</li>
                <li><strong>Input the Primary Value:</strong> Enter your starting amount, principal, or total cost into the first input field. Ensure you do not include currency symbols or commas, as the calculator formats these automatically.</li>
                <li><strong>Set the Rate:</strong> Input the relevant percentage rate. Pay attention to whether the tool asks for an annual or monthly rate, and enter the number accordingly.</li>
                <li><strong>Define the Timeframe:</strong> Enter the duration of your financial plan, usually in months or years, as specified by the input label.</li>
                <li><strong>Calculate and Analyze:</strong> Click the "Calculate Now" button. The results will appear instantly below the form. Take time to review not just the primary result, but the detailed breakdown provided, which offers deeper insights into your financial scenario.</li>
            </ol>
            <p class="text-slate-600">
                Feel free to experiment with different numbers. The true power of the ${tool.name} lies in its ability to help you run "what-if" scenarios, empowering you to make the best possible financial choices for your unique situation.
            </p>
        </div>
    `;
};

const toolTemplate = (tool) => `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Breadcrumb -->
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="../index.html" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600">Home</a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-slate-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>
            <a href="../tools.html" class="ml-1 text-sm font-medium text-slate-500 hover:text-blue-600 md:ml-2">Tools</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-slate-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>
            <span class="ml-1 text-sm font-medium text-slate-800 md:ml-2">${tool.name}</span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 animate-on-scroll">
            <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">${tool.name}</h1>
                <p class="text-lg text-slate-600">${tool.desc}</p>
            </div>

            <!-- Calculator Form -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-10 hover:shadow-md transition-shadow duration-300">
                <form id="calc-form" data-tool="${tool.id}" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="dynamic-inputs">
                        <!-- Inputs injected by JS -->
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-blue-500/20 text-lg">
                        Calculate Now
                    </button>
                </form>

                <div id="result-container" class="hidden mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center transition-all duration-500">
                    <p class="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">Calculation Result</p>
                    <p id="result-value" class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">$0.00</p>
                    <div id="result-details" class="text-sm text-slate-600 space-y-2"></div>
                </div>
            </div>

            <!-- In-content Ad -->
            <div class="w-full h-[90px] bg-slate-200 border border-slate-300 rounded-xl flex flex-col items-center justify-center mb-10 text-slate-500">
                <span class="text-xs uppercase tracking-wider font-semibold mb-1">Advertisement</span>
                <span class="text-sm">728 x 90 Banner Space</span>
            </div>

            <!-- SEO Content -->
            ${generateToolSEOContent(tool)}
        </div>

        <!-- Sidebar -->
        <div class="space-y-8 animate-on-scroll stagger-2">
            <!-- Sidebar Ad -->
            <div class="w-full h-[600px] bg-slate-200 border border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 sticky top-24">
                <span class="text-xs uppercase tracking-wider font-semibold mb-1">Advertisement</span>
                <span class="text-sm">300 x 600 Half Page</span>
            </div>
        </div>
    </div>
</div>
`;

const blogs = [
    {
        id: 'how-emi-calculator-works',
        title: 'How EMI Calculator Works: A Complete Guide',
        description: 'Understand the math behind Equated Monthly Installments and how an EMI calculator can help you plan your loans better.',
        image: 'https://picsum.photos/seed/emi/800/500',
        author: 'Sarah Jenkins',
        date: 'March 10, 2026',
        content: `
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h3 class="text-lg font-bold text-slate-900 mb-3">Table of Contents</h3>
                <ul class="list-disc pl-5 space-y-2 text-blue-600">
                    <li><a href="#introduction" class="hover:underline">Introduction to EMI</a></li>
                    <li><a href="#formula" class="hover:underline">The EMI Formula</a></li>
                    <li><a href="#benefits" class="hover:underline">Benefits of Using an EMI Calculator</a></li>
                    <li><a href="#conclusion" class="hover:underline">Conclusion</a></li>
                </ul>
            </div>
            <h2 id="introduction">Introduction to EMI</h2>
            <p>Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. Equated monthly installments are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.</p>
            
            <h2 id="formula">The EMI Formula</h2>
            <p>The mathematical formula for calculating EMIs is: <strong>E = P x r x (1 + r)^n / ((1 + r)^n - 1)</strong></p>
            <p>Where:</p>
            <ul>
                <li><strong>E</strong> is EMI</li>
                <li><strong>P</strong> is Principal Loan Amount</li>
                <li><strong>r</strong> is rate of interest calculated on monthly basis (i.e., r = Rate of Annual interest/12/100)</li>
                <li><strong>n</strong> is loan term / tenure / duration in number of months</li>
            </ul>

            <h2 id="benefits">Benefits of Using an EMI Calculator</h2>
            <p>Using an <a href="../tools/emi-calculator.html" class="text-blue-600 hover:underline font-semibold">EMI Calculator</a> helps you make informed financial decisions. It allows you to:</p>
            <ul>
                <li>Plan your monthly budget effectively.</li>
                <li>Compare different loan offers from various banks.</li>
                <li>Determine the right loan tenure that suits your repayment capacity.</li>
            </ul>

            <h2 id="conclusion">Conclusion</h2>
            <p>Understanding how your EMI is calculated empowers you to take control of your debt. Always use a reliable calculator before committing to any loan agreement to ensure it fits within your financial goals.</p>
        `
    },
    {
        id: 'what-is-sip-investment',
        title: 'What is SIP Investment and Why You Need It',
        description: 'Discover the power of Systematic Investment Plans (SIP) and how they can help you build long-term wealth through compounding.',
        image: 'https://picsum.photos/seed/sip/800/500',
        author: 'Michael Chen',
        date: 'March 12, 2026',
        content: `
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h3 class="text-lg font-bold text-slate-900 mb-3">Table of Contents</h3>
                <ul class="list-disc pl-5 space-y-2 text-blue-600">
                    <li><a href="#introduction" class="hover:underline">Introduction to SIP</a></li>
                    <li><a href="#rupee-cost" class="hover:underline">Rupee Cost Averaging</a></li>
                    <li><a href="#compounding" class="hover:underline">The Power of Compounding</a></li>
                    <li><a href="#conclusion" class="hover:underline">Conclusion</a></li>
                </ul>
            </div>
            <h2 id="introduction">Introduction to SIP</h2>
            <p>A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds to investors, allowing them to invest small amounts periodically instead of lump sums. The frequency of investment is usually weekly, monthly, or quarterly.</p>
            
            <h2 id="rupee-cost">Rupee Cost Averaging</h2>
            <p>One of the biggest advantages of SIP is Rupee Cost Averaging. Since you invest a fixed amount regularly, you buy more units when the market is low and fewer units when the market is high. This averages out the cost of your investments over time.</p>

            <h2 id="compounding">The Power of Compounding</h2>
            <p>SIPs work best when you invest for the long term. The returns you earn on your investments start earning returns themselves. You can see this magic in action using our <a href="../tools/sip-calculator.html" class="text-blue-600 hover:underline font-semibold">SIP Calculator</a>.</p>

            <h2 id="conclusion">Conclusion</h2>
            <p>Starting a SIP early, even with a small amount, can lead to significant wealth creation over time. It instills financial discipline and takes the emotion out of investing.</p>
        `
    },
    {
        id: 'how-to-calculate-loan-interest',
        title: 'How to Calculate Loan Interest Easily',
        description: 'Learn the different methods of calculating loan interest and how to minimize your total interest payout.',
        image: 'https://picsum.photos/seed/loan/800/500',
        author: 'David Smith',
        date: 'March 14, 2026',
        content: `
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h3 class="text-lg font-bold text-slate-900 mb-3">Table of Contents</h3>
                <ul class="list-disc pl-5 space-y-2 text-blue-600">
                    <li><a href="#introduction" class="hover:underline">Understanding Loan Interest</a></li>
                    <li><a href="#types" class="hover:underline">Types of Interest Rates</a></li>
                    <li><a href="#calculation" class="hover:underline">Calculating Your Interest</a></li>
                    <li><a href="#conclusion" class="hover:underline">Conclusion</a></li>
                </ul>
            </div>
            <h2 id="introduction">Understanding Loan Interest</h2>
            <p>When you borrow money, you pay back the principal amount plus interest. The interest is the cost of borrowing. Understanding how this is calculated can save you thousands of dollars.</p>
            
            <h2 id="types">Types of Interest Rates</h2>
            <p>There are generally two types of interest rates:</p>
            <ul>
                <li><strong>Flat Rate:</strong> Interest is calculated on the entire initial principal amount throughout the loan tenure.</li>
                <li><strong>Reducing Balance Rate:</strong> Interest is calculated only on the outstanding principal balance, which reduces as you pay your EMIs.</li>
            </ul>

            <h2 id="calculation">Calculating Your Interest</h2>
            <p>While the manual calculation can be complex, especially for reducing balance loans, you can easily use our <a href="../tools/loan-calculator.html" class="text-blue-600 hover:underline font-semibold">Loan Calculator</a> to get an exact amortization schedule and total interest payable.</p>

            <h2 id="conclusion">Conclusion</h2>
            <p>Always ask your lender whether the interest is flat or reducing balance. A lower flat rate might actually cost you more than a slightly higher reducing balance rate.</p>
        `
    },
    {
        id: 'compound-interest-explained',
        title: 'Compound Interest Explained: The 8th Wonder',
        description: 'Albert Einstein reportedly called compound interest the 8th wonder of the world. Find out why it is crucial for your savings.',
        image: 'https://picsum.photos/seed/compound/800/500',
        author: 'Emma Wilson',
        date: 'March 15, 2026',
        content: `
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h3 class="text-lg font-bold text-slate-900 mb-3">Table of Contents</h3>
                <ul class="list-disc pl-5 space-y-2 text-blue-600">
                    <li><a href="#introduction" class="hover:underline">What is Compound Interest?</a></li>
                    <li><a href="#impact" class="hover:underline">The Impact of Time</a></li>
                    <li><a href="#tools" class="hover:underline">Using Tools to Visualize Growth</a></li>
                    <li><a href="#conclusion" class="hover:underline">Conclusion</a></li>
                </ul>
            </div>
            <h2 id="introduction">What is Compound Interest?</h2>
            <p>Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.</p>
            
            <h2 id="impact">The Impact of Time</h2>
            <p>The most crucial factor in compound interest is time. The longer you leave your money invested, the more dramatic the growth becomes. This is why starting to save early is so important.</p>

            <h2 id="tools">Using Tools to Visualize Growth</h2>
            <p>To truly understand how your money can grow, try using our <a href="../tools/fd-calculator.html" class="text-blue-600 hover:underline font-semibold">FD Calculator</a> or <a href="../tools/compound-interest-calculator.html" class="text-blue-600 hover:underline font-semibold">Compound Interest Calculator</a>. You'll see how different interest rates and time periods affect your final amount.</p>

            <h2 id="conclusion">Conclusion</h2>
            <p>Make compound interest work for you by investing early and consistently. It's the most reliable path to financial independence.</p>
        `
    },
    {
        id: 'best-budget-planning-tips',
        title: 'Best Budget Planning Tips for Beginners',
        description: 'Take control of your finances with these simple, effective budget planning tips and strategies.',
        image: 'https://picsum.photos/seed/budget/800/500',
        author: 'Robert Taylor',
        date: 'March 16, 2026',
        content: `
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h3 class="text-lg font-bold text-slate-900 mb-3">Table of Contents</h3>
                <ul class="list-disc pl-5 space-y-2 text-blue-600">
                    <li><a href="#introduction" class="hover:underline">Why Budgeting Matters</a></li>
                    <li><a href="#rule-50-30-20" class="hover:underline">The 50/30/20 Rule</a></li>
                    <li><a href="#tracking" class="hover:underline">Tracking Your Expenses</a></li>
                    <li><a href="#conclusion" class="hover:underline">Conclusion</a></li>
                </ul>
            </div>
            <h2 id="introduction">Why Budgeting Matters</h2>
            <p>A budget is simply a plan for your money. It tells your money where to go instead of wondering where it went. Budgeting is the foundation of any solid financial plan.</p>
            
            <h2 id="rule-50-30-20">The 50/30/20 Rule</h2>
            <p>A popular budgeting method is the 50/30/20 rule:</p>
            <ul>
                <li><strong>50% Needs:</strong> Groceries, housing, basic utilities, transportation.</li>
                <li><strong>30% Wants:</strong> Entertainment, dining out, shopping.</li>
                <li><strong>20% Savings & Debt:</strong> Retirement contributions, emergency fund, extra debt payments.</li>
            </ul>

            <h2 id="tracking">Tracking Your Expenses</h2>
            <p>You can't manage what you don't measure. Use our <a href="../tools/budget-planner.html" class="text-blue-600 hover:underline font-semibold">Budget Planner</a> to track your income and expenses. Also, keep an eye on how <a href="../tools/inflation-calculator.html" class="text-blue-600 hover:underline font-semibold">inflation</a> affects your purchasing power over time.</p>

            <h2 id="conclusion">Conclusion</h2>
            <p>Budgeting doesn't mean restricting yourself; it means giving yourself permission to spend on what truly matters to you while securing your future.</p>
        `
    }
];

const blogListContent = `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <div class="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">SmartFinance Blog</h1>
        <p class="text-lg text-slate-600">Insights, tips, and guides to help you make smarter financial decisions.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        ${blogs.map((blog, index) => `
        <article class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col animate-on-scroll" style="animation-delay: ${(index % 3) * 0.1}s">
            <a href="blog/${blog.id}.html" class="block aspect-video overflow-hidden">
                <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer">
            </a>
            <div class="p-6 flex flex-col flex-grow">
                <div class="text-sm text-slate-500 mb-3 flex items-center gap-2">
                    <span>${blog.date}</span>
                    <span>&bull;</span>
                    <span>${blog.author}</span>
                </div>
                <h2 class="text-xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                    <a href="blog/${blog.id}.html">${blog.title}</a>
                </h2>
                <p class="text-slate-600 mb-6 flex-grow line-clamp-3">${blog.description}</p>
                <a href="blog/${blog.id}.html" class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors mt-auto">
                    Read Article 
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
            </div>
        </article>
        `).join('')}
    </div>
</div>
`;

const blogPostTemplate = (blog) => `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Breadcrumb -->
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="../index.html" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600">Home</a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-slate-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>
            <a href="../blog.html" class="ml-1 text-sm font-medium text-slate-500 hover:text-blue-600 md:ml-2">Blog</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-slate-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>
            <span class="ml-1 text-sm font-medium text-slate-800 md:ml-2 truncate max-w-[200px] sm:max-w-xs">${blog.title}</span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 animate-on-scroll">
            <article class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-10">
                <img src="${blog.image}" alt="${blog.title}" class="w-full h-[300px] md:h-[400px] object-cover" referrerPolicy="no-referrer">
                <div class="p-6 md:p-10">
                    <div class="flex items-center gap-4 text-sm text-slate-500 mb-6">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            ${blog.author}
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            ${blog.date}
                        </div>
                    </div>
                    
                    <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">${blog.title}</h1>
                    
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                        <h3 class="text-lg font-bold text-slate-900 mb-3">Table of Contents</h3>
                        <ul class="space-y-2 text-slate-600">
                            ${(blog.content.match(/<h2 id="([^"]+)">([^<]+)<\/h2>/g) || []).map(h2 => {
                                const match = h2.match(/<h2 id="([^"]+)">([^<]+)<\/h2>/);
                                return `<li><a href="#${match[1]}" class="hover:text-blue-600 transition-colors">${match[2]}</a></li>`;
                            }).join('')}
                        </ul>
                    </div>

                    <div class="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-slate-600">
                        ${blog.content}
                    </div>
                </div>
            </article>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8 animate-on-scroll stagger-2">
            <!-- Popular Tools Widget -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Popular Tools
                </h3>
                <ul class="space-y-3">
                    <li><a href="../tools/emi-calculator.html" class="flex items-center justify-between group"><span class="text-slate-600 group-hover:text-blue-600 transition-colors">EMI Calculator</span><svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                    <li><a href="../tools/sip-calculator.html" class="flex items-center justify-between group"><span class="text-slate-600 group-hover:text-blue-600 transition-colors">SIP Calculator</span><svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                    <li><a href="../tools/fd-calculator.html" class="flex items-center justify-between group"><span class="text-slate-600 group-hover:text-blue-600 transition-colors">FD Calculator</span><svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                    <li><a href="../tools/income-tax-calculator.html" class="flex items-center justify-between group"><span class="text-slate-600 group-hover:text-blue-600 transition-colors">Income Tax Calculator</span><svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                    <li><a href="../tools/budget-planner.html" class="flex items-center justify-between group"><span class="text-slate-600 group-hover:text-blue-600 transition-colors">Budget Planner</span><svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                </ul>
            </div>

            <!-- Sidebar Ad -->
            <div class="w-full h-[600px] bg-slate-200 border border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 sticky top-24">
                <span class="text-xs uppercase tracking-wider font-semibold mb-1">Advertisement</span>
                <span class="text-sm">300 x 600 Half Page</span>
            </div>
        </div>
    </div>
</div>
`;

// Create directories
if (!fs.existsSync('css')) fs.mkdirSync('css');
if (!fs.existsSync('js')) fs.mkdirSync('js');
if (!fs.existsSync('blog')) fs.mkdirSync('blog');

// Write CSS
const cssContent = `
/* Custom styles if needed, Tailwind handles most */
html {
  scroll-behavior: smooth;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.animate-on-scroll {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
`;
fs.writeFileSync(path.join('css', 'style.css'), cssContent);

// Write JS
const mainJsContent = `
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            var menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                
                // Remove animation classes after completion to prevent hover glitches
                entry.target.addEventListener('animationend', function() {
                    entry.target.classList.remove('animate-on-scroll', 'animate-fade-in-up');
                    entry.target.style.animationDelay = '';
                }, { once: true });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
`;
fs.writeFileSync(path.join('js', 'main.js'), mainJsContent);

const calculatorJsContent = `
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
        let inputHtml = \`<input type="\${field.type}" id="\${field.id}" value="\${field.value}" required step="any" class="w-full \${field.prefix ? 'pl-8' : 'pl-4'} \${field.suffix ? 'pr-8' : 'pr-4'} py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white" />\`;
        
        let wrapperHtml = inputHtml;
        if (field.prefix || field.suffix) {
            wrapperHtml = \`<div class="relative">
                \${field.prefix ? \`<span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">\${field.prefix}</span>\` : ''}
                \${inputHtml}
                \${field.suffix ? \`<span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">\${field.suffix}</span>\` : ''}
            </div>\`;
        }

        div.innerHTML = \`
            <label class="block text-sm font-semibold text-slate-700 mb-2">\${field.label}</label>
            \${wrapperHtml}
        \`;
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
                details = \`Total Principal: \${formatMoney(p)}<br>Total Interest: \${formatMoney(totalInterest)}<br>Total Payment: \${formatMoney(totalPayment)}\`;
                break;
            }
            case 'sip-calculator': {
                const p = vals.amount;
                const r = (vals.rate / 100) / 12;
                const n = vals.years * 12;
                result = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
                const invested = p * n;
                details = \`Total Invested: \${formatMoney(invested)}<br>Est. Returns: \${formatMoney(result - invested)}\`;
                break;
            }
            case 'fd-calculator':
            case 'compound-interest-calculator':
            case 'investment-return-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const t = vals.years;
                result = p * Math.pow(1 + r, t);
                details = \`Principal: \${formatMoney(p)}<br>Interest Earned: \${formatMoney(result - p)}\`;
                break;
            }
            case 'rd-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const n = vals.years * 12;
                // RD formula approximation
                result = p * n + p * n * (n + 1) / 2 * r / 12;
                details = \`Total Invested: \${formatMoney(p * n)}<br>Interest Earned: \${formatMoney(result - (p * n))}\`;
                break;
            }
            case 'simple-interest-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const t = vals.years;
                const interest = p * r * t;
                result = p + interest;
                details = \`Principal: \${formatMoney(p)}<br>Interest Earned: \${formatMoney(interest)}\`;
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
                    details = \`Total Months: \${result}<br>Total Interest Paid: \${formatMoney(totalPaid - b)}\`;
                    document.getElementById('result-value').innerText = result + ' Months';
                }
                break;
            }
            case 'gst-calculator': {
                const p = vals.amount;
                const gst = p * (vals.rate / 100);
                result = p + gst;
                details = \`Original Amount: \${formatMoney(p)}<br>GST Amount: \${formatMoney(gst)}\`;
                break;
            }
            case 'salary-calculator': {
                const h = vals.amount;
                const w = vals.hours;
                const weekly = h * w;
                const monthly = weekly * 52 / 12;
                result = weekly * 52;
                details = \`Weekly: \${formatMoney(weekly)}<br>Monthly: \${formatMoney(monthly)}\`;
                break;
            }
            case 'income-tax-calculator': {
                const inc = vals.amount;
                const tax = inc * (vals.rate / 100);
                result = inc - tax;
                details = \`Gross Income: \${formatMoney(inc)}<br>Tax Amount: \${formatMoney(tax)}\`;
                break;
            }
            case 'budget-planner': {
                const inc = vals.income;
                const exp = vals.expenses;
                result = inc - exp;
                details = \`Total Income: \${formatMoney(inc)}<br>Total Expenses: \${formatMoney(exp)}\`;
                break;
            }
            case 'savings-calculator': {
                const g = vals.goal;
                const m = vals.months;
                result = g / m;
                details = \`Goal: \${formatMoney(g)}<br>Time: \${m} months\`;
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
                details = \`Total Invested: \${formatMoney(invested)}<br>Interest Earned: \${formatMoney(result - invested)}\`;
                break;
            }
            case 'currency-converter': {
                result = vals.amount * vals.rate;
                details = \`Rate: \${vals.rate}\`;
                document.getElementById('result-value').innerText = result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                break;
            }
            case 'profit-loss-calculator': {
                const cp = vals.cost;
                const sp = vals.sell;
                result = sp - cp;
                const percent = (result / cp) * 100;
                details = \`Margin: \${percent.toFixed(2)}%\`;
                break;
            }
            case 'discount-calculator': {
                const p = vals.amount;
                const d = p * (vals.rate / 100);
                result = p - d;
                details = \`Original Price: \${formatMoney(p)}<br>You Save: \${formatMoney(d)}\`;
                break;
            }
            case 'inflation-calculator': {
                const p = vals.amount;
                const r = vals.rate / 100;
                const t = vals.years;
                result = p * Math.pow(1 + r, t);
                details = \`Purchasing power equivalent in \${t} years.\`;
                break;
            }
        }

        if (toolId !== 'credit-card-payoff-calculator' && toolId !== 'currency-converter') {
            document.getElementById('result-value').innerText = formatMoney(result);
        }
        
        document.getElementById('result-details').innerHTML = details;
        const resultContainer = document.getElementById('result-container');
        resultContainer.classList.remove('hidden');
        
        // Retrigger animation
        resultContainer.classList.remove('animate-fade-in-up');
        void resultContainer.offsetWidth; // trigger reflow
        resultContainer.classList.add('animate-fade-in-up');
    });
});
`;
fs.writeFileSync(path.join('js', 'calculator.js'), calculatorJsContent);

// Write HTML files
fs.writeFileSync('index.html', layout('Home', homeContent, true, 'SmartFinance Tools offers 20+ free financial calculators including EMI, SIP, Tax, and more.'));
fs.writeFileSync('tools.html', layout('All Tools', toolsContent, true, 'Browse all 20+ free financial calculators from SmartFinance Tools.'));
fs.writeFileSync('about.html', layout('About Us', aboutContent, true, 'Learn about SmartFinance Tools and our mission to provide free financial calculators.'));
fs.writeFileSync('contact.html', layout('Contact', contactContent, true, 'Contact SmartFinance Tools for support or inquiries.'));
fs.writeFileSync('privacy-policy.html', layout('Privacy Policy', privacyContent, true, 'Privacy Policy for SmartFinance Tools.'));
fs.writeFileSync('terms-of-service.html', layout('Terms of Service', termsContent, true, 'Terms of Service for SmartFinance Tools.'));
fs.writeFileSync('disclaimer.html', layout('Disclaimer', disclaimerContent, true, 'Disclaimer for SmartFinance Tools.'));
fs.writeFileSync('cookie-policy.html', layout('Cookie Policy', cookieContent, true, 'Cookie Policy for SmartFinance Tools.'));

fs.writeFileSync('blog.html', layout('Blog', blogListContent, true, 'Read the latest financial insights, tips, and guides on the SmartFinance Blog.'));

tools.forEach(tool => {
    fs.writeFileSync(path.join('tools', `${tool.id}.html`), layout(tool.name, toolTemplate(tool), false, tool.desc));
});

blogs.forEach(blog => {
    fs.writeFileSync(path.join('blog', `${blog.id}.html`), layout(blog.title, blogPostTemplate(blog), false, blog.description, blog.image));
});

console.log('Generated all HTML files successfully.');
