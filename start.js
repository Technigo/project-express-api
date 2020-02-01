// start.js
import app from './server';
const port = process.env.PORT || 8080;
// Start the server
app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server running on http://localhost:${port}`);
});
