import { useState, useContext } from "react";
import UserContext from "../../../context/User/User";

export default function CreateOrg(props) {
  const [orgName, setOrgName] = useState('')
  const [image, setImage] = useState('')
  const [disabled, setDisabled] = useState(true)
  const token = useContext(UserContext)

  const handleInputChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    if (name === "orgName") setOrgName(value)
    if (name === "orgName") value.split('').length >= 4 ? setDisabled(false) : setDisabled(true)
    if (name === "image") setImage(event.target.files[0])
  }
  const submit = (event) => {
    event.preventDefault()
    const formElement = document.querySelector('form');
    const formData = new FormData();
    const formElements = formElement.elements;
    const file = image;
    let data = {};
    data['name'] = orgName;
    data['creatorId'] = token.user.user.email;
 
    formData.append(`files.image`, file, file.name);
    formData.append('data', JSON.stringify(data));
    props.submission(formData);
  }

  return(
    <div>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="orgName" className="form-label">Organization Name</label>
          <input type="string" className="form-control" id="orgName" aria-describedby="orgName" name="name" onChange={handleInputChange} />
          <div id="passwordHelpBlock" className="form-text">
            Organization Name must be at least 4 characters long.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input type="file" className="form-control" id="image" name="image" onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={disabled}>Submit</button>
      </form>
    </div>
  )
}