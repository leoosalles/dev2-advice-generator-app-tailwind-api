const appBtn = document.getElementById('advice-btn');
const adviceId = document.getElementById('id-advice');
const adviceText = document.getElementById('advice');

async function getAdvice() {
    try {
        const url = "https://api.adviceslip.com/advice";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("An error occurred while trying to fetch the information from the API")
        }

        const obj = await response.json();

        return {
            id: obj.slip.id,
            advice: obj.slip.advice
        };
    } catch (error) {
        console.error("An error occurred while trying to fetch the information from the API:", error);
    };
};

async function renderAdvice() {
    try {
        adviceId.innerHTML = '...';
        adviceText.innerHTML = 'Loading advice...';

        const data = await getAdvice();
        adviceId.innerHTML = `Advice #${data.id}`;
        adviceText.innerHTML = `"${data.advice}"`;
    } catch (err) {
        adviceId.innerHTML = '!';
        adviceText.innerHTML = 'Error. Try again.';
        console.error("Error fetching advice:", err);
    }
}

appBtn.addEventListener('click', renderAdvice);