async function startTimer() {
    const timerEl = document.getElementById('timer');
    const res = await fetch('http://localhost:5000/timer');
    const data = await res.json();
    let remainingSeconds = data.remaining_seconds;

    const countdown = setInterval(() => {
        if (remainingSeconds <= 0) {
            timerEl.innerHTML = "Lottery ended!";
            clearInterval(countdown);
            return;
        }

        const hours = Math.floor(remainingSeconds / 3600);
        const mins = Math.floor((remainingSeconds % 3600) / 60);
        const secs = remainingSeconds % 60;
        timerEl.innerHTML = `${hours}h ${mins}m ${secs}s`;
        remainingSeconds--;
    }, 1000);
}

startTimer();
