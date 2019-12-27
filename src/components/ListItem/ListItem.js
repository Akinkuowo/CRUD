import React from 'react';

const ListItem = (props) =>{
    return(
   
    
                        <li  className="list-group-item text-center">
                        <button onClick={props.handleEditTodo } className="btn-sm btn btn-info float-left">Update</button>
                        
                        {props.items.name}
                            
                        <button onClick={props.handleDeleteTodo } className="btn-sm btn btn-danger float-right">X</button>
                        </li>
         
    );
}


export default ListItem;