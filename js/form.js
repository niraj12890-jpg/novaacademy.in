const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGDvI7rEHYqzbLplXq36yiZcE_7P7qyE8N0Wddc73QoMzt3uV5L399vW7-XDATC6cI/exec";

// ENQUIRY FORM
document.getElementById("enquiryForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(this));
  data.formType = "Enquiry";

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      alert("Enquiry Submitted Successfully");
      window.open(res.whatsapp, "_blank");
      this.reset();
    });
});

// REGISTRATION FORM
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(this));
  data.formType = "Registration";

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      alert("Registration Successful");
      window.open(res.whatsapp, "_blank");
      this.reset();
    });
});

