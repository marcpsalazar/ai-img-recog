import React from "react";

const TestImageUpload = props => (
  <form id="leaf-submit" method="post" encType="multipart/form-data" onChange={props.fileChangedHandler}>
    <div className="form-group">
      <label htmlFor="exampleFormControlFile1">Test image input</label>
      <input type="file" className="form-control-file" accept="image/*" id="exampleFormControlFile1" onChange={props.onSelectFile}/>
      <input type="submit" value="Upload" onClick={props.handleImageUpload} style={{display: props.displaySubmit}}/>
      <input type="submit" onClick={props.cropImage} style={{display: props.displayCropButton}} value="Crop" />
    </div>
  </form>
);
  
export default TestImageUpload;