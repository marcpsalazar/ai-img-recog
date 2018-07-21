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
  
  uploadHandler = () => { 
    const formData = new FormData()
    formData.append('photo', this.state.selectedFile, this.state.selectedFile.name);
    API.postImage(formData);
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