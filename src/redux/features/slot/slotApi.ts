import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSlot: build.mutation({
      query: (slotData) => ({
        url: "/slot",
        method: "POST",
        body: slotData,
      }),
      invalidatesTags: ["services"],
    }),

    getSlotAvailability: build.query({
      query: (params) => ({
        url: "/slot/availability",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useCreateSlotMutation, useGetSlotAvailabilityQuery } = slotApi;
