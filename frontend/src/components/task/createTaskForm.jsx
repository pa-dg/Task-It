import React from 'react'

class CreateTaskForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      description: '',
      status: 'Incomplete'
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(field) {
      return (e) => this.setState({[field]: e.currentTarget.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createTask(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" 
              placeholder="Describe your task"
              value={this.state.description}
              onChange={this.handleUpdate('description')}
            />
          </label>
          <input type="submit" text="Submit"/>
        </form>
      </div>
    )
  }

}

export default CreateTaskForm;