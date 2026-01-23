import { apiSlice } from "../apiSlice";

interface ApplicationRateResponse {
  data: {
    month: string;
    value: number;
  }[];
}

export const coachingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboardApplicationRate: builder.query<ApplicationRateResponse, null>({
      query: () => "/dashboard/application-rate",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useDashboardApplicationRateQuery } = coachingApiSlice;
