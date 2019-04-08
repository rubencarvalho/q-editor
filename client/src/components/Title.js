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

// import React, { useState } from 'react'
// import styled from 'styled-components'

// const Text = styled.h2`
//   border-bottom: 1px solid grey;
//   width: 300px;
// `

// const StyledInput = styled.input`
//   display: block;
//   font-size: 1.5em;
//   font-weight: bold;
//   border: none;
//   border-bottom: 1px solid grey;
//   outline: none;
//   width: 300px;
//   overflow: hidden;
// `

// export default function Title({ title, onTitleChangeHandler }) {
//   const [input, setInput] = useState(title || 'Enter question name')
//   const [editMode, setEditMode] = useState(false)

//   function onChangeHandler(event) {
//     setInput(event.target.value)
//     onTitleChangeHandler(event.target.value)
//   }
//   function onSubmitHandler(event) {
//     event.preventDefault()
//     onTitleChangeHandler(input)
//     setEditMode(false)
//   }

//   function onCancelHandler(event) {
//     event.preventDefault()
//     setInput(title)
//     setEditMode(false)
//   }

//   if (editMode === true) {
//     return (
//       <form onSubmit={onSubmitHandler}>
//         <StyledInput
//           key="title"
//           type="text"
//           value={input}
//           onChange={e => onChangeHandler(e)}
//         />
//         <button type="submit">Save</button>
//         <button type="cancel" onClick={e => onCancelHandler(e)}>
//           Cancel
//         </button>
//       </form>
//     )
//   } else {
//     return <Text onClick={() => setEditMode(true)}>{title}</Text>
//   }
// }
