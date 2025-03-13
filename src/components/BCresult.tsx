import { Box, Grid2 } from "@mui/material"
import { useParams } from "react-router-dom";


export const BCresult = () => {
    const barcode: string = useParams().barcode || "";
    const bcType: string = useParams().bctype || "";

    return (
        <Box>
            <Grid2 container justifyContent={"center"}>
                <Grid2 size={{xs:12}}>
                    Barcode: {barcode}
                </Grid2>
                <Grid2 size={{xs:12}}>
                    Type: {bcType}
                </Grid2>
            </Grid2>
        </Box>
    )
}