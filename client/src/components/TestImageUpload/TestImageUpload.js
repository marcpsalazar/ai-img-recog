import React from "react";

const TestImageUpload = props => (
  <form id="leaf-submit" method="post" encType="multipart/form-data" onChange={props.fileChangedHandler}>
    <div className="form-group">
      <label htmlFor="exampleFormControlFile1">Test image input</label>
      <input type="file" className="form-control-file" accept="image/*" id="exampleFormControlFile1" />
      <input type="submit" value="Upload" onClick={props.uploadHandler}/>
    </div>
  </form>
);
  
export default TestImageUpload;