// import type { AppProps } from 'next/app'
import { builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import countrySlice from '../redux-setup/countrySlice'
import authSlice from '../redux-setup/authSlice'
import cartSlice from '../redux-setup/cartSlice'
import randomSlice from '../redux-setup/randomSlice'
import wishlistSlice from '../redux-setup/wishlistSlice'
import filterSlice from '../redux-setup/FiltersSlice'
import adminSlice from '../redux-setup/adminSlice'
import statusSlice from '../redux-setup/orderStatus'
import sidebarSlice from '../redux-setup/sidebarSlice'
import socketSlice from '../redux-setup/socketSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StrictMode, useEffect, useState } from 'react'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import '../global.css'
import categorySlice from 'redux-setup/categorySlice'
import ordersSlice from '../redux-setup/ordersSlice'
import pageSlice from '../redux-setup/pageSlice'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config';
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'

// const stripePromise = loadStripe(
//   'pk_test_51OzXu4SG76jQkcdqTqTxJQtVVB6sMBGSKwqCdaBYx6xomtdS1bih43Vk1Rx8yp2f9YGHpJIkuT6OzAVZvc09W70C00LzSTnFZo'
// )

builder.init(builderConfig.apiKey)

const combinedReducer = combineReducers({
  country: countrySlice,
  auth: authSlice,
  filter: filterSlice,
  cart: cartSlice,
  random: randomSlice,
  admin: adminSlice,
  category: categorySlice,
  wishlist: wishlistSlice,
  orders: ordersSlice,
  socket: socketSlice,
  sidebar: sidebarSlice,
  userOrder: statusSlice,
  page: pageSlice,
})

const persistConfig = { key: 'root', storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, combinedReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
})

export default function MyApp({ Component, pageProps }) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      'sk_test_51OzXu4SG76jQkcdqbcqN5THTrNz2CjxTmZHDHfkCUClt3PjwMHn8Mr99Mkg1JT6GhcOQunAhRXNxJf9a24nrUoH300M9QrbB4J',
  }

  return (
    // <Elements
    //   stripe={stripePromise}
    //   // options={options}
    // >
    <>
      {/* <DefaultSeo
        title="Ethical Swag | North America | Sustainable Promotional Products"
        description="Ethical Swag provides a suite of turn-key services designed with convenience in mind to streamline your swag management process and elevate your brand presence."
        openGraph={{
          type: 'website',
          locale: 'en-ca',
          url: 'https://ethicalswag.com/',
          siteName: 'Ethical Swag',
        }}
        twitter={{
          handle: '@ethicalswag',
          site: '@ethicalswag',
          cardType: 'summary_large_image',
        }}
      /> */}
       <DefaultSeo {...SEO} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <StrictMode>
            <Component {...pageProps} suppressHydrationWarning />

            <ToastContainer />
          </StrictMode>
        </PersistGate>
      </Provider>
    </>
  )
}
