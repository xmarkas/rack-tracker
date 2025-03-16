import { Teams, Action, MoveType, Building, Hall, HallSide} from './types'

export interface UnsetMove {
    [index: string]: string | number | boolean;
    Id: string;
    team: Teams;
    action: Action;
    moveType: MoveType;
    serialNumber: string;
    // From
    location: string;
    building: Building;
    hall: Hall;
    row: string;
    side: HallSide;
    position: string;
    // To
    destinationID: string;
    //
    // qrCode?: string;
    unset: boolean;
    auditComplete: boolean;
    // actionNotes: number;
    notes: string;
    hasIssue: boolean;
    hasPriority: boolean;
  }

  export interface SLC {
    [index: string]: string | number | boolean ;
    Id: string;
    team: Teams;
    action: Action;
    moveType: MoveType;
    serialNumber: string;
    // From
    originID: string;
    // To
    location: string;
    building: Building;
    hall: Hall;
    row: string;
    side: HallSide;
    position: string;
    //
    // qrCode: string;
    inPosition: boolean;
    slcSET: boolean;
    auditComplete: boolean;
    // actionNotes: number;
    notes: string;
    hasIssue: boolean;
    hasPriority: boolean;
  }

  export interface Decom {
    [index: string]: string | number | boolean;
    Id: string;
    team: Teams;
    action: Action;
    moveType: MoveType;
    serialNumber: number;
    // From
    fromLocation: Building;
    fromHall: Hall;
    fromRow: number;
    fromSide: HallSide;
    fromPosition: number;
    //
    // qrCode: string;
    unset: boolean;
    auditComplete: boolean;
    // actionNotes: number;
    notes: string;
    hasIssue: boolean;
    hasPriority: boolean;
  }
  
  // For logging user CRUD
  export interface ActionLogModel {
    rackActionId: string;
    logType: number;
    userID: string;
    logDateTime: number;
  }
  
  export interface User {
      name: string;
      company: string;
      position: string;
  }
