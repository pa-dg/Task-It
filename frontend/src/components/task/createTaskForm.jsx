import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createTask } from "../../actions/taskActions";
import { closeModal } from "../../actions/modalActions";
import { clearReceiveErrors } from "../../actions/taskActions";

const CreateTaskForm = (props) => {
  const [state, setState] = useState({
    description: "",
    status: "Incomplete",
    projectId: props.projectId,
    assignedUser: [],
  });

  useEffect(() => {
    return () => {
      props.clearReceiveErrors();
    };
  }, []);

  const handleUpdate = (field) => {
    return (e) => setState({ ...state, [field]: e.currentTarget.value });
  };

  const [error, setError] = useState({
    empty: false,
    length: false
  });

  const handleError = () => {
    if (state.description.length === 0) {
      setError({empty: true});
      return true;
    } 
    else if (state.description.length > 120) {
      setError({length: true});
      return true;
    }
    else {
      setError(false);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let taskError = handleError();

    if (!taskError) {
      props.createTask(state);
      props.closeModal();
    }
  };

  return (
    <div className="task-form-container">
      <h1>Add Task</h1>
      <form className="form-content" onSubmit={handleSubmit}>
        <label className="form-label">
          Task:
          <input
            type="text"
            placeholder="Describe your task"
            value={state.description}
            onChange={handleUpdate("description")}
          />
          {error.empty ? (
            <p className="task-error">Task description cannot be empty!</p>
          ) : null}
          {error.length ? (
            <p className="task-error">Task description cannot be longer than 120 characters!</p>
          ) : null}
        </label>

        <div className="button-container">
          <button type="submit">Submit</button>
          <button onClick={props.closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.task,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createTask: (task) => dispatch(createTask(task)),
  closeModal: () => dispatch(closeModal()),
  clearReceiveErrors: () => dispatch(clearReceiveErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
