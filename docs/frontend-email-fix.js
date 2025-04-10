
document.getElementById('subscribeBtn').onclick = function() {
  const email = document.getElementById('email').value;
  fetch('https://dog-moon-pot-backend-2c3ced3d21d3.herokuapp.com/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert('Subscription failed: ' + err));
};

document.getElementById('subscribeBtn').onclick = function() {
  const email = document.getElementById('email').value;
  fetch('https://dog-moon-pot-backend-2c3ced3d21d3.herokuapp.com/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert('Subscription failed: ' + err));
};
