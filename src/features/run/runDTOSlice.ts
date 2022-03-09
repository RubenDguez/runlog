import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRunStateDTO } from "../../types";

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
    }),
    update: builder.mutation({
      query: ({ id, run }) => ({
        url: `/run/${id}`,
        method: "PUT",
        body: run,
      }),
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `/run/${id}`,
        method: "DELETE",
      }),
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
