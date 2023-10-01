import React from "react";
import {useState} from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import axios from 'axios';

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient()



export default function SignInOrSignUp() {

    const [isSigned, setIsSignedStatus] = useState(true);

    return(

       <QueryClientProvider client={queryClient}>
    
       {!isSigned ? <SignIn /> : <SignUp />}  

      <div>
        <button onClick={() => setIsSignedStatus(!isSigned)}>Switch to {isSigned ? "Sign Up" : "Sign In"}</button>
       </div>  
   
   </QueryClientProvider>
    )
   
}

