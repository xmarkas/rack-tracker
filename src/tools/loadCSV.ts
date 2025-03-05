import Decoms from "../store/Decoms.model";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import { createJsonForMove, createJsonForSLC } from "./createJSON";

const getByNewLine = (fileData: string, index: number): string[] => {
  let result: string[] = fileData.split(/\r?\n/); // seperate by newline
  result = result.slice(index);
  return result;
};

const parser = (s: string): string[] => {
  const result: string[] = [];
  let temp: string = "";
  let flag: boolean = false; // for use between double quotes
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

  return result.slice(0, 14); // trim to first 14 entries
};

export const LoadCSV = async () => {
  try {
    const response = await fetch("/march3_data.csv");
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result?.value);

    // Create an array seperated by newline (/n)
    const byLine: string[] = getByNewLine(csv, 11);
    // Parse by ',' into array
    byLine.forEach((entry) => {
      const parsedLine: string[] = parser(entry);
      // Create JSON for each entry
      if (parsedLine[1] === "Decom and Set") {
        // Move entry into store
        const moveEntryID: string | undefined = Moves.add(
          createJsonForMove(parsedLine)
        )?.id;
        if (moveEntryID) {
          // SLC entry into store
          const SlcEntryID: string | undefined = Slcs.add(
            createJsonForSLC(parsedLine, moveEntryID)
          )?.id;
          if (SlcEntryID) {
            Moves.update(moveEntryID, { destinationID: SlcEntryID });
          }
        }
      } else if (parsedLine[1] === "Decom Only") {
        // Decom entry into store
        Decoms.add(createJsonForMove(parsedLine));
      } else if (parsedLine[1] === "Set Only") {
        // SLC only entry into store
        Slcs.add(createJsonForSLC(parsedLine, ""));
      }
    });

    // setFileContent(["test", "array"]);
  } catch (error: any) {
    console.error("Error fetching CSV:", error.message);
  }
};
