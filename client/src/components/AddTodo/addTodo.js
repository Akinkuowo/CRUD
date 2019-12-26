import React from 'react';


const AddTodo = (props) => {
    return (
        <div>
            <input type="text" name="todos" className="form-control my-4" placeholder="add a new todo" value={props.newTodos} onChange={props.handleOnChange} />
            <button className="btn-danger form-control my-4" onClick={props.update ? props.handleUpdateTodo : this.handleOnClick}>
                {props.update ? "Update Todo" : "Add Todo"}
             </button>

        </div>
    );
}

export default AddTodo;