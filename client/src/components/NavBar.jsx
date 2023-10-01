import {AppBar, Typography}from '@mui/material';

export default function NavBar() {
  return (

      <AppBar position="sticky" sx={{textAlign:'center'}}>
       
          <Typography variant="h3" component="div" style={{textAlign:'center'}}>
            ToDo List
          </Typography>
    
      </AppBar>
  
  );
}