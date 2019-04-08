import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './components/Title'
import ColumnsHeader from './components/ColumnsHeader'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
`
const ColumnGrid = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: ${p => 'repeat(' + p.length + ', 40px)'};
  height: 40px;
`

export default class App extends Component {
  state = {
    columns: [1, 2, 3, 4],
    rows: [],
    title: 'Example Question',
  }

  onTitleChangeHandler = event => {
    this.setState({ ...this.state, title: event.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Title
            title={this.state.title}
            onChangeHandler={this.onTitleChangeHandler}
          />
          <ColumnGrid length={this.state.columns.length + 1}>
            {this.state.columns.map(() => (
              <div>+</div>
            ))}
          </ColumnGrid>
        </Container>
      </React.Fragment>
    )
  }
}
