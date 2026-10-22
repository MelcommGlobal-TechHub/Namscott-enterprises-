"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const primaryNav = document.getElementById("primaryNav");

    /*
     * MOBILE NAVIGATION
     */

    function closeMenu() {
        if (!menuToggle || !primaryNav) return;

        primaryNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    if (menuToggle && primaryNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Open navigation" : "Close navigation"
            );

            primaryNav.classList.toggle("open", !isOpen);

        });

        primaryNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });

        document.addEventListener("click", function (event) {

            if (
                !primaryNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                const menuWasOpen =
                    menuToggle.getAttribute("aria-expanded") === "true";

                closeMenu();

                if (menuWasOpen) {
                    menuToggle.focus();
                }

            }

        });

        window.addEventListener("resize", function () {

            if (window.innerWidth > 700) {
                closeMenu();
            }

        });

    }


    /*
     * AUTOMATIC COPYRIGHT YEAR
     */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /*
     * CONTACT FORM
     *
     * Configure a real company email before enabling email drafts.
     * This form does not store submissions or send data to a server.
     */

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const formData = new FormData(contactForm);

            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const topic = String(formData.get("topic") || "").trim();
            const message = String(formData.get("message") || "").trim();

            if (!name || !email || !topic || !message) {

                if (formStatus) {
                    formStatus.textContent =
                        "Please complete all required fields.";
                }

                return;
            }

            /*
             * IMPORTANT:
             * Replace the placeholder below with the official
             * Namscott Enterprises business email address.
             */

            const companyEmail =
                "REPLACE-WITH-OFFICIAL-EMAIL@example.com";

            if (companyEmail.includes("REPLACE-WITH")) {

                if (formStatus) {
                    formStatus.textContent =
                        "The enquiry form is in demonstration mode. " +
                        "Set the official company email in app.js " +
                        "before using the email feature. " +
                        "Your information has not been sent or stored.";
                }

                return;
            }

            const subject = encodeURIComponent(
                "Namscott Enterprises Enquiry: " + topic
            );

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Enquiry type: " + topic + "\n\n" +
                message
            );

            if (formStatus) {
                formStatus.textContent =
                    "Opening your email application...";
            }

            window.location.href =
                "mailto:" + companyEmail +
                "?subject=" + subject +
                "&body=" + body;

        });

    }

});