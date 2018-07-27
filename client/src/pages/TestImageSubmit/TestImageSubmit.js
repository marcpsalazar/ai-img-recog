import React, { Component } from "react";
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper'
import TestImageUpload from  "../../components/TestImageUpload";
import API from "../../utils/API";

class TestImageSubmit extends Component {
  state = {
    selectedFile: null,
    croppedFile: null,
    src: null,
    cropResult: null,
    displayImageCropper: "none",
    displayCropButton: "none",
    displayCroppedImage: "none",
    displaySubmit: "none"
  }

  // Function to get file type from base64 string
  imageFileExtensionFromBase64 = base64Data => {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
  }

  // Function to convert base64 string and file name into file
  base64StringtoFile = (base64String, fileName) => {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], fileName, {type: mime});
  }

  // Update state to catch file provided from client
  fileChangedHandler = event => { 
    this.setState({selectedFile: event.target.files[0]});
  }

  // Function to reset image submission form
  resetForm = () => { 
    document.getElementById("leaf-submit").reset();
    this.setState({ selectedFile: null,
        croppedFile: null,
        src: null,
        cropResult: null,
        displayImageCropper: "none",
        displayCropButton: "none",
        displayCroppedImage: "none",
        displaySubmit: "none"});
  }
  
  // Image upload (to client) handler
  uploadHandler = () => { 

    // If there's no cropped file, throw error
    if (!this.state.croppedFile) { 
      alert("Please provide a photo")
    } else { // Otherwise submit cropped file to server
      const formData = new FormData()
      formData.append('photo', this.state.croppedFile, this.state.croppedFile.fileName);

      API.postImage(formData) 
        .then(function(res) {
          console.log(res.data);
      });

      this.resetForm();
    }
  }

  // Function to display file provided by user in image cropper
  onSelectFile = event => {
    event.preventDefault();
    let files;
    if (event.dataTransfer) {
      files = event.dataTransfer.files;
    } else if (event.target) {
      files = event.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result, displayImageCropper: "block", displayCropButton: "block", displayCroppedImage: "none", displaySubmit: "none" });
    };
    reader.readAsDataURL(files[0]);
  }

  // Function to crop image
  cropImage = event => {
    event.preventDefault();
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      displayImageCropper: "none",
      displayCropButton: "none",
      displayCroppedImage: "block",
      displaySubmit: "block"
    });
  }

  handleImageUpload = event => {
    event.preventDefault();
    const cropBase64 = this.state.cropResult;
    const fileExt = this.imageFileExtensionFromBase64(cropBase64);
    const fileName = `photo.${fileExt}`;
    this.setState({ croppedFile: this.base64StringtoFile(cropBase64, fileName) }, 
      this.uploadHandler
    );
  }

  render() {
    return (
      <div>
        <TestImageUpload 
          fileChangedHandler={this.fileChangedHandler}
          handleImageUpload={this.handleImageUpload}
          onSelectFile={this.onSelectFile}
          cropImage={this.cropImage}
          displayCropButton={this.state.displayCropButton}
          displaySubmit={this.state.displaySubmit}
        />
        <div style={{display: this.state.displayImageCropper}}>
          <Cropper
            style={{ height: 400, width: '50%' }}
            aspectRatio={1 / 1}
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
            background={false}
            viewMode={2}
            zoomable={false}
          />
        </div>
        <img style={{ width: '50%', display: this.state.displayCroppedImage }} src={this.state.cropResult} alt="cropped" />
      </div>
    );
  }
}
  
export default TestImageSubmit;