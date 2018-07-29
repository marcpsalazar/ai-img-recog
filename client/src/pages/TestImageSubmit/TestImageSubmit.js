import React, { Component } from "react";
import TestImageUpload from  "../../components/TestImageUpload";
import API from "../../utils/API";

class TestImageSubmit extends Component {
  state = {
    selectedFile: null
  }

  fileChangedHandler = event => { 
    this.setState({selectedFile: event.target.files[0]});
  }

  resetForm = () => { // Function to reset image submission form
    document.getElementById("leaf-submit").reset();
    this.setState({selectedFile: null});
  }
  
  uploadHandler = event => { //image upload handler
    event.preventDefault();
    if (!this.state.selectedFile) { //if there's no file, throw error
      alert("Please provide a photo")
    } else { //otherwise submit file to server
      const formData = new FormData()
      formData.append('photo', this.state.selectedFile, this.state.selectedFile.name);

      API.postImage(formData) 
        .then(function(res) {
          console.log(res.data);
      });

      this.resetForm();
    }
  }

  render() {
    return (
      <TestImageUpload 
        fileChangedHandler={this.fileChangedHandler}
        uploadHandler={this.uploadHandler}
      />
    );
  }
}
  
export default TestImageSubmit;