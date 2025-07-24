import { formatCurrency } from "../js/utils/money.js";

console.log('=================TEST SUITE: Format Currency=================')

if (formatCurrency(2095) === '20.95'){
    console.log('Converts cents into dollars: PASSED')
} else {
    console.log('Converts cents into dollars: FAILED')
}


if (formatCurrency(0) === '0.00'){
    console.log('Works with 0: PASSED')
} else {
    console.log('Works with 0: FAILED')
}


if (formatCurrency(2000.5) === '20.01'){
    console.log('Rounds up to the nearest cent: PASSED')
} else {
    console.log('Rounds up to the nearest cent: FAILED')
}


if (formatCurrency(2000.4) === '20.00'){
    console.log('Rounds down to the nearest value: PASSED')
} else {
    console.log('Rounds down to the nearest value: FAILED')
}