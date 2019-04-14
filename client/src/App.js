import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './components/Title'
import Columns from './components/Columns'
import Rows from './components/Rows'
import uid from 'uid'
import Summary from './components/Summary'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 100%;
  width: 100%;
`

const GridWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-rows: 50px 100px 1fr;
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
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
        { label: `col${length + 1}`, image: '', id: uid() },
      ],
    })
  }

  addRowHandler = () => {
    const length = this.state.rows.length
    this.setState({
      ...this.state,
      rows: [
        ...this.state.rows,
        { label: `row${length + 1}`, image: '', id: uid(), selected: '' },
      ],
    })
  }

  deleteRowHandler = row => {
    const index = this.state.rows.indexOf(row)
    this.setState({
      ...this.state,
      rows: [
        ...this.state.rows.slice(0, index),
        ...this.state.rows.slice(index + 1),
      ],
    })
  }

  deleteColumnHandler = column => {
    const index = this.state.columns.indexOf(column)
    this.setState(
      {
        ...this.state,
        columns: [
          ...this.state.columns.slice(0, index),
          ...this.state.columns.slice(index + 1),
        ],
      },
      () => {
        this.state.rows.forEach(row => {
          if (row.selected === index) {
            row.selected = ''
          } else if (row.selected > index) {
            row.selected -= 1
          }
        })
        this.setState({
          ...this.state,
          rows: [...this.state.rows],
        })
      }
    )
  }
  onLabelChangeHandler = (e, item, columnOrRow) => {
    if (columnOrRow === 'column') {
      const index = this.state.columns.indexOf(item)
      this.setState({
        ...this.state,
        columns: [
          ...this.state.columns.slice(0, index),
          { ...this.state.columns[index], label: e.target.value },
          ...this.state.columns.slice(index + 1),
        ],
      })
    } else if (columnOrRow === 'row') {
      const index = this.state.rows.indexOf(item)
      this.setState({
        ...this.state,
        rows: [
          ...this.state.rows.slice(0, index),
          { ...this.state.rows[index], label: e.target.value },
          ...this.state.rows.slice(index + 1),
        ],
      })
    }
  }

  inputChangeHandler = (row, selected) => {
    const index = this.state.rows.indexOf(row)
    this.setState({
      ...this.state,
      rows: [
        ...this.state.rows.slice(0, index),
        { ...this.state.rows[index], selected },
        ...this.state.rows.slice(index + 1),
      ],
    })
  }

  setImage = (id, image, columnOrRow) => {
    if (columnOrRow === 'column') {
      const item = this.state.columns.find(column => column.id === id)
      const index = this.state.columns.indexOf(item)
      this.setState({
        ...this.state,
        columns: [
          ...this.state.columns.slice(0, index),
          { ...this.state.columns[index], image: image },
          ...this.state.columns.slice(index + 1),
        ],
      })
    } else if (columnOrRow === 'row') {
      const item = this.state.rows.find(row => row.id === id)
      const index = this.state.rows.indexOf(item)
      this.setState({
        ...this.state,
        rows: [
          ...this.state.rows.slice(0, index),
          { ...this.state.rows[index], image: image },
          ...this.state.rows.slice(index + 1),
        ],
      })
    }
  }

  render() {
    return (
      <Container>
        <GridWrapper>
          <Header>
            <Title
              title={this.state.title}
              onChangeHandler={this.onTitleChangeHandler}
            />
            <select name="question">
              <option value="test">test</option>
            </select>
          </Header>
          <Columns
            addColumnHandler={this.addColumnHandler}
            deleteColumnHandler={this.deleteColumnHandler}
            onLabelChangeHandler={this.onLabelChangeHandler}
            columns={this.state.columns}
            setImage={this.setImage}
          />
          <Rows
            columns={this.state.columns}
            addRowHandler={this.addRowHandler}
            deleteRowHandler={this.deleteRowHandler}
            onLabelChangeHandler={this.onLabelChangeHandler}
            rows={this.state.rows}
            inputChangeHandler={this.inputChangeHandler}
            setImage={this.setImage}
          />
        </GridWrapper>
        <Summary rows={this.state.rows} columns={this.state.columns} />
      </Container>
    )
  }
}
