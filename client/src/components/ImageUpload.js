import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../services'
import styled from 'styled-components'

const AddImage = styled.label`
  display: flex;
  background-image: linear-gradient(to bottom, #e4e4e4, #f7f7f7);
  border: 1px solid #afafaf;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  outline: none;
  height: 40px;
  width: 40px;
  background-size: cover;
`

export default class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageURL: this.props.img || '',
    }
  }

  uploadImage(e, id, setImage, columnOrRow, questionID) {
    const imageFormObj = new FormData()

    imageFormObj.append('image', e.target.files[0])
    imageFormObj.append('questionID', questionID)

    axios
      .post(`${API_URL}/question/${id}/upload`, imageFormObj)
      .then(res => {
        if (res.status === 200) {
          this.setState(
            {
              imageURL: `${API_URL}/${res.data.result.imageData}`,
            },
            () => {
              setImage(id, this.state.imageURL, columnOrRow)
            }
          )
        }
      })
      .catch(err => {
        console.log(err)
        alert('Error while uploading image. Please try again.')
      })
  }

  render() {
    const { id, columnOrRow, setImage, questionID } = this.props

    return (
      <React.Fragment>
        <AddImage
          style={
            this.state.imageURL !== ''
              ? { backgroundImage: `url('${this.state.imageURL}')` }
              : null
          }
          htmlFor={`image${id}`}
        >
          {this.state.imageURL === '' ? '+' : null}
        </AddImage>
        <input
          id={`image${id}`}
          style={{ display: 'none' }}
          name="image"
          type="file"
          onChange={e =>
            this.uploadImage(e, id, setImage, columnOrRow, questionID)
          }
        />
      </React.Fragment>
    )
  }
}
