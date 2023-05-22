import React, { useEffect, useState } from 'react'
import './Calculator.css'

function Calculator() {
  const operatorButtons = ['C', '+/-', '%', '/', '*', '-', '+']

  const [displayValue, setDisplayValue] = useState('0')

  const [previousOperand, setPreviousOperand] = useState(null)
  const [currentOperand, setCurrentOperand] = useState(null)
  const [operator, setOperator] = useState(null)

  const numberButtonElements = Array.from({ length: 10 }, (_, i) => {
    const number = 9 - i
    const handleClick = () => {
      setCurrentOperand((prev) => {
        if (prev === null) {
          return number.toString()
        }
        if (prev === 'error') {
          return number.toString()
        }
        if (prev.length > 8) {
          return prev
        }

        return prev + number.toString()
      })
    }

    return (
      <button
        type="button"
        className="number"
        id={i === 9 ? 'zero' : undefined}
        onClick={handleClick}
        key={number}
      >
        {number}
      </button>
    )
  })

  const calculate = () => {
    if (
      currentOperand === null ||
      previousOperand === null ||
      operator === null
    ) {
      return
    }
    const result = eval(`${previousOperand} ${operator} ${currentOperand}`)

    if (result < 0 || result > 999999999) {
      setCurrentOperand('error')
      setPreviousOperand(null)
      setOperator(null)
      return
    }

    if (result % 1 !== 0) {
      setCurrentOperand(result.toFixed(2))
      setPreviousOperand(null)
      setOperator(null)

      return
    }

    setCurrentOperand(result.toString())
    setPreviousOperand(null)
    setOperator(null)
  }

  const handleClearClick = () => {
    setPreviousOperand(null)
    setCurrentOperand(null)
    setOperator(null)
  }

  const handleNegateClick = () => {
    if (currentOperand.toString().includes('-')) {
      setCurrentOperand(currentOperand.toString().slice(1))
      return
    }
    if (currentOperand.toString().length < 8) {
      setCurrentOperand((currentOperand * -1).toString())
    }
  }

  const handleOperatorClick = (clickedOperator) => {
    if (currentOperand === null && previousOperand === null) {
      return
    }
    if (currentOperand === 'error') {
      handleClearClick()
      return
    }

    if (clickedOperator === 'C') {
      handleClearClick()
      return
    }

    if (clickedOperator === '+/-') {
      handleNegateClick()
      return
    }

    if (previousOperand === null) {
      setPreviousOperand(currentOperand)
      setCurrentOperand(null)
      setOperator(clickedOperator)
      return
    }

    const result = eval(`${previousOperand} ${operator} ${currentOperand}`)
    if (result < 0 || result > 999999999) {
      setCurrentOperand('error')
      setPreviousOperand(null)
      setOperator(null)
      return
    }

    setPreviousOperand(Math.round(result * 1000) / 1000)
    setCurrentOperand(null)
    setOperator(clickedOperator)
  }

  const operatorButtonElements = operatorButtons.map((clickedOperator) => (
    <button
      type="button"
      className="operator"
      key={clickedOperator}
      onClick={() => handleOperatorClick(clickedOperator)}
    >
      {clickedOperator}
    </button>
  ))

  return (
    <div className="calculator">
      <div className="display">
        <div className="menu">
          <div className="menu-buttons">
            <div className="x">✖</div>
          </div>
        </div>
        <div className="screen">
          {' '}
          <div className="prev">{previousOperand}</div>
          <div className="current">{currentOperand}</div>
        </div>
      </div>
      <div className="controls">
        <div className="symbols">
          {operatorButtonElements}
          <button type="button" onClick={() => calculate()}>
            =
          </button>
          {numberButtonElements}
          <div className="logo" />
        </div>
      </div>
    </div>
  )
}

export default Calculator
