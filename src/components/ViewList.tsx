import { Grid2 } from "@mui/material"
import { RackList } from "./RackList"
import { useEffect, useState } from "react";
import { useTableListener } from "tinybase/ui-react";
import Moves from "../store/Moves.model";
import { useParams } from "react-router-dom";


export const ViewList = () => {
    const [data, setData] = useState<{}[]>([]);
    const view : string = useParams().view || "";

    useTableListener("Moves",() => {
        setData(Object.values(Moves.all()))
    })

    useEffect(() => {
        setData(Object.values(Moves.all()))
    },[])

    return (
        <Grid2 size={{ xs: 12 }} container px={0.5}>
            <RackList data={data} filterConditions={{action: view}} location={true}/>
        </Grid2>
    )
}