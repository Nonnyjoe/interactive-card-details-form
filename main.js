// select all necessary dom Element
let holderName = document.getElementById('holderName');
let cardNumber = document.getElementById('cardNumber');
let month = document.getElementById('month');
let year = document.getElementById('year');
let cvc = document.getElementById('cvc');
let submit = document.getElementById('submit');
const Continue = document.getElementById('Continue');
let dispCardNumber = document.getElementById('dispCardNumber');
let dispCardName = document.getElementById('dispCardName');
let dispCardExp = document.getElementById('dispCardExp');
let dispCvc = document.getElementById('dispCvc');
const formSection = document.getElementById('formSection');
const thankYou = document.getElementById('thankYou');
let numberError = document.getElementById('numberError');
let yearError = document.getElementById('yearError');
let monthError = document.getElementById('monthError');
let cvcError = document.getElementById('cvcError');

// declare variables for valid entry verification
let nameCheck;
let numCheck;
let monthCheck;
let yearCheck;
let cvcCheck;

// function to activate submit button if form entries are valid
submitActive = () => {
    if ((nameCheck) && (numCheck) && (monthCheck) && (yearCheck) && (cvcCheck)) {
        submit.removeAttribute('disabled');
    }
}

// submit form content
submit.addEventListener('click', (e) => {
    e.preventDefault();
    setTimeout(() => {
        thankYou.classList.remove('noDisplay');
        formSection.classList.add('noDisplay');
    }, 2000)
})

// reload page to continue/ start over
Continue.addEventListener('click', (e) => {
    e.preventDefault();
    setTimeout(() => {
        document.location.reload(true);
    }, 1000)
})

// function to combine month and year into a single string
let combined = (a = 0, b = 0) => {
    let aNew;
    if (a.length === 1) {
        aNew = `0${a}`;
    } else {
        aNew = a;
    }
    let c = `${aNew}/${b}`;
    return c;
}

// main form validation functions
document.addEventListener('keyup', (e) => {
    let keyPress = e.key;
    let holderName1 = holderName.value;
    let cardNumber1 = cardNumber.value;
    let month1 = month.value;
    let year1 = year.value;
    let cvc1 = cvc.value;

    // check if card number is below 16 digits
    checkNumber = () => {
        if (cardNumber !== document.activeElement && cardNumber1.length < 16) {
            cardNumber.classList.add('is-invalid');
            cardNumber.classList.remove('is-valid');
            numberError.textContent = "Wrong format, Below 16 digits";
        }
    }

    // switch statement to isolate and check each form input entry based on which input field is active
    switch (true) {
        // card name validation
        case (holderName === document.activeElement):
            dispCardName.textContent = holderName1;
            if (holderName1.includes(' ') && holderName1.length > 5) {
                holderName.classList.add('is-valid')
                nameCheck = true;
            } else {
                holderName.classList.remove('is-valid')
            }
            submitActive();
            break;

            // cardNumber validation
        case (cardNumber === document.activeElement):
            if (cardNumber1.length < 16) {
                dispCardNumber.textContent = cardNumber1;
                cardNumber.classList.remove('is-valid');
                cardNumber.classList.remove('is-invalid');
                numberError.textContent = "";
                if (keyPress === "e" || keyPress === "-" || cardNumber1.includes('-')) {
                    numberError.textContent = "Wrong format, numbers only";
                    cardNumber.classList.add('is-invalid');
                }
            } else if (cardNumber1.length === 16 && (!(cardNumber1.includes('e'))) && (!(cardNumber1.includes('-')))) {
                dispCardNumber.textContent = cardNumber1;
                numberError.textContent = "";
                cardNumber.classList.add('is-valid');
                cardNumber.classList.remove('is-invalid');
                numCheck = true;
            } else {
                cardNumber.classList.add('is-invalid');
                cardNumber.classList.remove('is-valid');
                numberError.textContent = "Wrong format, exceeds 16 digits";
            }
            submitActive();
            break;

            // card cvc validation
        case (cvc === document.activeElement):
            if (cvc1.length < 3) {
                if (keyPress === "e" || keyPress === "-" || cardNumber1.includes('-') || cardNumber1.includes('e')) {
                    cvcError.textContent = "Wrong format, numbers only";
                    cvc.classList.add('is-invalid');
                } else {
                    cvcError.textContent = "";
                    dispCvc.textContent = cvc1;
                    cvc.classList.remove('is-valid');
                    cvc.classList.add('is-invalid');
                };
            } else if (cvc1.length === 3 && (!(cvc1.includes('e'))) && (!(cvc1.includes('-')))) {
                cvc.classList.add('is-valid');
                cvc.classList.remove('is-invalid');
                cvcError.textContent = "";
                dispCvc.textContent = cvc1;
                cvcCheck = true;
            } else {
                cvc.classList.remove('is-valid');
                cvc.classList.add('is-invalid');
                cvcError.textContent = "Wrong format, exceeds 3 digits";
            }
            submitActive();
            checkNumber();
            break;

            // card month validation
        case (month === document.activeElement):
            if (month1.length < 1 || month1.length > 2 || month1 < 1 || month1 > 12) {
                if (keyPress === "e" || keyPress === "-" || cardNumber1.includes('-') || cardNumber1.includes('e')) {
                    monthError.textContent = "Wrong format, numbers only";
                    month.classList.add('is-invalid');
                } else {
                    monthError.textContent = "Wrong format, 12months range only";
                    dispCardExp.textContent = combined(month1, year1);
                    month.classList.remove('is-valid');
                    month.classList.remove('is-invalid');
                };
            } else if (month1 <= 12) {
                dispCardExp.textContent = combined(month1, year1);
                month.classList.add('is-valid');
                month.classList.remove('is-invalid');
                monthError.textContent = "";
                monthCheck = true;
            } else {
                month.classList.remove('is-valid');
                month.classList.remove('is-invalid');
            }
            submitActive();
            checkNumber();
            break;

            // card year validation
        case (year === document.activeElement):
            if (year1.length < 4 || year1.length > 4 || year1 < 1) {
                year.classList.remove('is-valid');
                year.classList.add('is-invalid');
                if (keyPress === "e" || keyPress === "-" || cardNumber1.includes('-') || cardNumber1.includes('e')) {
                    yearError.textContent = "Wrong format, numbers only";
                    year.classList.add('is-invalid');
                } else {
                    yearError.textContent = "";
                    dispCardExp.textContent = combined(month1, year1);
                    year.classList.remove('is-valid');
                    year.classList.remove('is-invalid');
                };
            } else if (year1.length == 4 && year1 >= 1 && (!(year1.includes('e')))) {
                dispCardExp.textContent = combined(month1, year1);
                year.classList.add('is-valid');
                year.classList.remove('is-invalid');
                yearCheck = true;
            } else {
                year.classList.remove('is-valid');
                year.classList.add('is-invalid')
            }
            submitActive();
            checkNumber();
            break;
    };
})