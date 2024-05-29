import React, { useEffect, useState } from 'react'
// import Loaders from '../../components/loaders/Loaders'
// import useFetch from '../../lib/useFetch'
// import { toast } from 'react-toastify'
import styles from '../pages/verify/verify.module.css'
import { toast } from 'react-toastify'
import useFetch from '../lib/useFetch'

const email = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [loadQuery, { response, loading, error }] = useFetch(
    `/emailverification`,
    {
      method: 'post',
    },
    'formdata'
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (name === '') {
      toast.error('Please enter name', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (email === '') {
      toast.error('Please enter email', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else {
      if (emailRegex.test(email)) {
        let formData = new FormData()
        formData.append('email', email)
        formData.append('name', name)
        loadQuery(formData)
      } else {
        toast.error('Please enter correct email', {
          position: 'top-center',
          autoClose: 1500,
        })
      }
    }
  }

  useEffect(() => {
    if (response) {
      setEmail('')
      setName('')
      toast.success(response?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (error) {
      toast.error(error?.response?.data.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [response, error])

  return (
    <>
      <form>
        <div className={styles.main_verify}>
          <div className={styles.verify_panel}>
            <div className={styles.input_box}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.input_box}>
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <h2>Send Email</h2>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{ cursor: 'pointer' }}
            >
              Resend
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default email
