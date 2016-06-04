package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func scrapeNews() {

	log.Printf("%s", "Hello World!")

	// initialize the database
	defer db.Close()
	log.Printf("%s", "Database defer closed")

	// Prepare the insert statement to for use later in the program
	stmt, err := db.Prepare("INSERT INTO article (publisher, authorfirstname, authorlastname, datepublished, link, title) VALUES (?, ?, ?, ?, ?, ?);")
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("%s", "Insert prepared")

	// read the response
	resp, err := http.Get("http://www.nytimes.com/interactive/2016/us/elections/election-2016.html")
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%s", "get NY Times")
	// we are always expected to close out the body of a response when using the net/http package.
	defer resp.Body.Close()

	// initiate GoQuery from the response
	doc, err := goquery.NewDocumentFromResponse(resp)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%s", "database queried")

	// find DOM containers with the blog_article CSS class and loop over selection
	doc.Find(".g-story").Each(func(i int, s *goquery.Selection) {

		// extract individual fields with GoQuery helpers
		hed := s.Find(".g-story-hed")
		title := hed.Find("a").Text()
		link, _ := hed.Find("a").Attr("href")
		author := s.Find(".g-byline").Text()
		datepublished, _ := hed.Find("a").Attr("href")
		publisher := "New York Times"

		author = strings.Split(author, "By, ")[1]
		authorNames := strings.Split(author, " ")
		authorfirstname := authorNames[0]
		authorlastname := authorNames[1]
		dateArr := strings.Split(datepublished, "/")
		datepublished = dateArr[3] + "-" + dateArr[4] + "-" + dateArr[5]

		log.Printf("%s", authorfirstname)
		log.Printf("%s", authorlastname)
		log.Printf("%s", title)
		log.Printf("%s", datepublished)

		// insert the post into the database using the prepared statement
		_, err := stmt.Exec(publisher, authorfirstname, authorlastname, datepublished, link, title)
		if err != nil {
			log.Fatal(err)
		}
	})

	fmt.Println("Completed import")
}
