import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'
import {  config } from '../config'
export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  tagTypes: ['GETDATA'],
  baseQuery: fetchBaseQuery({    
    baseUrl:   config.BASE_URL +'v1/patient',       
    prepareHeaders: (headers, { getState }) => {    
      const { access_token } = (getState() as RootState).authReducer 
      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
  
    deletepost: build.mutation<any,any>({
      query: ({  id ,  pid}) => ({
        url: `deleteplandate`,
        method: 'POST',
        body: { id, pid },
      }),
     
    }),



  }),
})

export const {   useDeletepostMutation } = articlesAPI
