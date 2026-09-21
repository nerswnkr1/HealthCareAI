const messageInput =
    document.getElementById("message");

const sendButton =
    document.getElementById("sendBtn");

const chatMessages =
    document.getElementById("chatMessages");


// Send message when Enter is pressed
messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }

});


// ================= SEND MESSAGE =================

async function sendMessage() {

    const message =
        messageInput.value.trim();

    if (message === "") {
        return;
    }


    // Show user message
    addMessage(message, "user");


    // Clear input
    messageInput.value = "";


    try {

        const response = await fetch(
            "/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        const data = await response.json();


        // Show AI response
        addMessage(
            data.reply,
            "bot"
        );

    }

    catch (error) {

        addMessage(
            "Sorry, something went wrong. Please try again.",
            "bot"
        );

        console.error(error);
    }
}


// ================= ADD MESSAGE =================

function addMessage(text, sender) {

    const messageDiv =
        document.createElement("div");

    messageDiv.classList.add("message");


    if (sender === "user") {

        messageDiv.classList.add(
            "user-message"
        );

    } else {

        messageDiv.classList.add(
            "bot-message"
        );
    }


    messageDiv.textContent = text;


    chatMessages.appendChild(
        messageDiv
    );


    // Scroll to latest message
    messageDiv.scrollIntoView({
        behavior: "smooth"
    });
}


// ================= QUICK QUESTIONS =================

function quickQuestion(question) {

    messageInput.value = question;

    sendMessage();
}


// ================= LOCATION =================

function getLocation() {

    const status =
        document.getElementById(
            "locationStatus"
        );


    if (!navigator.geolocation) {

        status.textContent =
            "Location is not supported by your browser.";

        return;
    }


    status.textContent =
        "Getting your location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            status.textContent =
                "Location found ✓";


            console.log(
                "Latitude:",
                latitude
            );

            console.log(
                "Longitude:",
                longitude
            );


            // Later:
            // Send these coordinates to Flask
            // and search nearby hospitals/pharmacies.
        },


        function(error) {

            status.textContent =
                "Unable to get your location.";

            console.error(error);
        }

    );
}