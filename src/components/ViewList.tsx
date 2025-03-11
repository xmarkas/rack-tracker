import { Grid2 } from "@mui/material"
import { RackList } from "./RackList"
import { useEffect, useState } from "react";
import { useTableListener } from "tinybase/ui-react";
import { useParams } from "react-router-dom";
import { store } from "../store/store";


export const ViewList = () => {
    const [data, setData] = useState<{}[]>([]);
    const [action, setAction] = useState<string>("");
    const model : string = useParams().view || "";

    useTableListener(model,() => {
        setData(Object.values(store.getTable(model)))
    })

    useEffect(() => {
        if (model === "Moves") {
            setAction("Unset")
        } else if (model === "Slcs") {
            setAction("SLC")
        } else if (model === "Decoms") {
            setAction("Decom")
        }

        setData(Object.values(store.getTable(model)))
    },[])

    return (
        <Grid2 size={{ xs: 12 }} container px={0.5}>
            <RackList data={data} filterConditions={{action: action}} location={true}/>
        </Grid2>
    )
}