import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/customer/shipping',
      },
      redirect: 'if_required',
    })
    router.push('/customer/shipping')

    if (result.error) {
      return
    } else {
      toast.success('Payment successful!', {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <PaymentElement />
      </div>
      <button disabled={!stripe}>Submit</button>
    </form>
  )
}
export default CheckoutForm
