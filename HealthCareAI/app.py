from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()

    message = data.get("message", "").lower().strip()

    if not message:
        return jsonify({
            "reply": "Please enter a question."
        })

    # Demo chatbot responses
    # Later, connect this to your AI model/API.

    if "hospital" in message:
        reply = (
            "Sure! I can help you find hospitals based on "
            "location, facilities, treatment, fees and quality level."
        )

    elif "pharmacy" in message:
        reply = (
            "I can help you find nearby pharmacies and show "
            "their location, distance and available information."
        )

    elif "icu" in message:
        reply = (
            "I can search hospitals that provide ICU facilities. "
            "Please provide your location or allow location access."
        )

    elif "compare" in message:
        reply = (
            "I can compare hospitals based on facilities, "
            "fees, distance, ratings and available services."
        )

    elif "emergency" in message:
        reply = (
            "For an emergency, please contact your local emergency "
            "service or go to the nearest appropriate emergency facility."
        )

    elif "hello" in message or "hi" in message:
        reply = (
            "Hello! 👋 I am your Healthcare Assistant. "
            "How can I help you find a hospital or pharmacy?"
        )

    else:
        reply = (
            "I can help you find and compare hospitals and pharmacies. "
            "Try asking: 'Find hospitals near me' or "
            "'Find a hospital with ICU.'"
        )

    return jsonify({
        "reply": reply
    })


if __name__ == "__main__":
    app.run(debug=True)