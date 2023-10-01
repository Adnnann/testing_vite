import { Button } from "@mui/material"

export default function SubmitTodo({handleClick}){
    return(
       
            <Button variant="contained" onClick={handleClick} style={{cursor:'pointer'}}>Submit</Button>
        
    )
}

