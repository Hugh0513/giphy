
// Initial array of movies
var topics = ["adele", "beyonse", "david bowie", "drake", "justin biever", "kanye west", "katy perry", "paul mccartney", "rihanna"];

// Function for dumping the JSON content for each button into the div
function displayTopicInfo() {
  
  $("#gifs-appear-here").empty();

  var topic = $(this).attr("data-name");
  $(".topic").css("background-color", "#c0c0c0");
  $(this).css("background-color", "#808080");

  // Constructing a queryURL using the topic name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  topic + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    console.log(queryURL);

    console.log(response);
    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var topicDiv = $("<div>");
      topicDiv.addClass("gifDiv");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var topicImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      topicImage.attr("src", results[i].images.fixed_height_still.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-state", "still");

      topicImage.addClass("gif");

      // Appending the paragraph and image tag to the topicDiv
      topicDiv.append(p);
      topicDiv.append(topicImage);

      // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(topicDiv);
    }
  
    // Pause or animate clicked image
    $(".gif").on("click", function(event) {
      console.log("image clicked");
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
      }

      if (state === "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
      }

    });

  });

}

// Function for displaying topic data
function renderButtons() {

  // Deleting the buttons prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("topic");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

window.onload = function(event) {
  console.log("loaded");

      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        if (topic !== "") {
          // Adding the movie from the textbox to our array
          topics.push(topic);
          console.log(topics)

          // Calling renderButtons which handles the processing of our movie array
          renderButtons();
        }
        else {
          alert("Input musician name");
        }
      });

      // Function for displaying the musician info
      // Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elements
      $(document).on("click", ".topic", displayTopicInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

};

