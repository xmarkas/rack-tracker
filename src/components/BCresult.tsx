import { Box, Grid2, Typography } from "@mui/material"
import { useParams } from "react-router-dom";


export const BCresult = () => {
    const barcode: string = useParams().barcode || "";
    // const bcType: string = useParams().bctype || "";

    return (
        <Box>
            <Grid2 container justifyContent={"center"}>
                <Grid2 size={{xs:12}} textAlign={"center"}>
                    <Typography variant="h6">Serial Number {barcode}</Typography>
                    <Typography color="red" fontWeight={700}>NOT FOUND!</Typography>
                </Grid2>
                
            </Grid2>
        </Box>
    )
}