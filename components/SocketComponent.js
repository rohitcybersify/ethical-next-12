import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifications } from 'redux-setup/randomSlice'
import { setSocket } from 'redux-setup/socketSlice'
import { io } from 'socket.io-client'
const SocketComponent = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState('')
  const socket = useSelector((state) => state.socket.socket)

  useEffect(() => {
    const newSocket = io('https://frontend.goaideme.com/')

    dispatch(setSocket(newSocket))

    return () => {
      newSocket.disconnect()
      dispatch(setSocket(null))
    }
  }, [dispatch])

  useEffect(() => {
    setUser('shubhamsssss')
  }, [])

  useEffect(() => {
    if (socket && user) {
      socket?.emit('newUser', user)
    }
  }, [socket, user])

  useEffect(() => {
    if (socket) {
      const handleNotification = (data) => {
        dispatch(setNotifications(data))
      }

      socket.on('getNotification', handleNotification)

      return () => {
        socket.off('getNotification', handleNotification)
      }
    }
  }, [socket, dispatch])
}

export default SocketComponent
