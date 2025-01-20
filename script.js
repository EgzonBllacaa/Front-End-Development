// Hamburger Menu 
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".navbar__links-wrapper")
const body = document.body

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
    body.classList.toggle("no-scroll");
})


// Accordion
const accordionItems = document.querySelectorAll(".accordion__item");

accordionItems.forEach(item => {
    item.addEventListener("click", () => {
        const content = item.querySelector(".accordion__content");
        const isOpen = item.classList.contains("open");
        
        // Close all accordion items
        accordionItems.forEach(i => {
            i.classList.remove("open");
            i.querySelector(".accordion__content").style.maxHeight = "0";
        });

        // Toggle the clicked item
        if (!isOpen) {
            item.classList.add("open");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});


// Slider 
const swiper = new Swiper(".mySwiper", {
    effect: 'slide',
    speed: 1000,
    autoplay: {
        delay: 10000, 
        disableOnInteraction: false,
      },
    smooth: true,
    keyboard: true,
    // loop: true,
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        1025: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        0: {
            slidesPerView: 1,
            spaceBetween: 0,
        }
    },
});


// Input Validation
const firstName = document.getElementById("first-name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const error = formControl.querySelector(".error");
    error.innerText = message;
};

let formObject = {}; 
const form = document.getElementById("form");

const checkInputs = () => {
    const firstNameValue = firstName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    let isValid = true;

    // Validate first name
    if (firstNameValue === "") {
        setErrorFor(firstName, "First name cannot be blank");
        isValid = false;
    }

    // Validate email
    if (emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
        isValid = false;
    }

    // Validate message
    if (messageValue === "") {
        setErrorFor(message, "Message cannot be blank");
        isValid = false;
    } else if (messageValue.length > 250) {
        setErrorFor(message, "Message should be smaller than 250 characters.");
        isValid = false;
    }
    // Clear the errors 
    const clearErrors = () => {
        const errors = form.querySelectorAll(".error");
        errors.forEach(error => error.innerText = "");
    };
    if (isValid) {
        formObject["firstName"] = firstNameValue;
        formObject["email"] = emailValue;
        formObject["message"] = messageValue;
        form.reset();
        clearErrors();
    }

    return isValid;
};


const successModal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const btn = document.querySelector(".modal-button");

// Modal for success
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (checkInputs()) {
        successModal.style.display = "flex";
        successModal.style.alignItems = "center";
        successModal.style.justifyContent = "center";
        successModal.querySelector("p").innerText = `Your input has been successfully done. Thank you, dear ${formObject.firstName}!`;
        form.reset();
    }
});

closeBtn.addEventListener("click", () => {
    successModal.style.display = "none";
});

btn.addEventListener("click", () => {
    successModal.style.display = "none";
});
