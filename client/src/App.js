import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './components/Title'
import Columns from './components/Columns'
import Rows from './components/Rows'
import uid from 'uid'
import Summary from './components/Summary'
import { getAllQuestions, postQuestion } from './services'
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
    questions: [],
    question: {
      columns: [],
      rows: [],
      title: '',
    },
  }

  componentDidMount() {
    getAllQuestions().then(res =>
      this.setState({ ...this.state, questions: res.data })
    )
  }

  onQuestionSave = () => {}

  onQuestionSelectChange = e => {}

  onTitleChangeHandler = e => {
    this.setState({ ...this.state, title: e.target.value })
  }

  addColumnHandler = () => {
    const length = this.state.question.columns.length
    this.setState({
      ...this.state,
      question: {
        ...this.state.question,
        columns: [
          ...this.state.question.columns,
          { label: `col${length + 1}`, image: '', id: uid() },
        ],
      },
    })
  }

  addRowHandler = () => {
    const length = this.state.question.rows.length
    this.setState({
      ...this.state,
      question: {
        ...this.state.question,
        rows: [
          ...this.state.question.rows,
          { label: `row${length + 1}`, image: '', id: uid(), selected: '' },
        ],
      },
    })
  }

  deleteRowHandler = row => {
    const index = this.state.question.rows.indexOf(row)
    this.setState({
      ...this.state,
      question: {
        ...this.state.question,
        rows: [
          ...this.state.question.rows.slice(0, index),
          ...this.state.question.rows.slice(index + 1),
        ],
      },
    })
  }

  deleteColumnHandler = column => {
    const index = this.state.question.columns.indexOf(column)
    this.setState(
      {
        ...this.state,
        question: {
          ...this.state.question,
          columns: [
            ...this.state.question.columns.slice(0, index),
            ...this.state.question.columns.slice(index + 1),
          ],
        },
      },
      () => {
        this.state.question.rows.forEach(row => {
          if (row.selected === index) {
            row.selected = ''
          } else if (row.selected > index) {
            row.selected -= 1
          }
        })
        this.setState({
          ...this.state,
          question: {
            ...this.state.question,
            rows: [...this.state.question.rows],
          },
        })
      }
    )
  }
  onLabelChangeHandler = (e, item, columnOrRow) => {
    if (columnOrRow === 'column') {
      const index = this.state.question.columns.indexOf(item)
      this.setState({
        ...this.state,
        question: {
          ...this.state.question,
          columns: [
            ...this.state.question.columns.slice(0, index),
            { ...this.state.question.columns[index], label: e.target.value },
            ...this.state.question.columns.slice(index + 1),
          ],
        },
      })
    } else if (columnOrRow === 'row') {
      const index = this.state.question.rows.indexOf(item)
      this.setState({
        ...this.state,
        question: {
          ...this.state.question,
          rows: [
            ...this.state.question.rows.slice(0, index),
            { ...this.state.question.rows[index], label: e.target.value },
            ...this.state.question.rows.slice(index + 1),
          ],
        },
      })
    }
  }

  inputChangeHandler = (row, selected) => {
    const index = this.state.question.rows.indexOf(row)
    this.setState({
      ...this.state,
      question: {
        ...this.state.question,
        rows: [
          ...this.state.question.rows.slice(0, index),
          { ...this.state.question.rows[index], selected },
          ...this.state.question.rows.slice(index + 1),
        ],
      },
    })
  }

  setImage = (id, image, columnOrRow) => {
    if (columnOrRow === 'column') {
      const item = this.state.question.columns.find(column => column.id === id)
      const index = this.state.question.columns.indexOf(item)
      this.setState({
        ...this.state,
        question: {
          ...this.state.question,
          columns: [
            ...this.state.question.columns.slice(0, index),
            { ...this.state.question.columns[index], image: image },
            ...this.state.question.columns.slice(index + 1),
          ],
        },
      })
    } else if (columnOrRow === 'row') {
      const item = this.state.question.rows.find(row => row.id === id)
      const index = this.state.question.rows.indexOf(item)
      this.setState({
        ...this.state,
        question: {
          ...this.state.question,
          rows: [
            ...this.state.question.rows.slice(0, index),
            { ...this.state.question.rows[index], image: image },
            ...this.state.question.rows.slice(index + 1),
          ],
        },
      })
    }
  }

  render() {
    return (
      <Container>
        <GridWrapper>
          <Header>
            <Title
              title={this.state.question.title}
              onChangeHandler={this.onTitleChangeHandler}
            />
            <button onChange={() => this.onQuestionSave()}>
              Save question
            </button>
            <select name="question">
              {this.state.questions.map(question => (
                <option key={question._id} value={question.title}>
                  {question.title}
                </option>
              ))}
            </select>
          </Header>
          <Columns
            addColumnHandler={this.addColumnHandler}
            deleteColumnHandler={this.deleteColumnHandler}
            onLabelChangeHandler={this.onLabelChangeHandler}
            columns={this.state.question.columns}
            setImage={this.setImage}
          />
          <Rows
            columns={this.state.question.columns}
            addRowHandler={this.addRowHandler}
            deleteRowHandler={this.deleteRowHandler}
            onLabelChangeHandler={this.onLabelChangeHandler}
            rows={this.state.question.rows}
            inputChangeHandler={this.inputChangeHandler}
            setImage={this.setImage}
          />
        </GridWrapper>
        <Summary
          rows={this.state.question.rows}
          columns={this.state.question.columns}
        />
      </Container>
    )
  }
}
