/*
    Kliens oldali validáció 
        - kényelem (hibák jelzése űrlap beküldése előtt)
        - hatékonyság (nem kell várni a szerverre)
        - biztonság (kicsit nehezebb megtámadni az oldalt, mert több idő és
          energia egy érvényes request összedobása, mint az űrlap kitöltése)
    Szerver oldali validáció
*/

let signupForm = document.querySelector(".js-signup-form");
let emailField = signupForm.querySelector(".js-email-field");

function signupFormSubmitted(event) {
    event.preventDefault();

    let password1 = document.querySelector(".js-password1").value;
    let password2 = document.querySelector(".js-password2").value;
    console.log(password1, password2, password1 === password2);

    let pwdCrossValidation = document.querySelector(".js-pwd-cross");
    if (password1 !== password2) {
        pwdCrossValidation.innerText = "Passwords do not match.";
        pwdCrossValidation.classList.remove("hidden");
    } else {
        pwdCrossValidation.innerText = "";
        pwdCrossValidation.classList.add("hidden");
    }
}

function getEmailValidatorUrl() {
    // Eljátszhatjuk, hogy a szerverhez fordulunk.
    if (emailField.value.startsWith("invalid")) {
        return "../../dev/json/email_not_available.json";
    }
    if (emailField.value.startsWith("networkerror")) {
        return "../../dev/json/missing_json.json";
    }
    return "../../dev/json/email_available.json";
}

function emailFieldBlurred() {
    let emailValidationField = document.querySelector(".js-email-validation");
    fetch(getEmailValidatorUrl())
        .then((r) => r.json())
        .then((response) => {
            if (!response.available) {
                emailValidationField.innerText = "This email is not available.";
                emailValidationField.classList.remove("hidden");
            } else {
                emailValidationField.innerText = "";
                emailValidationField.classList.add("hidden");
            }
        })
        .catch((error) => {
            emailValidationField.innerText = `
                The registration service is not available. 
                Please try again later.
            `.trim();
            emailValidationField.classList.remove("hidden");
        });
}

signupForm.addEventListener("submit", signupFormSubmitted);
emailField.addEventListener("blur", emailFieldBlurred);
