from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'mongotask'
app.config['MONGO_URI'] = 'mongodb://mongodb:27017/mongotask'

mongo = PyMongo(app)
CORS(app)

# ---------------- GET ALL ----------------
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = mongo.db.tasks
    result = []

    for task in tasks.find():
        result.append({
            'id': str(task['_id']),
            'title': task['title']
        })

    return jsonify(result)


# ---------------- CREATE ----------------
@app.route('/api/tasks', methods=['POST'])
def add_task():
    title = request.json.get('title', '').strip()
    if not title:
        return jsonify({'error': 'Title required'}), 400

    task_id = mongo.db.tasks.insert_one({'title': title}).inserted_id
    return jsonify({'id': str(task_id), 'title': title})


# ---------------- UPDATE ----------------
@app.route('/api/tasks/<id>', methods=['PUT'])
def update_task(id):
    title = request.json.get('title', '').strip()

    mongo.db.tasks.update_one(
        {'_id': ObjectId(id)},
        {'$set': {'title': title}}
    )

    return jsonify({'id': id, 'title': title})


# ---------------- DELETE ----------------
@app.route('/api/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    mongo.db.tasks.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Task deleted'})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

