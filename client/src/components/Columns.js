import React, { Component } from 'react'
import styled from 'styled-components'
import ImageUpload from './ImageUpload'
const ColumnGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 100px ${p => 'repeat(' + p.length + ', 40px)'};
  position: relative;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &:hover {
    .hidden-delete {
      opacity: 1;
      transition: opacity 0.1s linear;
      transition-property: opacity;
      transition-duration: 0.1s;
      transition-timing-function: linear;
      transition-delay: 0s;
    }
  }
`

const Label = styled.input`
  display: block;
  border: none;
  outline: none;
  width: 40px;
  overflow: scroll;
  font-style: italic;
  height: 32px;
  text-align: center;
  font-size: 14px;
`
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  outline: none;
  opacity: 0;
  margin: 8px 0 4px 0;
  border-radius: 50%;
  transition: opacity 0.1s linear;
  transition-property: opacity;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  transition-delay: 0s;
`
const AddColumn = styled.button`
  background: #eee;
  display: flex;
  align-items: center;
  align-self: center;
  justify-self: center;
  justify-content: center;
  font-size: 1.2em;
  outline: none;
  color: green;
  height: 40px;
  width: 40px;
`

const NoColumnsText = styled.div`
  position: absolute;
  left: 180px;
  top: 42px;
  color: grey;
`

export default class Columns extends Component {
  render() {
    const {
      addColumnHandler,
      deleteColumnHandler,
      onLabelChangeHandler,
      columns,
    } = this.props

    function Loading() {
      return <div />
    }

    function EmptyScreen() {
      if (columns.length === 0) {
        return <NoColumnsText>Click + to add a new column</NoColumnsText>
      } else {
        return null
      }
    }
    return (
      <ColumnGrid length={columns.length + 1}>
        <Loading />
        {this.props.columns.map((column, index) => (
          <ColumnContainer key={column.id}>
            <DeleteButton
              className={'hidden-delete'}
              onClick={() => deleteColumnHandler(column)}
            >
              x
            </DeleteButton>
            <ImageUpload id={column.id}>+</ImageUpload>
            <Label
              value={column.label}
              onChange={e => onLabelChangeHandler(e, column)}
              placeholder={column.label}
            />
          </ColumnContainer>
        ))}
        <AddColumn onClick={() => addColumnHandler()}>+</AddColumn>
        <EmptyScreen />
      </ColumnGrid>
    )
  }
}
