from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, origins='*')



@app.route("/api/app", methods=['GET'])
def users():
    return "Hello from Flask"

if __name__ == "__main__":
    app.run(debug=True, port=5000)