from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Persistent lottery timer clearly
lottery_end = datetime.utcnow() + timedelta(hours=24)

@app.route('/timer', methods=['GET'])
def get_timer():
    remaining = int((lottery_end - datetime.utcnow()).total_seconds())
    return jsonify({"remaining_seconds": max(remaining, 0)})

@app.route('/submit_entry', methods=['POST'])
def submit_entry():
    return jsonify({"status": "received"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
