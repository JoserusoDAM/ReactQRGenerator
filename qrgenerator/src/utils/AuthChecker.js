import React from "react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";


export default function AuthChecker({ children, history, ...props }) {
  const [authChecked, setAuthChecked] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token")
    if (localToken) {
      var decoded = jwt_decode(localToken);
      if (decoded) {
        const auth = {
          user: decoded && decoded["user"],
          token: localToken,
        };
        console.log("auth ", auth);
        setAuthChecked(true);
      } else {
        setAuthChecked(false);
      }
    } else {
      //IF FAILS RETURN TO LOGIN
      setAuthChecked(false);
    }
  }, []);

  return authChecked === null ? (
    <div>Cargando...</div>
  ) : authChecked ? (
    children
  ) : (
    <Redirect to="/" />
  );
}
