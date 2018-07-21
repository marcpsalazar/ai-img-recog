import React from "react";

const TestImageUpload = props => (
  <form>
    <div class="form-group" method="post" enctype="multipart/form-data" onChange={props.fileChangedHandler}>
      <label for="exampleFormControlFile1">Test image input</label>
      <input type="file" class="form-control-file" accept="image/*" id="exampleFormControlFile1"/>
      <input type="submit" value="Upload" onClick={props.uploadHandler}/>
    </div>
  </form>
);
  
export default TestImageUpload;