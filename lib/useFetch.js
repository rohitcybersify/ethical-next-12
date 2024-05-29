'use client'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigate } from "react-router-dom";
// import { clearUserLocalData } from "../../common/utils/Functions";

const useFetch = (url, config, formdata) => {
  const [response, setResponse] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const [error, setError] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  // const navigate = useNavigate();
  const instance = axios.create({
    baseURL: 'https://test.cybersify.tech/Eswag/public/api',
    // baseURL: 'https://apis.ethicalswag.com/api',
  })
  const loadQuery = async (data, rest) => {
    const token = localStorage.getItem('token_swag')
    const headers = token
      ? {
          'Content-Type': formdata ? 'multipart/form-data' : 'application/json',
        }
      : {
          // Authorization: token,
          'Content-Type': formdata ? 'multipart/form-data' : 'application/json',
        }

    return new Promise((resolve, reject) => {
      setLoading(true)
      instance({
        url: `${url}`,
        ...config,
        data,
        headers,
        ...rest,
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            resolve(response)
            setError(undefined)
            response.data != null && setResponse(response.data)
          } else {
            setError(response)
            setResponse(undefined)
          }
          setLoading(false)
        })
        .catch((e) => {
          setError(e)
          setResponse(undefined)
          setLoading(false)
        })
    })
  }

  return [loadQuery, { response, loading, error, errorMessage }]
}

export default useFetch

export const GA_TRACKING_ID = 'G-B51Q1TS5Y4'
