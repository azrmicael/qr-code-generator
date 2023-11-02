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

    const btnSaveAs = document.getElementById("btnSaveAs");
    btnSaveAs.setAttribute("disabled", "");
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
// --- Get data from URL form submission --------------------------- //
// ================================================================= //

const urlForm = document.getElementById("urlForm");

urlForm.addEventListener("submit", e => {
    e.preventDefault();
    e.stopPropagation();

    let url = document.getElementById("inputURL").value;

    if (isValidUrl(url)) {

        // Remove previous QR Code
        document.getElementById("QRCode").innerHTML = "";

        // Create and display new QRCode
        new QRCode(document.getElementById("QRCode"), {
            text: url,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        
        // Enable the download button
        let btnSaveAs = document.getElementById("btnSaveAs");
        btnSaveAs.removeAttribute('disabled');
    }

    urlForm.classList.add('was-validated');

}, false);
