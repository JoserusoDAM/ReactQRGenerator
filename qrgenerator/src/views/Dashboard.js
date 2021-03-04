// React
import React, { useState, useEffect, useRef } from 'react'
// Material table
import MaterialTable from 'material-table'
// Utils
import { getAllQRUrl, deleteQRUrl } from './../utils/qrcode'
// Material UI
import { Button } from '@material-ui/core'
import MaterialUIButton from '../components/MaterialUIButton'
import { makeStyles } from "@material-ui/core/styles";
import CropFreeIcon from '@material-ui/icons/CropFree';
// Material UI Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// QR code
import QRCode from "qrcode.react"
import AddQRcode from '../components/AddQRcode'
// Import image
import { exportComponentAsJPEG } from 'react-component-export-image';
import ButtonAppBar from '../components/ButtonAppBar'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
    buttonContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent:"flex-start",
        marginLeft: 10
    }
}));

function Dashboard() {

    const classes = useStyles();

    // url states
    const [listData, setListData] = useState([])
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')

    // DialogQR states and handlers
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Download image
    const imageRef = useRef();
    const saveImage = () => {
        exportComponentAsJPEG(imageRef, {fileName: name})
        setOpen(false)
    }

    // Dialog insert register states and handlers
    const [addQR, setAddQR] = useState(false);
    const handleOpenQR = () => {
        setAddQR(true);
    };

    const handleCloseQR = () => {
        setAddQR(false);
    };

    const okCallback = (data) => {
        data && Array.isArray(data) && data.map(datos =>
            console.log({
                id: datos.id,
                name: datos.name,
                url: datos.url
            }))
        setListData(data)    
    }

    const okCallbackDelete = () => {  
        console.log("OK")
    }

    const notOkCallback = (statusCode) => {
        console.log(statusCode)
        alert("Error "+statusCode)
    }

    const errorCallback = (error) => {
        console.log(error)
        alert("Error "+error)
    }

    // api call
    useEffect(() => {
        getAllQRUrl(okCallback, notOkCallback, errorCallback)
    }, [addQR])


    return (
        <div style={{ maxWidth: '100%' }}>
        <ButtonAppBar />
        <div className={classes.buttonContainer}>
            <MaterialUIButton
                className={classes.button}
                variant="contained"
                color="primary"
                text="Añadir registro"
                onClick={handleOpenQR}
            />
        </div>
            
            <MaterialTable
                columns={[
                    { title: 'Nombre', field: 'name' },
                    { title: 'URL', field: 'url' },
                ]}
                data={listData && Array.isArray(listData) ? listData : []}
                title="Registros"
                localization={{
                    header: {
                        actions: "Acciones"
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: "Filas"
                    },
                    body: {
                        emptyDataSourceMessage: "No hay registros aun"
                    },
                    toolbar: {
                        searchPlaceholder: "Buscar",     
                    }
                }}
                actions={[
                    {
                        icon: () => <CropFreeIcon />,
                        tooltip: 'Generar código QR',
                        onClick: (event, rowData) => {
                            handleClickOpen()
                            setUrl(rowData.url)
                            setName(rowData.name)
                            console.log(rowData.url)
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Borrar registro',
                        onClick: (event, rowData) => {
                            deleteQRUrl(rowData.id, okCallbackDelete,
                                notOkCallback, errorCallback)
                            getAllQRUrl(okCallback, notOkCallback, errorCallback)
                        }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    searchAutoFocus: true
                }}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Se ha generado este código QR"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" 
                    style= {{
                    marginLeft: 80 
                    }}
                    ref={imageRef}>
                        <QRCode value={url} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cerrar
                    </Button>
                    <Button onClick={saveImage} color="primary" autoFocus>
                        Guardar código
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={addQR}
                onClose={handleCloseQR}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Añadir registro"}</DialogTitle>
                <DialogContent>
                    <AddQRcode closeModal={handleCloseQR} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseQR} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Dashboard