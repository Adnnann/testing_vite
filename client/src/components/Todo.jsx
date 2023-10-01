

import { useState, useEffect } from "react"
import '../assets/todo.css'
import axios from "axios"
import {useQuery, useMutation, useQueryClient} from 'react-query'
import { Card, Input, Button, Typography, Grid } from "@mui/material"
import SubmitTodo from "./Button"



// queryClient.invalidateQueries('todos')
export default function ToDo(){
  
    const [todo, setTodo] = useState("")
    const [todoToEdit, setTodoToEdit] = useState([])
 

    const queryClient = new useQueryClient()
    const {data, isLoading, error} = useQuery({
        queryKey:['todos'], 
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/api/todos")
            .then(res => res.data)
            .catch(err => err)
            return response
        },
        onError: (error => error),
        staleTime: 1000
    
    })

    const addTodo = useMutation({
        mutationFn: async (todo) => { 
         await axios.post("http://localhost:5000/api/todos", todo)
         .then(res => res.data)
         .catch(err => err)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['todos']})
        },
        onError: (error => error)
    })

    const deleteTodo = useMutation({
        mutationFn: async (id) => {
         await axios.delete(`http://localhost:5000/api/todos/${id}`)
         .then(res => res.data)
         .catch(err => err)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onError: (error => error)  
    })

    const updateTodo = useMutation({
        mutationFn: async (todo) => {
         await axios.patch(`http://localhost:5000/api/todos/${todo.id}`, todo, 
         {headers: {'Content-Type': 'application/json'}})
         .then(res => res.data)
         .catch(err => err)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onError: (error) => error
        
    })

 
    const submitTodo = (todo) => {
        addTodo.mutate({todo:todo, done:false, editThisTodo:false})
        setTodo("")
    }

    const handeKeyDown = (e) => {
        if(e.keyCode === 13){
            addTodo.mutate({todo:todo, done:false, editThisTodo:false})
            setTodo("")
        }
    }
    
    const handleChange = (e) => {
        setTodo(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())
    }


    const handleDone = (item) => {

        const todo = {
            id: item._id,
            done: !item.done,
            editTodo: false,
        }

        updateTodo.mutate(todo)
  
    }

    const removeTodo = (id) => {
        deleteTodo.mutate(id)
    }

    const editTodo = (item, index) => {
        const todo = {
            id: item._id,
            done: false,
            editTodo: true,
            todo:item.todo
        }


        updateTodo.mutate(todo)

        const allTodos = todoToEdit
        allTodos[index] = item.todo
        
        setTodoToEdit([...allTodos])
    }



    const cancelEditingTodo = (item) => {

        const todo = {
            id: item._id,
            done: false,
            editTodo: false,
        }

        updateTodo.mutate(todo)
    }

    const handleEditChange = (e, index) => {
        
        const todos = [...todoToEdit]
        todos[index] = e.target.value
    
        setTodoToEdit([...todos])

    }

   
    const saveEditedTodo = (item, index) => {

        const todo = {
            id: item._id,
            todo: todoToEdit[index],
            done: false,
            editTodo: false,
        }

        updateTodo.mutate(todo)
    }

    const handleEditKeyDown = (e,item, index) => {
        const todo = {
            id: item._id,
            todo: todoToEdit[index],
            done: false,
            editTodo: false,
        }

        if(e.keyCode === 13){
            updateTodo.mutate(todo)
        }
    }


    return(
        <Grid item xs={11} md={6} lg={6} xl={4}>
         {  error && <h1>Error</h1> }
        {  isLoading && <h1>Loading...</h1> }
        <div style={{marginBottom:'20px'}}>
          
            <Typography variant="h5" sx={{marginTop:"10%"}}>Click on to-do to change status</Typography>
            <Typography variant="subtitle">{`You currently have ${data ? data.length : '0'} tasks and you have finished ${data ? data.filter(item => item.done == 1).length: '0'}`}</Typography>
   
            <Input type="text" placeholder="Add a new todo" 
            onChange={(e)=>handleChange(e)} 
            value={todo} style={{marginBottom:"10px"}} 
            onKeyDown={(e) => handeKeyDown(e)} 
            sx={{display:'block', marginTop:'10%',width:{xs:'280px', md:'500px', lg:'600px', xl:'600px'}}}/>
            <SubmitTodo handleClick={() => submitTodo(todo)}/>
    
        </div>
        <div>
       
        
            {

              data && !data?.message ? data.map((item, index) => {
                    return(
                        <Card key={index} style={{ marginBottom:'10px', paddingLeft:'10px'}} sx={{width:{xs:'280px', md:'500px', lg:'600px', xl:'600px'}}}>
                        <h3 onClick={()=>handleDone(item)} className={item.done ? 'done' : 'notDone'}   style={{display:item.editTodo ? "none" : "block" }}>{item.todo}</h3>
                        <Input type="text" 
                        value={todoToEdit[index]} 
                        style={{display:item.editTodo ? "block" : "none" }} 
                        onChange={(e)=>handleEditChange(e, index)} 
                        onKeyDown={(e)=>handleEditKeyDown(e, item, index)}
                        sx={{width:{xs:'260px', md:'4800px', lg:'580px', xl:'580px'}}}
                        />
                       
                       {
                            !item.editTodo ? 
                            (<>
                                 <Button style={{cursor:"pointer"}} color="primary" onClick={()=>editTodo(item, index)}>Edit</Button>
                                 <Button style={{cursor:"pointer"}} color="error" onClick={() => removeTodo(item._id)}>Delete</Button>
                             </>)
                             : 
                             (<><Button style={{cursor:"pointer"}} color="primary" onClick={()=>cancelEditingTodo(item)}>Cancel</Button>
                             <Button style={{cursor:"pointer"}} color="error" onClick={()=>saveEditedTodo( item, index)} >Save</Button></>)
                       

                       }
                            
                        </Card>
                    )
                }) 
           : null }
        </div>
        </Grid>
    )
}