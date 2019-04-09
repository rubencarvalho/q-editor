import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  outline: none;
  width: 300px;
  font-style: italic;
  margin-bottom: 40px;
`
export default function Title({ title, onChangeHandler }) {
  return (
    <StyledInput
      name="title"
      value={title}
      placeholder="Enter your question title"
      onChange={onChangeHandler}
    />
  )
}
