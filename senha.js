const inputEl = document.getElementById("password");
const upperCasecheckEl = document.getElementById("uppercase-check");
const numbercheckEl = document.getElementById("number-check");
const symbolcheckEl = document.getElementById("symbol-check");
const securityIndicatorBarEl = document.getElementById("security-indicator-bar");

let passwordLength = 16;

const generatePassword = () => {
    let chars = "abcdefghjklmnpqrstuvwxyz";

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numberChars = "123456789";
    const symbolChars = "?!@&*()[]"

    if(upperCasecheckEl.checked) {
        chars += upperCaseChars;
    }
    if(numbercheckEl.checked) {
        chars += numberChars;
    }
    if(symbolcheckEl.checked) {
        chars += symbolChars;
    }


    let password = "";

    for(let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1); 
    }

    
    inputEl.value = password;
    calculateQuality();
    calculateFontSize();
}

const calculateQuality = () => {


    const percent = Math.round((passwordLength / 64) * 25 + 
        (upperCasecheckEl.checked ? 15 : 0) + 
        (numbercheckEl.checked ? 25 : 0) +
        (symbolcheckEl.checked ? 35 : 0));

    console.log(percent);

    securityIndicatorBarEl.style.width = `${percent}%`;

    if(percent > 69) {
        securityIndicatorBarEl.classList.remove('critical');
        securityIndicatorBarEl.classList.remove('warning');
        securityIndicatorBarEl.classList.add('safe');
    }else if(percent > 50) {
        securityIndicatorBarEl.classList.remove('critical');
        securityIndicatorBarEl.classList.add('warning');
        securityIndicatorBarEl.classList.remove('safe');
    }else{
        securityIndicatorBarEl.classList.add('critical');
        securityIndicatorBarEl.classList.remove('warning');
        securityIndicatorBarEl.classList.remove('safe');
    }

    if(percent >= 100) {
        securityIndicatorBarEl.classList.add('completed');
    }else{
        securityIndicatorBarEl.classList.remove('completed');
    }
}

const calculateFontSize = () => {
    if(passwordLength > 45) {
        inputEl.classList.remove('font-sm');
        inputEl.classList.remove('font-xs');
        inputEl.classList.add('font-xxs');
    }else if(passwordLength > 32) {
        inputEl.classList.remove('font-sm');
        inputEl.classList.add('font-xs');
        inputEl.classList.remove('font-xxs');
    }else if(passwordLength > 22) {
        inputEl.classList.add('font-sm');
        inputEl.classList.remove('font-xs');
        inputEl.classList.remove('font-xxs');
    }else{
        inputEl.classList.remove('font-sm');
        inputEl.classList.remove('font-xs');
        inputEl.classList.remove('font-xxs');
    }
}


const copy = () => {
    navigator.clipboard.writeText(inputEl.value);
}

const passwordLengthEl = document.getElementById("password-length");
    passwordLengthEl.addEventListener("input", function() {
    passwordLength = passwordLengthEl.value;
    document.querySelector("#password-length-text").innerText = passwordLength;
    generatePassword();
});

upperCasecheckEl.addEventListener("click", generatePassword);
numbercheckEl.addEventListener("click", generatePassword);
symbolcheckEl.addEventListener("click", generatePassword);

document.getElementById("copy-1").addEventListener("click", copy);
document.getElementById("copy-2").addEventListener("click", copy);
document.getElementById('refresh').addEventListener("click", generatePassword);


generatePassword();
