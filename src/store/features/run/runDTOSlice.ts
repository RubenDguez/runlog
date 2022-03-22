import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRun, IRunStateDTO } from "../../../types";
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
          if (data) dispatch(setRunStateList(data as IRunStateDTO[]));
        } catch (err) {
          console.log(`Error fetching run: ${id}!`);
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
            console.log("run was created");
            dispatch(createRun(data as IRunStateDTO));
          }
        } catch (err) {
          console.log(`Error while creating run ${id}`);
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
            console.log("data was updated");
            dispatch(updateRun(data as IRunStateDTO));
          }
        } catch (err) {
          console.log(`Error updating run with id: ${id}`);
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
          console.log("data was erased");
          dispatch(deleteRun(id));
        } catch (err) {
          console.log(`Error deleting run with id: ${id}`);
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
