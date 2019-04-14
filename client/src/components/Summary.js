import React from 'react'
import styled from 'styled-components'
const SummaryTitle = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  outline: none;
  width: 300px;
  margin-top: 100px;
`

const SummaryContainer = styled.div``

export default function Summary({ rows, columns }) {
  function checkImages() {
    let total = 0
    rows.forEach(row => {
      if (row.image !== '') {
        total++
      }
    })
    columns.forEach(column => {
      if (column.image !== '') {
        total++
      }
    })
    return total
  }

  function checkLabel(columnOrRow) {
    let longestLabel = 0
    if (columnOrRow === 'column') {
      columns.forEach(column => {
        if (column.label.length > longestLabel) {
          longestLabel = column.label.length
        }
      })
    } else if (columnOrRow === 'row') {
      rows.forEach(row => {
        if (row.label.length > longestLabel) {
          longestLabel = row.label.length
        }
      })
    }
    return longestLabel
  }
  return (
    <SummaryContainer>
      <SummaryTitle>Summary</SummaryTitle>
      <div>
        <p>{`Number of rows: ${rows.length}`}</p>
        <p>{`Number of columns: ${columns.length}`}</p>
        <p>{`Number of images uploaded: ${checkImages()}`}</p>
        <p>{`Longest row label: ${checkLabel('row')}`}</p>
        <p>{`Longest column label: ${checkLabel('column')}`}</p>
      </div>
    </SummaryContainer>
  )
}
