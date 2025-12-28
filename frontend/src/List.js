import React, { Component } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

class List extends Component {
  state = {
    tasks: [],
    title: "",
    editingId: null,
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    const res = await axios.get(API_URL);
    this.setState({ tasks: res.data });
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, editingId } = this.state;

    if (!title.trim()) return;

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, { title });
    } else {
      await axios.post(API_URL, { title });
    }

    this.setState({ title: "", editingId: null });
    this.fetchTasks();
  };

  editTask = (task) => {
    this.setState({ title: task.title, editingId: task.id });
  };

  deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    this.fetchTasks();
  };

  render() {
    const { tasks, title, editingId } = this.state;

    return (
      <div className="container mt-5">
        <h2>Todo List test</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Nouvelle tâche"
            value={title}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary mb-3">
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {task.title}
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => this.editTask(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => this.deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;

