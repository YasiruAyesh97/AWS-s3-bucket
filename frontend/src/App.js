import { useState } from 'react'
import axios from 'axios'
import { ReactVideo } from "reactjs-media";
import './App.css'

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('http://localhost:8080/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}




function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="video/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}
      //file name - d4338541a40be81d1c91633f49a9b42d
      <img src="http://localhost:8080/images/d4338541a40be81d1c91633f49a9b42d"></img>
      <div>
        //cloudfront Distribution domain name
        <ReactVideo
            src="cloudfront_distribution_domain_name/docker.mp4"
            primaryColor="red"
            // other props
        />
      </div>
    </div>
  );
}

export default App;
