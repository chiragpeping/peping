import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'
import {  config } from '../config'
export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  tagTypes: ['GETDATA'],
  baseQuery: fetchBaseQuery({
     baseUrl:     config.BASE_URL +'patient',
    prepareHeaders: (headers, { getState }) => {

      const { access_token } = (getState() as RootState).authReducer

      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getAllArticles: build.mutation<any, null>({
      query: () => ({
        url: `all`,
        method: 'GET',
      }),
    }),
    getMyArticles: build.mutation<any, null>({
      query: () => ({
        url: ``,
        method: 'GET',
      }),
    }),
    addplandate: build.mutation<any, any>({
      query: ({ id, plandate }) => ({
        url: `addplandate`,
        method: 'POST',
        body: { id, plandate },
      }),
    }),

    deletepost: build.mutation<any, any>({
      query: ({ id, pid }) => ({
        url: `deleteplandate`,
        method: 'POST',
        body: { id, pid },
      }),

    }),
    addmeal: build.mutation<any, any>({
      query: ({ id, mealplan, plandate }) => ({
        url: `addmeal`,
        method: 'POST',
        body: { id, mealplan, plandate },
      }),

    }),

    addguideline: build.mutation<any, any>({
      query: ({ id, guideline, plandate }) => ({
        url: `addguideline`,
        method: 'POST',
        body: { id, guideline, plandate },
      }),

    }),
    deleteMeal: build.mutation<any, any>({
      query: ({ itemId, pid, plandate }) => ({
        url: `deletelan`,
        method: 'POST',
        body: { itemId, pid, plandate },
      }),

    }),
    deleteGuide: build.mutation<any, any>({
      query: ({ itemId, pid, plandate }) => ({
        url: `deleteguide`,
        method: 'POST',
        body: { itemId, pid, plandate },
      }),

    }),

    updatemeal: build.mutation<any, any>({
      query: ({ _id, mealhtml, time , type , pid , plandate}) => ({
        url: `updateplan`,
        method: 'POST',
        body: { _id, mealhtml, time , type , pid , plandate },
      }),

    }),

    updateGuide: build.mutation<any, any>({
      query: ({ id , guideline , plandate , updateGuideID }) => ({
        url: `updateguide`,
        method: 'POST',
        body: {   id , guideline , plandate , updateGuideID },
      }),

    }),

 
    updateStatus: build.mutation<any, any>({
      query: ({ id,did,status }) => ({
        url: `updatestatus`,
        method: 'POST',
        body: {   id,did,status },
      }),

    }),


    




  }),
})

export const { useGetAllArticlesMutation, useGetMyArticlesMutation, useAddplandateMutation, useDeletepostMutation, useAddmealMutation, useAddguidelineMutation, useDeleteMealMutation, useDeleteGuideMutation, 

  useUpdatemealMutation,
  useUpdateGuideMutation,
  useUpdateStatusMutation


} = articlesAPI
