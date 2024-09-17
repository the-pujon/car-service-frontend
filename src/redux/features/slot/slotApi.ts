import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSlot: build.mutation({
      query: (slotData) => ({
        url: "/services/slots",
        method: "POST",
        body: slotData,
      }),
      invalidatesTags: ["slots"],
    }),

    getSlotAvailability: build.query({
      query: (params) => ({
        url: "/services/slots/availability",
        method: "GET",
        params,
      }),
      providesTags: ["slots"],
    }),

    updateSlotStatus: build.mutation({
      query: (data) => {
        //console.log(id, isBooked);
        console.log(data);
        return {
          url: `/services/slots/${data.id}`,
          method: "PATCH",
          body: { isBooked: data.isBooked },
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetSlotAvailabilityQuery,
  useUpdateSlotStatusMutation,
} = slotApi;