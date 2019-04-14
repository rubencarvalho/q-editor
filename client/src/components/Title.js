import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  outline: none;
  width: 400px;
  font-style: italic;
  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: show 0.3s ease-in-out;
`
export default function Title({ title, onChangeHandler }) {
  return (
    <StyledInput
      name="title"
      value={title || ''}
      placeholder="Enter the title of the question"
      onChange={e => onChangeHandler(e)}
    />
  )
}
