
import SubmitTodo from "./Button"
import { useState, useEffect } from "react"
import '../assets/todo.css'
import axios from "axios"
import {useQuery, useMutation, useQueryClient} from 'react-query'
import { responsiveFontSizes } from "@mui/material";


// queryClient.invalidateQueries('todos')
export default function ToDo(){
  

    const [todo, setTodo] = useState("")
    //const [newTodo, setNewTodo] = useState("")
   // const [done, setDone] = useState([])
    const [editThisTodo, setEditThisTodo] = useState([])

    // queryClient.invalidateQueries({queryKey:['todos']})
    const queryClient = new useQueryClient()
    const {data, isLoading, error} = useQuery({
        queryKey:['todos'], 
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/api/todos")
            .then(res => res.data)
            .catch(err => err)
            return response
        }
    
    })

    const addTodo = useMutation({
        mutationFn: async (todo) => {
         await axios.post("http://localhost:5000/api/todos", todo)
         .then(res => res.data)
         .catch(err => err)
        },
        onSuccess: () => {
            console.log("success from addTodo")
            queryClient.invalidateQueries({queryKey:['todos']})
        },
    })

    const deleteTodo = useMutation({
        mutationFn: async (id) => {
         await axios.delete(`http://localhost:5000/api/todos/${id}`)
         .then(res => res.data)
         .catch(err => err)
        },
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('todos')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    console.log(data)

    useEffect(() => {

    

        // if(localStorage.getItem("todo") === null && localStorage.getItem("done") === null && done.length){
        //     localStorage.setItem("todo", JSON.stringify(todo))
        //     localStorage.setItem("done", JSON.stringify(done))
        // }

        // if(todo.length > 0 || done.length > 0){
        //     localStorage.setItem("todo", JSON.stringify(todo))
        //     localStorage.setItem("done", JSON.stringify(done))
        // }else{
        //     localStorage.setItem("todo", JSON.stringify([]))
        //     localStorage.setItem("done", JSON.stringify([]))

        // }

        // const data = localStorage.getItem("todo")
        // const doneData = localStorage.getItem("done")
     
        // if (todo.length === 0 || done.length === 0) {
        //     setTodo(JSON.parse(data))
        //     setDone(JSON.parse(doneData))
        // }
    }, [])



    const submitTodo = (todo) => {
        console.log(todo)
            addTodo.mutate({todo:todo, done:false, editThisTodo:false})
            setTodo("")

        // setTodo([...todo, newTodo])
        // setNewTodo("")
        // setDone([...done, false])   
        // setEditThisTodo([...editThisTodo, false])
    }
    
    const handleChange = (e) => {
        setTodo(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())
    }


    const handleDone = (index) => {
        // const newDone = done
        // newDone[index] = !done[index]
        // setDone([...newDone])
       
    }

    const removeTodo = (id) => {
        deleteTodo.mutate(id)
        // setTodo([...todo.filter((item, i)=>i !== index)])
        // setDone([...done.filter((item, i) => i !== index)])
    }

    const editTodo = (event, title, i) => {
        // const newEditThisTodo = Array(editThisTodo.length).fill(false)
        // newEditThisTodo[i] = !editThisTodo[i]
        // setEditThisTodo([...newEditThisTodo])
    }

    const handleEditChange = (index) => {
    //  const allTodos = todo
    //  allTodos[index] = event.target.value
    // setTodo([...allTodos])
    }

    const saveEditedTodo = (event, title, index) => {
        // setEditThisTodo([...todo])
        // setEditThisTodo([...Array(editThisTodo.length).fill(false)])
    }


    return(
        <div>
        <div style={{marginBottom:'20px'}}>
            <h1>ToDo</h1>
            <p>Click on to-do to change status</p>
            {/* <p>{`You currently have ${todo.length} tasks and you have finished ${done.filter(item => item == 1).length}`}</p> */}
            <input type="text" placeholder="Add a new todo" onChange={(e)=>handleChange(e)} value={todo} style={{marginBottom:"10px"}}/> 
            <SubmitTodo handleClick={() => submitTodo(todo)}/>
    
        </div>
        <div>
        {  isLoading && <h1>Loading...</h1> }
        {  error && <h1>Error</h1> }
            {

              data && data.map((item, index) => {
                    return(
                        <div key={index} style={{width:'500px', borderColor:'black', borderStyle:'solid', marginBottom:'10px', paddingLeft:'10px'}}>
                        <h3 onClick={()=>handleDone(index)} className={item.done ? 'done' : 'notDone'}   style={{display:editThisTodo[index] ? "none" : "block" }}>{item.todo}</h3>
                            <input type="text" value={item} 
                            style={{display:editThisTodo[index] ? "block" : "none" }} onChange={()=>handleEditChange(index)}/>
                       
                       {
                            !editThisTodo[index] ? 
                            (<><p style={{color:"green", display:"inline-flex", cursor:"pointer"}} onClick={(event)=>editTodo(event, item, index)}>Edit</p> 
                             <p style={{color:"red", display:"inline-flex", marginLeft:'20px', cursor:"pointer"}} onClick={() => removeTodo(item._id)}>Delete</p></>)
                             : 
                             <p style={{color:"green", display:"inline-flex"}} onClick={(event)=>saveEditedTodo(event, item, index)}>Save</p>
                       

                       }
                            
                        </div>
                    )
                }) 
            }
        </div>
        </div>
    )
}