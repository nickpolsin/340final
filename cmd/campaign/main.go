package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

var (
	db *sql.DB
)

// Candidate stores coordinates as numeric strings
type Candidate struct {
	FirstName        string `json:"first_name"`
	LastName         string `json:"last_name"`
	PartyAffiliation string `json:"party"`
	Occupation       string `json:"occupation"`
}

// keeping it simple we'll hard code the query
func getCandidates() []Candidate {
	// Store the results

	var candidates []Candidate
	// For simplicity the search area is hardcoded rather than coming from the user

	rows, err := db.Query("SELECT firstname, lastname, partyaffiliation FROM candidate;")
	if err != nil {
		return nil
	}

	for rows.Next() {
		// for each row, we create an empty Location object
		var candidate Candidate

		// go can scan the columns returned from the select directly into the properties from our object
		// we need &loc.xxx so that scan can update the properties in memory (&loc.Name means address of the Name property for this instance of loc)
		err = rows.Scan(&candidate.FirstName, &candidate.LastName, &candidate.PartyAffiliation, &candidate.Occupation)
		if err != nil {
			return nil
		}
		// append each intermediate loc to our array
		candidates = append(candidates, candidate)
	}
	rows.Close()

	return candidates
}

// This handler will take care of GET and POST requests
func candidatesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	default: // We're only supporting GET in this incarnation
		candidates := getCandidates()

		// This struct holds all of the context that my index template needs to render
		context := struct {
			Candidates []Candidate `json:"candidates"`
		}{
			candidates,
		}

		jsonified, err := json.Marshal(context)
		if err != nil {
			panic(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonified)
	}

}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}
	var errd error
	db, errd = sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if errd != nil {
		log.Fatalf("Error opening database: %q", errd)
	}

	server := http.Server{
		Addr: ":" + port,
	}
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/Qbios", candidatesHandler)
	server.ListenAndServe()
}
