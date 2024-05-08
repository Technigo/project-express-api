import React from "react"
import "./homePage.css"

import "./App.css"

function HomePage() {
  return (
    <div>
      <div className="Page">
        <div className="Titlepage">
          <h1>Welcome to Avocado Haven!</h1>
        </div>

        <div className="Pone">
          <p>
            Are you an avo-enthusiast looking to dive into the world of creamy
            goodness and green delights? Look no further! Avocado Haven is your
            one-stop destination for all things avocado.
          </p>
        </div>
        <img
          src="/pexels-any-lane-5945640.jpg"
          alt="Avocado"
          className="HomePage-image"
        />
        <div className="Ptwo">
          <p>
            Join us as we embark on a journey through the luscious lands of
            top-selling avocado areas, where each bite promises to take you
            closer to guac heaven. From the ripest and creamiest picks to the
            cheapest and most budget-friendly options, our avocado emporium has
            it all! So grab your toast, sharpen your knives, and get ready to
            avo-good time with us. Avocado Haven: where every day is a ripe
            opportunity to celebrate the avocado obsession!{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
