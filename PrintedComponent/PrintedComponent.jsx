import React, { forwardRef } from 'react'

const PrintedComponent = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/* Your component content goes here */}
      <h1>Printed Content</h1>
      <p>This is the content to be printed.</p>
    </div>
  )
})

export default PrintedComponent
