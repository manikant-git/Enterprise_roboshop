const button = document.getElementById("healthBtn");

const result = document.getElementById("result");

button.addEventListener("click", async () => {

    try {

        const response = await fetch("/health");

        if (!response.ok) {

            throw new Error("Health Check Failed");

        }

        const data = await response.text();

        result.innerHTML = data;

    } catch (error) {

        result.innerHTML = error.message;

    }

});
