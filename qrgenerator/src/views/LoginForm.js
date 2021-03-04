// React
import React, { useState, useEffect } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// Assets
import BACKGROUND from './../assets/background.jpg';
// Components
import InputWithIcon from "../components/InputWithIcon";
import PasswordInput from "../components/PasswordInput";
import MaterialUIButton from "../components/MaterialUIButton";
// Utils
import EmailValidator from "email-validator";
// React Router
import { useHistory } from "react-router-dom";
// Auth
import { loginUser } from "./../utils/auth"

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${BACKGROUND})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: "100vh"
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    minWidth: 312,
    maxWidth: 312,
    margin: "auto"
  },
  alert: {
    marginTop: theme.spacing(1),
  },
  media: {
    height: 150,
    width: 150,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function LoginForm() {
  const [mailInput, setMailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  let history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    localStorage.getItem("token") !== null && history.push("/dashboard")
  }, [])

  const onHandleSubmit = () => {
    if (!EmailValidator.validate(mailInput)) {
      setErrorMessage("Por favor introduzca un email válido.");
      setDisplayErrorMessage(true);
    } else if (!passwordInput) {
      setErrorMessage("Por favor introduzca una contraseña.");
      setDisplayErrorMessage(true);
    }
    else {
      sendLoginRequest()
    }
  };

  const sendLoginRequest = () => {
    const notOkCallback = (statusCode) => {
      if (statusCode >= 500) {
        alert("Algo fue mal en el servidor, intentelo más tarde")
        setErrorMessage("Algo fue mal en el servidor, intentelo más tarde")
      } else {
        setErrorMessage("Email o contraseña inválidos")
      }
      setDisplayErrorMessage(true)
    }

    const errorCallBack = (error) => {
      setErrorMessage("Error de red")
      setDisplayErrorMessage(true)
    }

    const okCallBack = () => {
      history.push("/dashboard")
      console.log("Todo correcto")
    }

    loginUser(mailInput, passwordInput, okCallBack, notOkCallback, errorCallBack)
  }


  return (
    <div className={classes.background}>
      <Card className={classes.card} variant="elevation">
        <CardHeader title="Bievenido al generador de códigos QR" />
        <CardContent>
          <FormControl className={classes.margin}>
            {/* Inputs */}
            <InputWithIcon
              autoFocus={true}
              icon={<AccountCircle />}
              position={"start"}
              onChange={setMailInput}
              value={mailInput}
            />
            <PasswordInput
              icon={<LockOpenIcon />}
              position={"start"}
              value={passwordInput}
              onChange={setPasswordInput} />
            {/* Error Alert */}
            <Collapse in={displayErrorMessage}>
              <Alert
                className={classes.alert}
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setDisplayErrorMessage(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <Typography>{errorMessage}</Typography>
              </Alert>
            </Collapse>
            {/* Submit button */}
            <MaterialUIButton
              color="primary"
              text="Iniciar Sesión"
              size="large"
              variant="outlined"
              startIcon={<LockOpenIcon />}
              className={classes.button}
              onClick={onHandleSubmit}
            />
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}