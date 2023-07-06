import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Box } from "@chakra-ui/react"

export default function Root(){
    return(
        <Box>
            <Header />
            <Outlet />
        </Box>
    )
}