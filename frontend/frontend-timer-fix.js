async function fetchTimer() {
    try {
        const response = await fetch('https://dog-moon-pot-backend.herokuapp.com/pot-details.json');
        const data = await response.json();
        let remainingSeconds = data.remaining_seconds;

        function updateCountdown() {
            if (remainingSeconds <= 0) {
                document.getElementById('timer').innerText = 'Lottery ended!';
                clearInterval(countdownInterval);
                return;
            }
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const seconds = remainingSeconds % 60;
            document.getElementById('timer').innerText =
                hours + 'h ' + minutes + 'm ' + seconds + 's';
            remainingSeconds--;
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    } catch (error) {
        document.getElementById('timer').innerText = 'Error fetching timer!';
        console.error('Timer error:', error);
    }
}

fetchTimer();