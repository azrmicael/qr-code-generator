// --- Variables and constants used ------ //

let currentDate = new Date();
let demoQR = document.getElementById("demoQR");
let inputURL = document.getElementById("inputURL");
let oldQR = document.getElementById("qrCode");
let saveAsBtn = document.getElementById("saveAsBtn");

// Determine the current date and time
let dateAndTime = ""
                + currentDate.getFullYear() + "-"  
                + (currentDate.getMonth() + 1)  + "-" 
                + currentDate.getDate() + "@"
                + currentDate.getHours() + "'"  
                + currentDate.getMinutes() + "'" 
                + currentDate.getSeconds()
;
console.log(dateAndTime); // --> 2023-11-3@14'24'56


// ================================================================= //
// --- When someone clicks the hamburger button -------------------- //
// ================================================================= //

// Constants
const nav = document.querySelector("#navbarSupportedContent");
const navToggle = document.querySelector(".navbar-toggler");

navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");

    if (visibility === "false") {
        // if the nav is closed, open it
        nav.setAttribute("data-visible", "true");
        navToggle.setAttribute("aria-expanded", "true");
    } else {
        // if the nav is open, close it
        nav.setAttribute("data-visible", "false");
        navToggle.setAttribute("aria-expanded", "false");
    }
});


// ================================================================= //
// --- Checks if an URL is valid ----------------------------------- //
// ================================================================= //

const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}


// ================================================================= //
// --- Disable the download button when the page is refreshed ------ //
// ================================================================= //

window.addEventListener("load", (e) => {
    saveAsBtn.setAttribute("disabled", "");
});


// ================================================================= //
// --- Disabling form submissions if there are invalid fields ------ //
// ================================================================= //

(() => {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
      
            form.classList.add('was-validated');

        }, false);
    });
})();


// ================================================================= //
// --- Create the link (a) to download the QR Code ----------------- //
// ================================================================= //

const downloadQRCode = (QRCodeImg) => {
    var a = document.createElement("a");
    a.href = QRCodeImg;
    a.download = `qr-code-${dateAndTime}.png`; // qr-code-2023-11-3@14'23'56.png
    a.click();
}


// ================================================================= //
// --- Generate a QR Code ------------------------------------------ //
// ================================================================= //

const generateQR = (content) => {
    demoQR.style.display = "none"
    oldQR.innerHTML = ""

    new QRCode(document.getElementById("qrCode"), {
        text: content,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}


// ================================================================= //
// --- EventListener to generate the final QR code ----------------- //
// ================================================================= //

inputURL.addEventListener("keyup", (e) => {
    if (e.target.value == "") {
        oldQR.innerHTML = ""
        demoQR.style.display = "block"
        saveAsBtn.setAttribute("disabled", "");
    } else {
        generateQR(e.target.value)
        saveAsBtn.removeAttribute('disabled');
    }
});


// ================================================================= //
// --- EventListener to save the QR Code as PNG -------------------- //
// ================================================================= //

saveAsBtn.addEventListener("click", () => {
    let imgSrc = document.getElementById("qrCode").querySelector("img").getAttribute("src");
    downloadQRCode(imgSrc);
});