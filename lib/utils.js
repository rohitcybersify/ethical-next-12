import { clsx } from 'clsx'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const moreDes = ({ showFullDescription, des, length }) => {
  const description = showFullDescription ? des : des?.slice(0, length)
  return description
}

export const debounce = (func) => {
  if (func) {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  } else {
  }
}

export const timeAgo = (timestamp) => {
  const timestampDate = new Date(timestamp)
  const currentDate = new Date()

  const timeDifference = currentDate - timestampDate

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 365 * day

  if (timeDifference < minute) {
    return `${Math.round(timeDifference / 1000)} seconds ago`
  } else if (timeDifference < hour) {
    return `${Math.round(timeDifference / minute)} minutes ago`
  } else if (timeDifference < day) {
    return `${Math.round(timeDifference / hour)} hours ago`
  } else if (timeDifference < month) {
    return `${Math.round(timeDifference / day)} days ago`
  } else if (timeDifference < year) {
    return `${Math.round(timeDifference / month)} months ago`
  } else {
    return `${Math.round(timeDifference / year)} years ago`
  }
}
