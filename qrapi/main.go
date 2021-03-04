package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {

	route := mux.NewRouter()
	s := route.PathPrefix("/api").Subrouter() // Base Path

	// Routes
	// qrurl routes
	s.HandleFunc("/insertQRUrl", insertQRUrl).Methods("POST")
	s.HandleFunc("/deleteQRURL/{id}", deleteQRURL).Methods("DELETE")
	s.HandleFunc("/getAllQRUrl", getAllQRUrl).Methods("GET")
	// auth routes
	s.HandleFunc("/user/login", UserLogin).Methods("POST")
	//	s.HandleFunc("/user/signup", UserSignup).Methods("POST")   disabled for this proyect

	// For dev only - Set up CORS so React client can consume our API
	corsWrapper := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "DELETE"},
		AllowedHeaders: []string{"Content-Type", "Origin", "Accept", "*"},
	})

	log.Fatal(http.ListenAndServe(":8000", corsWrapper.Handler(s))) // Run Server

}
