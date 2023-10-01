export default function SubmitTodo({handleClick}){
    return(
        <div>
            <button onClick={handleClick} style={{cursor:'pointer'}}>Submit</button>
        </div>
    )
}

