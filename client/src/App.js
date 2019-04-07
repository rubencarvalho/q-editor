import React, { useState } from 'react'
import styled from 'styled-components'

export default function App() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
  `

  return (
    <Container>
      <div>Hello Quantilope</div>
    </Container>
  )
}
