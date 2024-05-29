import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Loaders from '../../components/loaders/Loaders'
import useFetch from '../../lib/useFetch'
import { toast } from 'react-toastify'
import styles from './verify.module.css'
import { useDispatch } from 'react-redux'
import { setuserId } from '../../redux-setup/authSlice'

const verify = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id = '' } = router.query

  const [loadQuery, { response, loading, error }] = useFetch(
    `/verify/${id}`,
    {
      method: 'post',
    },
    'formdata'
  )

  useEffect(() => {
    if (id) {
      loadQuery()
    }
  }, [id])

  useEffect(() => {
    if (response) {
      dispatch(setuserId(response?.data?.id))
      toast.success(response?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
      router.push('/')
    }
    if (error) {
      toast.error(error?.response?.data?.error, {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [response, error])

  return <>{loading && <Loaders />}</>
}

export default verify
