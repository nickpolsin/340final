package main

// These are your imports / libraries / frameworks
import (
	// this is Go's built-in sql library
	"database/sql"
	"log"
	"net/http"
	"os"

	// this allows us to run our web server
	"github.com/gin-gonic/gin"
	// this lets us connect to Postgres DB's
	_ "github.com/lib/pq"
)

func insertArticle() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	var errd error
	// here we want to open a connection to the database using an environemnt variable.
	// This isn't the best technique, but it is the simplest one for heroku
	db, errd = sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if errd != nil {
		log.Fatalf("Error opening database: %q", errd)
	}
	router := gin.New()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("static/*")
	router.Static("/static", "static")

	router.GET("/new-article.html", func(c *gin.Context) {
		c.HTML(http.StatusOK, "new-article.html", nil)
	})

	router.POST("/Qnew-article", func(c *gin.Context) {
		publisher := c.PostForm("publisher")
		authorfirstname := c.PostForm("authorfirstname")
		authorlastname := c.PostForm("authorlastname")
		datepublished := c.PostForm("datepublished")
		link := c.PostForm("link")
		title := c.PostForm("title")
		db.Query("INSERT INTO article (publisher, authorfirstname, authorlastname, datepublished, link, title) VALUES ($1, $2, $3, $4, $5, $6);", publisher, authorfirstname, authorlastname, datepublished, link, title)
		c.Data(http.StatusOK, "text/html", []byte("New Account Created"))
	})
}
