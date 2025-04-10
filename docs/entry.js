document.getElementById('entryForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;

    const response = await fetch('http://localhost:5000/submit_entry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email})
    });

    if (response.ok) alert('Entry submitted successfully!');
    else alert('Submission failed.');
};
