import Grid from "@mui/material/Grid"
import NavBar from "./components/NavBar.jsx"
import SignInOrSignUp from "./components/user/SignInOrSignUp.jsx"
import ToDos from "./components/Todos";
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()


function App() {


  return (
    <Grid container justifyContent={"center"}>
     <NavBar /> 
      <QueryClientProvider client={queryClient}>
      <ToDos />
      </QueryClientProvider>
      {/* <SignInOrSignUp /> */}
  </Grid>
  
  )
}

export default App
