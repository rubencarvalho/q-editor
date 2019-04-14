import React, { Component } from 'react'
import styled from 'styled-components'
import ImageUpload from './ImageUpload'

const RowGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: ${p => 'repeat(' + p.length + ', 40px)'};
  position: relative;
`

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 20px;
  position: relative;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
const Label = styled.input`
  display: block;
  border: none;
  outline: none;
  width: 40px;
  overflow: scroll;
  font-style: italic;
  height: 30px;
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
const AddRow = styled.button`
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
  margin-right: 20px;
`
const NoColumnsText = styled.div`
  position: absolute;
  top: 52px;
  color: grey;
`

const StyledInput = styled.input`
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
export default class Rows extends Component {
  render() {
    const {
      addRowHandler,
      deleteRowHandler,
      onLabelChangeHandler,
      inputChangeHandler,
      rows,
      columns,
      setImage,
    } = this.props

    function EmptyScreen() {
      if (rows.length === 0) {
        return <NoColumnsText>Click to add a new row</NoColumnsText>
      } else {
        return null
      }
    }
    return (
      <React.Fragment>
        {rows &&
          rows.map((row, index) => (
            <RowContainer key={row.id}>
              <Row>
                <DeleteButton
                  className={'hidden-delete'}
                  onClick={() => deleteRowHandler(row)}
                >
                  x
                </DeleteButton>
                <ImageUpload
                  setImage={setImage}
                  id={row.id}
                  columnOrRow={'row'}
                >
                  +
                </ImageUpload>
                <Label
                  value={row.label}
                  onChange={e => onLabelChangeHandler(e, row, 'row')}
                  placeholder={`row${index + 1}`}
                />
              </Row>
              <RowGrid length={columns.length}>
                {this.props.columns.map((col, index) => (
                  <StyledInput
                    style={{ margin: 'auto' }}
                    key={col.id}
                    checked={row.selected === index}
                    type="radio"
                    onChange={() => inputChangeHandler(row, index)}
                  />
                ))}
              </RowGrid>
            </RowContainer>
          ))}
        <RowContainer>
          <AddRow onClick={() => addRowHandler()}>+</AddRow>
          <EmptyScreen />
        </RowContainer>
      </React.Fragment>
    )
  }
}
