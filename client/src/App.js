import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './components/Title'
import Columns from './components/Columns'
import Rows from './components/Rows'
import uid from 'uid'
import Summary from './components/Summary'
import {
  getAllQuestions,
  postQuestion,
  updateQuestion,
  getQuestion,
  deleteQuestion,
} from './services'
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

const StyledButton = styled.button`
  background: #eee;
  display: flex;
  align-items: center;
  align-self: center;
  justify-self: center;
  justify-content: center;
  outline: none;
  border-radius: 4px;
  height: 30px;
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

  onQuestionSave = () => {
    if (this.state.question._id) {
      updateQuestion(this.state.question, this.state.question._id).then(res => {
        console.log('updated!', res)
        this.setState({ ...this.state, question: res.data })
      })
    } else {
      const defaultTitle = this.state.question.title || 'New question'
      postQuestion({ ...this.state.question, title: defaultTitle }).then(
        res => {
          console.log('Posted!', res)
          this.setState({ ...this.state, question: res.data })
        }
      )
    }
  }

  onQuestionDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(this.state.question._id).then(res => {
        console.log('deleted!', res)
      })
    } else {
      const defaultTitle = this.state.question.title || 'New question'
      postQuestion({ ...this.state.question, title: defaultTitle }).then(
        res => {
          console.log('Posted!', res)
          this.setState({ ...this.state, question: res.data })
        }
      )
    }
  }

  onQuestionSelectChange = e => {
    console.log(e.target.value)
    getQuestion(e.target.value).then(res =>
      this.setState({
        ...this.state,
        question: res.data,
      })
    )
  }

  onTitleChangeHandler = e => {
    this.setState({
      ...this.state,
      question: { ...this.state.question, title: e.target.value },
    })
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
            <StyledButton onClick={() => this.onQuestionSave()}>
              Save question
            </StyledButton>
            <StyledButton onClick={() => this.onQuestionDelete()}>
              Delete question
            </StyledButton>
            <select
              onChange={e => this.onQuestionSelectChange(e)}
              name="question"
            >
              {this.state.questions.map(question => (
                <option key={question._id} value={question._id}>
                  {question.title}
                </option>
              ))}
            </select>
          </Header>
          <Columns
            questionID={this.state.question_id ? this.state.question_id : null}
            addColumnHandler={this.addColumnHandler}
            deleteColumnHandler={this.deleteColumnHandler}
            onLabelChangeHandler={this.onLabelChangeHandler}
            columns={this.state.question.columns}
            setImage={this.setImage}
          />
          <Rows
            questionID={this.state.question_id ? this.state.question_id : null}
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
