'use client'
import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Invoice from './Invoice'

const InvoiceGenerator = () => {
  const generatePDF = () => {
    const input = document.getElementById('invoice-container')

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4')
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297)
      pdf.save('invoice.pdf') 
    })
  }

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      {/* <div style={{ height: '0px', width: '0px', overflow: 'hidden' }}> */}
      <div id="invoice-container">
        <Invoice />
      </div>
      {/* </div> */}
    </div>
  )
}

export default InvoiceGenerator
