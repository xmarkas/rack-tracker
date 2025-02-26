import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createJsonForMove, createJsonForSLC } from "../tools/createJSON";
import Decoms from '../store/Decoms.model';
import Moves from '../store/Moves.model';
import Slcs from '../store/Slcs.model';


export const FileUploader = forwardRef((props, ref) => {
  // const [fileContent, setFileContent] = useState<string[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // Create an array seperated by newline (/n)
        const byLine: string[] = getByNewLine(content, 11);
        // Parse by ',' into array
        byLine.forEach((entry) => {
          const parsedLine: string[] = parser(entry);
          // Create JSON for each entry
          if (parsedLine[1] === "Decom and Set") {
            // Move entry into store
            const moveEntryID: string | undefined = Moves.add(createJsonForMove(parsedLine))?.id;
            if (moveEntryID) {
              // SLC entry into store
              const SlcEntryID: string | undefined = Slcs.add(createJsonForSLC(parsedLine, moveEntryID))?.id;
              if (SlcEntryID) {
                Moves.update(moveEntryID, {destinationID: SlcEntryID});
              }
            }
          } else if (parsedLine[1] === "Decom Only") {
              // Decom entry into store
              Decoms.add(createJsonForMove(parsedLine));
          } else if (parsedLine[1] === "Set Only") {
             // SLC only entry into store
             Slcs.add(createJsonForSLC(parsedLine, ""))
          } 
        });

        // setFileContent(["test", "array"]);
      };
      reader.readAsText(file);
      
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useImperativeHandle(ref, () => {
    return {handleUploadClick};
  })

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

  return (
    <div>
      {/* <button onClick={handleButtonClick}>Select File</button> */}
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInputRef}
        accept=".csv"
      />
      {/* {fileContent && (
        <div style={{ marginTop: "20px" }}>
          <h2>File Content:</h2>
          <pre>{fileContent}</pre>
        </div>
      )} */}
    </div>
  );
});
