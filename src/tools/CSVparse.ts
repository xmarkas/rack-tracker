// SAMPLE DATA
// const dataA: string = "Team #,Set or Decom ,Type of Move,Rack SN,From Data Center,Rack Source Location,V ,To Data Center,Rack Final Destination,QR Code for Destination,Un-set / Un-Level / Recontain Complete (DECOM),In Position (Rack Delivered to Final Position (IBOS),SLC (SET),L2+ Audit Complete (IBOS),Notes,Issue Tracker,,Time Stamp,,,,,,,,,,,";

// const dataB: string = `Milestone,Decom and Set,Rack Move,50331546,ATN6,ATN6.6C.19B.28,,ATN7,ATN7.7A.11.01,,TRUE,TRUE,TRUE,TRUE,"Decom, IBOS Move, Set",Still plugged in,Just need to un-set so we can move at later date,,,,,,,,,,,,
// Milestone,Decom and Set,Rack Move,50132489,ATN2,ATN2.2A.16B.16,,ATN5,ATN5.5D.11B.08,,TRUE,TRUE,TRUE,TRUE,"Decom, IBOS Move, Set",,NEED TO AUDIT ONLY,,,,,,,,,,,,
// Milestone,Decom and Set,Rack Move,50122211,atn3,atn3.3c.13b.19,,ATN5,ATN5.5D.05F.10,,TRUE,TRUE,TRUE,TRUE,"Decom, IBOS Move, Set",,Moved on 2/14,,,,,,,,,,,,`;

// const t = `Commonwealth,Decom and Set,Rack Move,50387944,ATN6,ATN6.6C.28B.03,,ATN7,ATN7.7A.56.05,,TRUE,TRUE,TRUE,TRUE,"Decom, IBOS Move, Set",,RACK MOVES FOR 2/14,,,,,,,,,,,,`;

// Main functions
import { readFile } from "fs/promises";


const parser = (s: string): string[] => {
  const result: string[] = [];
  let temp: string = "";
  let flag: boolean = false;
  for (let i = 0; i < s.length; i++) {
    const current: string = s[i];
    if (current === ",") {
      if (flag) {
        temp = temp + current;
      } else {
        result.push(temp);
        temp = "";
      }
    } else {
      if (current === '"') {
        flag = !flag;
      } else {
        temp = temp + current;
      }
    }
  }

  return result;
};

const getDataFromFile = (filePath: string): Promise<string[]> => {
  const vals = (str: string): string[] => {
    return str.split(/\r?\n/);
  };

  return readFile(filePath, "utf-8").then((data) => {
    return vals(data);
  });
};


  console.log(
    "main --->  ",
    getDataFromFile("trackerData.csv").then((a) => {
      console.log(a);
    })
  );

