import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginRequest } from '../interfaces/login.interface'
import {  config } from '../config'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({ 
    baseUrl:    config.BASE_URL ,   
  }),
  endpoints: (build) => ({
    login: build.mutation<any, ILoginRequest>({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: 'POST',
        body: { email, password },
      }),
    }),

    register: build.mutation<any, any>({
      query: ({  name, phone, email, age, weight, height, complaints}) => ({
        url: `patient/addpatient`,
        method: 'POST',
        body: { name, phone, email, age, weight, height, complaints },
      }),
    }),


  }),
})

export const { useLoginMutation , useRegisterMutation  } = authAPI
