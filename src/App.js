import React from 'react';
import './app.css';

import axios from 'axios';

import loadingg from './loadingg.gif';

import ListItem from './components/ListItem/ListItem.js'



class App extends React.Component {
	constructor(){
		super()
		this.state = {

			newTodos: '',

			update: false,

			editingIndex: null,

			notification: null,

			todos: [],

			loading: true
		}

		this.apiUrl = 'https:
//5e053efa2f5dff0014f7da10.mockapi.io';
		
		this.handleUpdateTodo = this.handleUpdateTodo.bind(this)	

		this.handleOnClick = this.handleOnClick.bind(this)	

	};

	async componentDidMount(){
		const response = await axios.get(`${this.apiUrl}/todos`);
 

		this.setState({
			 todos: response.data,
			 loading: false
		});
	}
	

	handleOnChange = (event)=>{
		this.setState({
			newTodos: event.target.value
		})
	}

	async handleOnClick() {
	
		const response = await axios.post(`${this.apiUrl}/todos`, {
			name: this.state.newTodos,
		}); 

		const oldTodos = this.state.todos;

		oldTodos.push(response.data);

		this.setState({
			todos: oldTodos,
			newTodos: ''
		})
		this.handleAlert('Todo Created Successfully!')
	}

	handleEditTodo (index){
		const todos = this.state.todos[index];

		this.setState({
			update: true,
			newTodos: todos.name,
			editingIndex: index
		})
		 
	}

	async handleUpdateTodo () {
		
		const todo = this.state.todos[this.state.editingIndex];


		const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
			name: this.state.newTodos
		})	


		const todos = this.state.todos;

		todos[this.state.editingIndex] = response.data;

		this.setState({ 
			todos, 
			editingIndex: null, 
			update: false, 
			newTodos: ''  
		})

		this.handleAlert('Todo Updated Successfully!')
	}

	async handleDeleteTodo(index) {
		const todos = this.state.todos

		const todo = todos[index]; 

		await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

		delete todos[index];

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

					{
						this.state.loading &&
						<img src={loadingg} className="center" alt="Loading Image" />
					}

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
