import { Grid2 } from "@mui/material"
import { RackList } from "./RackList"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slcs from "../store/Slcs.model";
import { Row } from "tinybase";
import Moves from "../store/Moves.model";
import Decoms from "../store/Decoms.model";


export const ViewList = () => {
    const [data, setData] = useState<{}[]>([]);
    const [action, setAction] = useState<string>("");
    const model : string = useParams().view || "";

    useEffect(() => {
        if (model === "Moves") {
            setAction("Unset")
            setData(Object.entries(Moves.all()).map((row: [string, Row]) => {return {...row[1], Id: row[0]}}))
        } else if (model === "Slcs") {
            setAction("SLC")
            setData(Object.entries(Slcs.all()).map((row: [string, Row]) => {return {...row[1], Id: row[0]}}))
        } else if (model === "Decoms") {
            setAction("Decom")
            setData(Object.entries(Decoms.all()).map((row: [string, Row]) => {return {...row[1], Id: row[0]}}))
        }
        
    },[])

    return (
        <Grid2 size={{ xs: 12 }} container px={0.5}>
            <RackList data={data} filterConditions={{action: action}} location={true}/>
        </Grid2>
    )
}