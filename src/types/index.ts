export interface ILink {
  run: string;
  load: string;
  user: string;
}

export interface IBaseEntity {
  createdAt: string;
  updatedAt: string;
}

export interface IRunState {
  loadNumber: number;
  secondLoad: boolean;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  loadedMiles: number;
  emptyMiles: number;
  extras: number;
}

export interface IRunStateDTO {
  id: number;
  loadNumber: number;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  loadedMiles: number;
  emptyMiles: number;
  secondLoadRate: number;
  extras: number;
  baseRate: number;
  emptyRate: number;
  minMiles: number;
  userId: number;
  baseEntity: IBaseEntity;
  links: ILink;
  loadedCash: number;
  emptyCash: number;
  totalTrip: number;
  weekNumber: number;
  year: number;
  atPickUp: boolean;
  secondLoad: boolean;
}

export interface IApp {
  theme: "light" | "dark";
  expandAccordion: boolean;
  filterYear: string | null;
  filterWeek: string | null;
  drawerWidth: number;
  drawerExpanded: boolean;
  dialog: {
    type: EDialogType | null;
    show: boolean;
    response: EDialogResponse | null;
    title: string | null | undefined;
    message: string | null;
  };
  snackbar: {
    open: boolean;
    message: string;
    variant: "error" | "info" | "success" | "warning";
  };
}

export interface IUser {
  atPickUp: boolean;
  secondLoadRate: number;
  baseRate: number;
  emptyRate: number;
  minMiles: number;
  userId: number;
}

export interface IRun {
  id: number;
  loadNumber: number;
  secondLoad: boolean;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  loadedMiles: number;
  emptyMiles: number;
  extras: number;
  atPickUp: boolean;
  secondLoadRate: number;
  baseRate: number;
  emptyRate: number;
  minMiles: number;
  userId: number;
}

export enum EDialogType {
  YES_NO = "YES_NO",
}

export enum EDialogResponse {
  YES = "YES",
}
