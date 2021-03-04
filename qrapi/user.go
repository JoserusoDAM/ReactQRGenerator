package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

// User holts User struc
type User struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
}

var userCollection = db().Database("db").Collection("users") // get collection "users" from db() which return *mongo.Client
var secretKey = []byte("gosecretkey")                        // secret token key

func getHash(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)

	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

// GenerateJWT generates a json web token
func GenerateJWT() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		log.Println("Error in JWT token generation")
		return "", nil
	}

	return tokenString, nil
}

// UserSignup sings up a new user
func UserSignup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	var user User
	json.NewDecoder(r.Body).Decode(&user)

	user.Password = getHash([]byte(user.Password))
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, _ := userCollection.InsertOne(ctx, user)

	json.NewEncoder(w).Encode(result)
}

// UserLogin logs in an existin user of the db
func UserLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	var user User
	var dbUser User

	json.NewDecoder(r.Body).Decode(&user)
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&dbUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"+` + err.Error() + `"}`))
		return
	}

	userPass := []byte(user.Password)
	dbPass := []byte(dbUser.Password)

	passErr := bcrypt.CompareHashAndPassword(dbPass, userPass)
	if passErr != nil {
		log.Println(passErr)
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"response":"Wrong password!"}`))
		return
	}

	jwtToken, err := GenerateJWT()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}

	w.Write([]byte(`{"token":"` + jwtToken + `"}`))
}
