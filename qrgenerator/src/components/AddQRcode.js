import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { insertQRUrl } from './../utils/qrcode'
import { Button } from '@material-ui/core';

function AddQRcode({ closeModal = () => { } }) {

    const [name, setName] = useState('');
    const [url, setUrl] = useState('')

    const okCallback = () => {
        closeModal()
        console.log("OK")
    }

    const notOkCallback = (statusCode) => {
        console.log(statusCode)
    }

    const errorCallback = (error) => {
        console.log(error)
    }

    const insertData = (e) => {
        e.preventDefault()
        if ((name.length || url.length) < 0) {
            alert.length("Error")
        } else {
            insertQRUrl({ name, url }, okCallback, notOkCallback, errorCallback)
        }
    }

    return (
        <div>
            <form id="qrform" style={formContainer} onSubmit={insertData}>
                <TextField
                    required
                    autoFocus
                    type="text"
                    placeholder="Nombre"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    type="text"
                    placeholder="Url"
                    fullWidth
                    margin="normal"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button 
                type="submit"
                color="primary"
                style={{marginTop: 20}}
                >Guardar</Button>
            </form>
        </div>
    );
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};


export default AddQRcode;