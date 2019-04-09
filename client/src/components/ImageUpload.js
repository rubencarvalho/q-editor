import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

export default class ImageUpload extends Component {
  state = {
    image: '',
  }
  uploadImage(e) {
    let imageFormObj = new FormData()

    imageFormObj.append('imageName', 'image-' + Date.now())
    imageFormObj.append('imageData', e.target.files[0])

    // stores a readable instance of
    // the image being uploaded using multer
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
    })

    axios
      .post(`${API_URL}/upload`, imageFormObj)
      .then(data => {
        if (data.data.success) {
          this.setDefaultImage('multer')
        }
      })
      .catch(err => {
        alert('Error while uploading image using multer')
        this.setDefaultImage('multer')
      })
  }
  render() {
    return <input type="file" onChange={e => this.uploadImage(e)} />
  }
}
