import React, { Component } from 'react'
import styled from 'styled-components'

const ColumnGrid = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 60px ${p => 'repeat(' + p.length + ', 40px)'};
  height: 130px;
  gap: 20px;
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

const AddImage = styled.button`
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  outline: none;
  height: 40px;
  width: 40px;
  background-color: rgba(0, 0, 0, 0.02);
  transition: background-color 0.1s;
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
  height: 24px;
  width: 24px;
  margin-bottom: 8px;
  outline: none;
  opacity: 0;
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

export default class ColumnsHeader extends Component {
  render() {
    const {
      addColumnHandler,
      deleteColumnHandler,
      onLabelChangeHandler,
    } = this.props

    function Loading() {
      return <div>Loading</div>
    }
    return (
      <ColumnGrid length={this.props.columns.length + 2}>
        <Loading />
        {this.props.columns.map((column, index) => (
          <ColumnContainer key={column.id}>
            <DeleteButton
              className={'hidden-delete'}
              onClick={() => deleteColumnHandler(column)}
            >
              x
            </DeleteButton>
            <AddImage>+</AddImage>
            <Label
              value={column.label}
              onChange={event => onLabelChangeHandler(event, column)}
              placeholder={column.label}
            />
          </ColumnContainer>
        ))}
        <AddColumn onClick={() => addColumnHandler()}>+</AddColumn>
      </ColumnGrid>
    )
  }
}
