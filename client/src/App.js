import React, {useState} from 'react'

function App() {

    const [fileData, setFileData] = useState();
    const [fileError, setFileError] = useState();
    const [fileSuccess, setFileSuccess] = useState();

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0])
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', fileData)

        await fetch("http://localhost:5000/upload", {
            method: 'POST',
            body: data
        })
        .then((response) => response.json())
        .then((result) => {
            setFileSuccess("file sent successful")
            console.log(result)
        })
        .catch((err) => {
            setFileError(err.message)
            console.log(err.message)
        })
    }

    return (
        <div className="app">
            <h1>React File upload</h1>
            { fileError ? <p className="error">fileError</p> : '' }
            { fileSuccess ? <p className="success">fileSuccess</p> : '' }
            <form onSubmit={onSubmitHandler} enctype='multipart/form-data'>
                <input accept="image/png, image/jpeg" type='file' onChange={fileChangeHandler} name='image' />
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default App
