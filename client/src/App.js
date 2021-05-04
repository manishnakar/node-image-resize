import React, {useState} from 'react'

function App() {

    const [fileData, setFileData] = useState()

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0])
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', fileData)

        fetch("http://localhost:3000/upload", {
            method: 'POST',
            body: data
        })
        .then((result) => {
            console.log("file sent successful")
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div className="app">
            <h1>React File upload</h1>
            <form onSubmit={onSubmitHandler} enctype='multipart/form-data'>
                <input type='file' onChange={fileChangeHandler} name='image' />
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default App
