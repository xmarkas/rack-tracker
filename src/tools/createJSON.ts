import { UnsetMove, SLC } from "../store/interfaces";
import {
  Teams,
  Action,
  MoveType,
  Building,
  Hall,
  HallSide,
} from "../store/enums";

/**
 *
 * @param o  Location object
 * @param way the direction of the move 'to' or 'from'
 * @returns Location object key: values with {'from': complete location}
 */
const buildLocationID = (o: { [key: string]: any }): {} => {
  o.location = `${o.building}.${o.building.slice(3)}${o.hall}.${o.row}${
    o.side
  }.${o.position}`;
  return o;
};

/**
 *
 * @param local string of Location to be parsed
 * @param way the direction of the move 'to' or 'from'
 * @returns Location object
 */
const locationParse = (local: string): { [key: string]: any } => {
  const returnObj: { [key: string]: any } = {};
  const localArr: string[] = local.toUpperCase().split(".");
  // location keys
  returnObj.building = localArr[0];

  if (returnObj.building === "ATN7") {
    returnObj.hall = "A";
    returnObj.row = localArr[2];
    returnObj.side = "";
    returnObj.position = localArr[3];
  } else {
    returnObj.hall = localArr[1]?.slice(localArr[1].length - 1);
    returnObj.row = localArr[2]?.slice(0, localArr[2].length - 1);
    returnObj.side = localArr[2]?.slice(localArr[2].length - 1);
    returnObj.position = localArr[3];
  }

  return buildLocationID(returnObj);
};

/**
 * createJsonForMove
 *
 * @param arr string[]
 * @returns object of Type UnsetMove
 */
export const createJsonForMove = (arr: string[]): UnsetMove | null => {
  const obj: UnsetMove = {
    team: Teams.Commonwealth,
    action: arr[1] === "Decom Only" ? Action.DECOM : Action.UNSET,
    moveType: MoveType.MOVE,
    serialNumber: "",
    location: "",
    building: Building.ATN1,
    hall: Hall.A,
    row: "",
    side: HallSide.Front,
    position: "",
    destinationID: "",
    // qrCode: "",
    unset: false,
    auditComplete: false,
    // actionNotes: 0,
    notes: "",
    hasIssue: false,
    hasPriority: false,
    Id: "",
  };

  // Map Values
  const indexMapMove: number[] = [0, 2, 3, 5, 10, 13];

  // Check for Mapable values
  for (let i = 0; i < indexMapMove.length; i++) {
    if (arr[indexMapMove[i]] === "") return null;
  }

  const objKeys: string[] = Object.keys(obj);

  indexMapMove.forEach(function (val) {
    if (val < 4) {
      obj[objKeys[val]] = arr[val];
    } else if (val === 5) {
      let fromObj = locationParse(arr[val]);
      Object.keys(fromObj).forEach((key) => {
        obj[key] = fromObj[key];
      });
    } else if (val === 10) {
      obj["unset"] = arr[val] === "TRUE" ? true : false;
    } else if (val === 13) {
      obj["auditComplete"] = arr[val] === "TRUE" ? true : false;
    }
  });
  return obj;
};

export const createJsonForSLC = (
  arr: string[],
  moveEntryID: string
): SLC | null => {
  const obj: SLC = {
    team: Teams.Commonwealth,
    action: Action.SLC,
    moveType: MoveType.MOVE,
    serialNumber: "",
    originID: moveEntryID,
    location: "",
    building: Building.ATN1,
    hall: Hall.A,
    row: "",
    side: HallSide.Front,
    position: "",
    inPosition: false,
    slcSET: false,
    auditComplete: false,
    notes: "",
    hasIssue: false,
    hasPriority: false,
    Id: "",
  };

  // Map Values
  const indexMapMove: number[] = [0, 2, 3, 8, 11, 12, 13];

  // Check for Mapable values
  for (let i = 0; i < indexMapMove.length; i++) {
    if (arr[indexMapMove[i]] === "") return null;
  }

  const objKeys: string[] = Object.keys(obj);

  indexMapMove.forEach(function (val) {
    if (val < 4) {
      obj[objKeys[val]] = arr[val];
    } else if (val === 8) {
      let fromObj = locationParse(arr[val]);
      Object.keys(fromObj).forEach((key) => {
        obj[key] = fromObj[key];
      });
    } else if (val === 11) {
      obj["inPosition"] = arr[val] === "TRUE" ? true : false;
    } else if (val === 12) {
      obj["slcSET"] = arr[val] === "TRUE" ? true : false;
    } else if (val === 13) {
      obj["auditComplete"] = arr[val] === "TRUE" ? true : false;
    }
  });
  return obj;
};
