import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './components/Title'
import Columns from './components/Columns'
import uid from 'uid'
import ImageUpload from './components/ImageUpload'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 100%;
  width: 100%;
  position: absolute;
`

const GridWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-rows: 50px 100px 1fr;
`

export default class App extends Component {
  state = {
    columns: [],
    rows: [],
    title: '',
  }

  onTitleChangeHandler = e => {
    this.setState({ ...this.state, title: e.target.value })
  }

  addColumnHandler = () => {
    const length = this.state.columns.length
    this.setState({
      ...this.state,
      columns: [
        ...this.state.columns,
        { label: `col${length}`, image: '', id: uid() },
      ],
    })
  }

  deleteColumnHandler = column => {
    const index = this.state.columns.indexOf(column)
    this.setState({
      ...this.state,
      columns: [
        ...this.state.columns.slice(0, index),
        ...this.state.columns.slice(index + 1),
      ],
    })
  }
  onLabelChangeHandler = (e, column) => {
    const index = this.state.columns.indexOf(column)
    this.setState({
      ...this.state,
      columns: [
        ...this.state.columns.slice(0, index),
        { ...this.state.columns[index], label: e.target.value },
        ...this.state.columns.slice(index + 1),
      ],
    })
  }
  render() {
    return (
      <Container>
        <ImageUpload />
        <GridWrapper>
          <Title
            title={this.state.title}
            onChangeHandler={this.onTitleChangeHandler}
          />
          <Columns
            addColumnHandler={this.addColumnHandler}
            deleteColumnHandler={this.deleteColumnHandler}
            onLabelChangeHandler={this.onLabelChangeHandler}
            columns={this.state.columns}
          />
        </GridWrapper>
      </Container>
    )
  }
}
