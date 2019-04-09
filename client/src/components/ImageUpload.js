import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

export default class ImageUpload extends Component {
  state = {
    imageURL: '',
  }

  uploadImage(e) {
    const imageFormObj = new FormData()

    imageFormObj.append('image', e.target.files[0])

    axios
      .post(`${API_URL}/question/5ca7f7c47197e315951bec92/upload`, imageFormObj)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            imageURL: `${API_URL}/${res.data.result.imageData}`,
          })
          console.log('it worked!', this.state)
        }
      })
      .catch(err => {
        console.log(err)
        alert('Error while uploading image. Please try again.')
      })
  }

  render() {
    return (
      <input name="image" type="file" onChange={e => this.uploadImage(e)} />
    )
  }
}
