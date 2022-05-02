import express from "express";
import cors from "cors";

 import udemyCourse from "./data/udemy-course.json"


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


//In this case, I want to get and display only web development courses

const webDevelopmentCourse = udemyCourse.filter(item => item.subject === 'Web Development');
const web = webDevelopmentCourse[0].published_timestamp;
console.log(typeof new Date(web).getFullYear())

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(webDevelopmentCourse);
});



// Return course data according to the course's title
app.get("/courseTitle/:title", (req, res) => {
  const titleData = webDevelopmentCourse.find(course => course.course_title === req.params.title);

  if(!titleData) {
    res.status(404).json("Can't find any course under this title")
  }

  res.json(titleData);
})

// Return course data according to the course's id
app.get("/courseId/:id", (req, res) => {
  const courseId = +req.params.id
  const courseIdData = webDevelopmentCourse.find(course => course.course_id === courseId);

  res.json(courseIdData);
})

// Return courses according to year 
app.get("/courseYear/:year", (req, res) => {
  const courseYear = +req.params.year;
  const courseYearData = webDevelopmentCourse.filter(course => courseYear === new Date(course.published_timestamp).getFullYear());
 
  if( courseYearData.length === 0 ) {
    res.status(404).json("Sorry, no year matched. Please try another year")
  }
  res.json(courseYearData)
})

//Return the most review courses
app.get("/mostReviews", (req, res) => {
  const mostReviewCourses = webDevelopmentCourse.filter(course => course.num_reviews > 100);
  
  if( mostReviewCourses.length === 0 ) {
    res.status(404).json("Sorry, no course has more than 100 reviews. Please try another time")
  }
  res.json(mostReviewCourses)
})

// Return courses according to levels
app.get("/courseLevel/:level" , (req, res) => {
  const courseLevel = webDevelopmentCourse.filter(course => course.level === req.params.level);
  
  if(courseLevel.length === 0) {
    res.status(404).json("Sorry, there is no course with this level. Please enter correct level name")
  }
  res.json(courseLevel);
})

// Return free courses
app.get("/paidCourse/:paid", (req, res) => {
  const paidCourse = webDevelopmentCourse.filter(course => {
    if(req.params.paid === 'Free' || req.params.paid === 'Free Courses') {
      return !course.is_paid
    } 
    return course.is_paid
  })
  res.json(paidCourse)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
