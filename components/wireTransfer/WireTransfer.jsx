import { useRouter } from 'next/router'
import { useState } from 'react'
const WireTransfer = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bank_acount: '',
    bank_transit_number: '',
    swift_key: '',
    zip_code: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const userId = '1'
    const orderId = '4345'
    const body = {
      ...formData,
      user_id: userId,
      order_id: orderId,
    }

    try {
      const response = await fetch(
        'https://frontend.goaideme.com/wire-transfer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      setSubmitted(true)
    } catch (error) {
      return
    }
  }
  const handleReceiptChange = (e) => {
    const selectedFile = e.target.files[0]
    setReceipt(selectedFile)
  }
  const handleReceiptHAndler = async (e) => {
    e.preventDefault()
    if (receipt) {
      try {
        const formDataToUpload = new FormData()
        formDataToUpload.append('file', receipt)
        formDataToUpload.append('order_id', '4345')
        const response = await fetch(
          'https://frontend.goaideme.com/upload-wirereceipit',
          {
            method: 'POST',
            body: formDataToUpload,
          }
        )
        if (!response.ok) {
          throw new Error('Failed to upload receipt')
        }
        router.push('/customer/shipping')
      } catch (error) {
        return
      }
    } else {
      return
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bank_acount">Bank Acount:</label>
          <input
            type="number"
            id="bank_acount"
            name="bank_acount"
            value={formData.bank_acount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bank_transit_number">Bank Transit Number:</label>
          <input
            type="number"
            id="bank_transit_number"
            name="bank_transit_number"
            value={formData.bank_transit_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="swift_key">Swift Key:</label>
          <input
            type="text"
            id="swift_key"
            name="swift_key"
            value={formData.swift_key}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="zip_code">Zip Code:</label>
          <input
            type="number"
            id="zip_code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {submitted && (
          <div>
            <div>
              <label htmlFor="fileInput">Choose a file:</label>
              <input
                type="file"
                id="fileInput"
                onChange={handleReceiptChange}
                accept=".jpg, .jpeg, .png, .pdf"
              />
            </div>
            <button>Cancel</button>
            <button onClick={handleReceiptHAndler} type="submit">
              Upload
            </button>
          </div>
        )}
      </form>
    </>
  )
}
export default WireTransfer
