import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// React Router
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: 10
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  // TODO: LogOut function

  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("token")
    history.push("/")
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Generador de códigos QR
          </Typography>
          <Button color="inherit"
          onClick={logOut}
          > <ExitToAppIcon className={classes.button} /> Desconectarse</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
