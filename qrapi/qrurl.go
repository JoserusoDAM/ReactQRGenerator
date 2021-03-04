package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// QRUrl holts QRUrl struc
type QRUrl struct {
	ID   primitive.ObjectID `json:"id" bson:"_id"`
	Name string             `json:"name" bson:"name"`
	URL  string             `json:"url" bson:"url"`
}

// get collection "qrurl" from db wich reutns *mongo.Client
var qrurlCollection = db().Database("db").Collection("qrurl")

// insertQRUrl inserts the name and the url of the qr code
func insertQRUrl(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // for adding Content-type

	var qrurl QRUrl
	err := json.NewDecoder(r.Body).Decode(&qrurl) // storing qrurl variable in type QRUrl
	if err != nil {
		fmt.Printf("Error red %s", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	qrurl.ID = primitive.NewObjectID()

	insertResult, err := qrurlCollection.InsertOne(context.TODO(), qrurl)
	if err != nil {
		fmt.Printf("Error inserting url %s", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println("Inserted a single document: ", insertResult)
	json.NewEncoder(w).Encode(insertResult.InsertedID) // return the mongodb ID of generated document
}

// deleteQRURL delwetes the name and the url of the qr code
func deleteQRURL(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "applycation/json")

	params := mux.Vars(r)["id"]                   // get Parameter value as string
	_id, err := primitive.ObjectIDFromHex(params) // convert params to mongodb Hex ID

	if err != nil {
		fmt.Printf("Error QRURL bad ID %s", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	opts := options.Delete().SetCollation(&options.Collation{}) // to specify language-specific rules for string comparasion such as rules for lettercase
	res, err := qrurlCollection.DeleteOne(context.TODO(), bson.D{{"_id", _id}}, opts)

	if err != nil {
		fmt.Printf("Error deleting QRURL %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Printf("deleted %v documents\n", res.DeletedCount)
	json.NewEncoder(w).Encode(res.DeletedCount) // return number of documents deleted

}

// getAllQRUrl brings all the qruls from the database
func getAllQRUrl(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	var results []QRUrl // slice for multiple documents

	cur, err := qrurlCollection.Find(context.TODO(), bson.D{{}}) // reutnrs a *mongo.Cursor
	if err != nil {
		fmt.Printf("Error not found %s", err)
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	cur.All(context.TODO(), &results)

	cur.Close(context.TODO()) // cloase the cursos once stream of documents has exhausted

	json.NewEncoder(w).Encode(results)
}
