from random import randint
from flask import Flask
from flask.templating import render_template

app = Flask(__name__)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route('/computer_choice')
def choose():
    # In the future it might be more complex
    choice = str(randint(0, 4))
    return app.response_class(choice)

if __name__ == '__main__':
    print ('Running Server')
    app.run(host='0.0.0.0', port=1234)
