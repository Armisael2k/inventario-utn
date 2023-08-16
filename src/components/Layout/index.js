import { Box, Container, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";

export default function Layout({ children, account, ...props }) {
  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        marginBottom: 5,
      }}      
    >
      <Navbar account={account}/>  
      <Container {...props}>
        {children} 
      </Container>
    </Box>
  )
}