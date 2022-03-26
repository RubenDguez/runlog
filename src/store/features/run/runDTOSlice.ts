import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRun, IRunStateDTO } from "../../../types";
import {
  setSnackbarMessage,
  setSnackbarVariant,
  toggleSnackbar,
} from "../app/appSlice";
import {
  createRun,
  deleteRun,
  setRunStateList,
  updateRun,
} from "./runListSlice";

export const initialState: IRunStateDTO = {
  id: 0,
  loadNumber: 0,
  pickUpLocation: "",
  dropOffLocation: "",
  pickUpDate: "",
  dropOffDate: "",
  loadedMiles: 1148,
  emptyMiles: 68,
  secondLoadRate: 200.0,
  extras: 0.0,
  baseRate: 0.4,
  emptyRate: 0.2,
  minMiles: 60,
  userId: 1,
  baseEntity: {
    createdAt: "",
    updatedAt: "",
  },
  links: {
    run: "",
    load: "",
    user: "",
  },
  loadedCash: 0.0,
  emptyCash: 0.0,
  totalTrip: 0.0,
  weekNumber: 0,
  year: 0,
  atPickUp: false,
  secondLoad: false,
};

export const runDTOApi = createApi({
  reducerPath: "rundtoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    getAll: builder.query<IRunStateDTO[], void>({
      query: () => `/runs`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setRunStateList(data as IRunStateDTO[]));
          }
        } catch (err) {
          dispatch(setSnackbarVariant("error"));
          dispatch(setSnackbarMessage(`Error fetching data`));
          dispatch(toggleSnackbar());
        }
      },
    }),
    getById: builder.query<IRunStateDTO, number>({
      query: (id: number) => ({
        url: `/run/${id}`,
      }),
    }),
    create: builder.mutation({
      query: (run) => ({
        url: "/run",
        method: "POST",
        body: run,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(createRun(data as IRunStateDTO));
          }
        } catch (err) {
          dispatch(setSnackbarVariant("error"));
          dispatch(setSnackbarMessage(`Error while creating run ${id}`));
          dispatch(toggleSnackbar());
        }
      },
    }),
    update: builder.mutation<IRun, Partial<IRun> & Pick<IRun, "id">>({
      query: ({ id, ...patch }) => ({
        url: `/run/${id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(updateRun(data as IRunStateDTO));
          }
        } catch (err) {
          console.log();
          dispatch(setSnackbarVariant("error"));
          dispatch(
            setSnackbarMessage(`Error while updating run with id: ${id}`)
          );
          dispatch(toggleSnackbar());
        }
      },
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `/run/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(deleteRun(id));
        } catch (err) {
          dispatch(setSnackbarVariant("error"));
          dispatch(
            setSnackbarMessage(`Error while deleting run with id: ${id}`)
          );
          dispatch(toggleSnackbar());
        }
      },
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetByIdQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = runDTOApi;
