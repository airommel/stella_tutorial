console.log("Form module loaded");

document.querySelector('#myForm').addEventListener('submit', function (event) {
    // event.preventDefault();
    console.log("Form submitted");

    // submitForm();
    return false; // Prevent default form submission
})



function validateForm() {
    const form = document.querySelector('#myForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;


    for (let input of inputs) {
        if (!input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    if (isValid) {
        console.log("Form is valid");
        // You can submit the form or perform other actions here
    } else {
        console.log("Form is invalid");
    }

    return isValid;
}

function submitForm() {
    const form = document.querySelector('#myForm');
    if (validateForm()) {
        console.log("Submitting form data");
        const formData = new FormData(form);
        // Log form data for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        // Submit the form data
        // This is where you would typically send the data to a server
        console.log("Form data ready to be sent");
        // For example, using fetch or XMLHttpRequest
        fetch('/submit', {
            method: 'POST',
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log("Success:", data);
        }).catch(error => {
            console.error("Error:", error);
        });
        // Here you would typically send the form data to the server
        // For example, using fetch or XMLHttpRequest
    } else {
        console.log("Cannot submit, form is invalid");
    }
}