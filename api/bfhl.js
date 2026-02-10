const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = req.body;
        let result;

        if (body.fibonacci !== undefined) {
            const n = parseInt(body.fibonacci);
            result = generateFibSeries(n);
        } else if (body.prime !== undefined) {
            const input = body.prime;
            result = filterPrimes(input);
        } else if (body.lcm !== undefined) {
            const input = body.lcm;
            result = calculateLCM(input);
        } else if (body.hcf !== undefined) {
            const input = body.hcf;
            result = calculateHCF(input);
        } else if (body.AI !== undefined) {
            const question = body.AI.toString();
            result = await askAI(question);
        } else {
            return res.json({
                is_success: false,
                official_email: "jatin1256.be23@chitkarauniversity.edu.in",
                data: "Invalid key"
            });
        }

        return res.json({
            is_success: true,
            official_email: "jatin1256.be23@chitkarauniversity.edu.in",
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ is_success: false, error: "Internal Server Error" });
    }
};

function generateFibSeries(n) {
    const series = [];
    for (let i = 0; i < n; i++) {
        series.push(fib(i));
    }
    return series;
}

function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b; // Note: original recursive, iterative is safer for JS stack
    // But to match exact logic:
    // if (n === 0) return 0;
    // if (n === 1) return 1;
    // return fib(n - 1) + fib(n - 2); 
    // Optimization: The original used recursion which is slow. I'll use the iterative one above which is correct.
}

// Re-implementing recursive to be 100% faithful to "logic", but optimization is better.
// Actually, let's use the recursive one if n is small, but for safety in Node (single threaded), iterative is better.
// Let's stick to the efficient implementation.

function filterPrimes(list) {
    const primes = [];
    for (const num of list) {
        if (isPrime(num)) {
            primes.push(num);
        }
    }
    return primes;
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function calculateLCM(list) {
    if (!list || list.length === 0) return 0;
    let result = list[0];
    for (let i = 1; i < list.length; i++) {
        result = lcm(result, list[i]);
    }
    return result;
}

function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

function calculateHCF(list) {
    if (!list || list.length === 0) return 0;
    let result = list[0];
    for (let i = 1; i < list.length; i++) {
        result = gcd(result, list[i]);
    }
    return result;
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

async function askAI(question) {
    try {
        const apiKey = "AIzaSyABl-G3RlvkcdGwjcBmnKJ7dY6cAydBqXk";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const body = {
            contents: [{
                parts: [{
                    text: question + "Answer in one word only"
                }]
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
             return data.candidates[0].content.parts[0].text;
        }
        return "No response from AI";

    } catch (e) {
        return "AI error";
    }
}
