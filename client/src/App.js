import React from 'react';
import './app.css';

import 'bulma/css/bulma.css'


import ListItem from './components/ListItem/ListItem.js'



class App extends React.Component {
	constructor(){
		super()
		this.state = {

			newTodos: '',
			update: false,
			editingIndex: null,
			notification: null,
			todos: []
		}

		
	};

	async componentDidMount(){
		fetch('http://localhost:3100/todos')
		.then(Response => Response.json())
		.then(console.log)
		// // this.setState({
		// // 	todos: Response.data
		// // })
	}
	

	handleOnChange = (event)=>{
		this.setState({
			newTodos: event.target.value
		})
	}

	generateTodoId = () => {
		const todoId = this.state.todos[this.state.todos.length - 1];

		if (todoId) {
			return todoId + 1;
		}else{
			return 1;
		}

	}

	handleOnClick = () => {
		const newTodos = {
			name: this.state.newTodos,
			id: this.generateTodoId()
		}

		const oldTodos = this.state.todos;

		oldTodos.push(newTodos);

		this.setState({
			todos: oldTodos,
			newTodos: ''
		})
		this.handleAlert('Todo Created Successfully!')
	}

	handleEditTodo = (index) =>{
		const todos = this.state.todos[index];

		this.setState({
			update: true,
			newTodos: todos.name,
			editingIndex: index
		})
		console.log(this.state.editingIndex)
	}

	handleUpdateTodo = () => {
		const todo = this.state.todos[this.state.editingIndex];

		todo.name = this.state.newTodos;

		const todos = this.state.todos;

		todos[this.state.editingIndex] = todo;

		this.setState({ 
			todos, 
			editingIndex: null, 
			update: false, 
			newTodos: ''  
		})

		this.handleAlert('Todo Updated Successfully!')
	}

	handleDeleteTodo = (index)=> {
		const todos = this.state.todos
		delete todos[index]

		this.setState({ todos })
		this.handleAlert('Todo Deleted Successfully!')
	}

	handleAlert = (notification) => {
		this.setState({
			notification
		})

		setTimeout(()=> {
			this.setState({
				notification: null
			})
		}, 1500)
	}



	render(){
		console.log(this.state.newTodos)
		return (
			<div className="App">
				
				<div className="container">
					{
						this.state.notification &&
						<div className="alert mt-3 alert-success">
							<p className="text-center">{this.state.notification}</p>
						</div>
					}
   
				   <h2 className="text-center p4">Todos App </h2>
				   <input type="text" name="todos" className="form-control my-4" placeholder="add a new todo" value={this.state.newTodos} onChange={this.handleOnChange} />
				   <button className="btn-danger form-control my-4" 
					disabled={this.state.newTodos.length < 5}  
				   onClick={this.state.update ? this.handleUpdateTodo : this.handleOnClick}>
				   		{this.state.update ? "Update Todo" : "Add Todo"}
					</button>

					{!this.state.update && 
					<ul className="list-group">	
						{this.state.todos.map((items, index)=>{
								return (
									<ListItem
									key={items.id} 
									items={items}
									handleEditTodo={() => {this.handleEditTodo(index)} }
									handleDeleteTodo={() => {this.handleDeleteTodo(index)} }
								/>
								);
							})
						}
					</ul>
					}

				
				</div>
		   </div>	
		   
		   );
	}
		

}


export default App;