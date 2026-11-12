// GET FORM ELEMENTS

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const phoneInput = document.getElementById("phone");

const messageInput = document.getElementById("message");

const formMessage = document.getElementById("formMessage");


// FORM SUBMISSION EVENT

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // GET INPUT VALUES

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const phone = phoneInput.value.trim();

    const message = messageInput.value.trim();


    // CHECK EMPTY FIELDS

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        message === ""
    ) {

        showMessage("Please fill in all fields.", "red");

        return;

    }


    // VALIDATE EMAIL

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showMessage("Please enter a valid email address.", "red");

        return;

    }


    // VALIDATE PHONE NUMBER

    const phonePattern = /^[0-9]+$/;

    if (!phonePattern.test(phone)) {

        showMessage("Phone number must contain digits only.", "red");

        return;

    }


    // CHECK PHONE NUMBER LENGTH

    if (phone.length < 7 || phone.length > 15) {

        showMessage("Please enter a valid phone number length.", "red");

        return;

    }


    // SUCCESS MESSAGE

    showMessage(
        "Your form has been validated successfully!",
        "green"
    );

    contactForm.reset();

});


// DISPLAY FORM MESSAGES

function showMessage(message, color) {

    formMessage.textContent = message;

    formMessage.style.color = color;

}
