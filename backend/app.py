
@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.json.get('email')
    if email:
        with open('emails.txt', 'a') as f:
            f.write(email + '\n')
        return jsonify({'message': 'Subscribed successfully!'})
    else:
        return jsonify({'message': 'Email is missing!'}), 400


@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.json.get('email')
    if email:
        with open('emails.txt', 'a') as f:
            f.write(email + '\n')
        return jsonify({'message': 'Subscribed successfully!'})
    else:
        return jsonify({'message': 'Email is missing!'}), 400

