package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
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
	Firstname        string `json:"first_name"`
	Lastname         string `json:"last_name"`
	Partyaffiliation string `json:"party"`
	Occupation       string `json:"occupation"`
}

// Quote stores policyname and actual quote text
type Quote struct {
	Firstname  string `json:"first_name"`
	Lastname   string `json:"last_name"`
	Policyname string `json:"policy"`
	Quote      string `json:"quote"`
}

// Article stores attributes needed for articles
type Article struct {
	Publisher       string `json:"publisher"`
	Authorfirstname string `json:"author_fn"`
	Authorlastname  string `json:"author_ln"`
	Datepublished   string `json:"pub_date"`
	Link            string `json:"link"`
	Title           string `json:"title"`
}

// CandidateSimple stores only candidate name and delegate count
type CandidateSimple struct {
	Lastname             string `json:"last_name"`
	Pledgeddelegatecount string `json:"count"`
}

func getCounts() []CandidateSimple {
	var simpleCandidates []CandidateSimple

	rows, err := db.Query("SELECT lastname, pledgeddelegatecount FROM candidate;")
	if err != nil {
		return nil
	}

	for rows.Next() {
		// for each row, we create an empty Location object
		var simpleCandidate CandidateSimple

		// go can scan the columns returned from the select directly into the properties from our object
		// we need &loc.xxx so that scan can update the properties in memory (&loc.Name means address of the Name property for this instance of loc)
		err = rows.Scan(&simpleCandidate.Lastname, &simpleCandidate.Pledgeddelegatecount)
		if err != nil {
			return nil
		}
		// append each intermediate loc to our array
		simpleCandidates = append(simpleCandidates, simpleCandidate)
	}
	rows.Close()

	return simpleCandidates
}

func getArticles() []Article {
	var articles []Article

	rows, err := db.Query("SELECT publisher, authorfirstname, authorlastname, datepublished, link, title FROM article;")
	if err != nil {
		return nil
	}

	for rows.Next() {
		// for each row, we create an empty Location object
		var article Article

		// go can scan the columns returned from the select directly into the properties from our object
		// we need &loc.xxx so that scan can update the properties in memory (&loc.Name means address of the Name property for this instance of loc)
		err = rows.Scan(&article.Publisher, &article.Authorfirstname, &article.Authorlastname, &article.Datepublished, &article.Link, &article.Title)
		if err != nil {
			return nil
		}
		// append each intermediate loc to our array
		articles = append(articles, article)
	}
	rows.Close()

	return articles
}

func getQuotes() []Quote {
	var quotes []Quote

	rows, err := db.Query("SELECT candidate.firstname, candidate.lastname, policyname, quote FROM candidatepolicy NATURAL JOIN candidate;")
	if err != nil {
		return nil
	}

	for rows.Next() {
		// for each row, we create an empty Location object
		var quote Quote

		// go can scan the columns returned from the select directly into the properties from our object
		// we need &loc.xxx so that scan can update the properties in memory (&loc.Name means address of the Name property for this instance of loc)
		err = rows.Scan(&quote.Firstname, &quote.Lastname, &quote.Policyname, &quote.Quote)
		if err != nil {
			return nil
		}
		// append each intermediate loc to our array
		quotes = append(quotes, quote)
	}
	rows.Close()

	return quotes
}

// keeping it simple we'll hard code the query
func getCandidates() []Candidate {
	// Store the results

	var candidates []Candidate
	// For simplicity the search area is hardcoded rather than coming from the user

	rows, err := db.Query("SELECT firstname, lastname, partyaffiliation, occupation FROM candidate;")
	if err != nil {
		return nil
	}

	for rows.Next() {
		// for each row, we create an empty Location object
		var candidate Candidate

		// go can scan the columns returned from the select directly into the properties from our object
		// we need &loc.xxx so that scan can update the properties in memory (&loc.Name means address of the Name property for this instance of loc)
		err = rows.Scan(&candidate.Firstname, &candidate.Lastname, &candidate.Partyaffiliation, &candidate.Occupation)
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

func quotesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	default: // We're only supporting GET in this incarnation
		quotes := getQuotes()

		// This struct holds all of the context that my index template needs to render
		context := struct {
			Quotes []Quote `json:"quotes"`
		}{
			quotes,
		}

		jsonified, err := json.Marshal(context)
		if err != nil {
			panic(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonified)
	}

}

func articlesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	default: // We're only supporting GET in this incarnation
		articles := getArticles()

		// This struct holds all of the context that my index template needs to render
		context := struct {
			Articles []Article `json:"articles"`
		}{
			articles,
		}

		jsonified, err := json.Marshal(context)
		if err != nil {
			panic(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonified)
	}

}

func countsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	default: // We're only supporting GET in this incarnation
		counts := getCounts()

		// This struct holds all of the context that my index template needs to render
		context := struct {
			Candidates []CandidateSimple `json:"candidates"`
		}{
			counts,
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
	http.HandleFunc("/Qquotes", quotesHandler)
	http.HandleFunc("/Qarticles", articlesHandler)
	http.HandleFunc("/Qcounts", countsHandler)
	server.ListenAndServe()

	fmt.Printf("%s", "In main.go")

	scrapeNews()

	fmt.Printf("%s", "In main.go")
}
