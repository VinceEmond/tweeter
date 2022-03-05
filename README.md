<h1 align="center">TinyApp</h1>

## Table Of Contents

- [About](#about)
  - [Major Learnings](#major-learnings)
  - [Notable Features](#notable-features)
- [Visuals](#visuals)
  - [Screenshots](#screenshots)
  - [GIFs](#gifs)
- [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
- [Purpose](#purpose)

# About

Tweeter is a simple, single-page Twitter clone built upon an existing back-end provided by LHL during the Web Dev Bootcamp to practice HTML, CSS, JS, jQuery and AJAX front-end skills.

## Major Learnings:
1. Wrote CSS style sheets from the ground-up
2. Utilized both jQuery and AJAX to modify content on the single page app via Javascript
3. Implemented a layout shifter responsive design using media queries
4. Implemented external libraries such as timeago and fontawesome via CDNJS

## Notable Features
* Clicking "new tweet" in the navigation bar scrolls to the top and automatically sets focus to the text box
* Secondary red "back to top button" appears when scrolling further down the tweets
* Can submit a tweet by pressing the enter key (no need to click submit)
* Tweets have subtle shadows and color changes on hover
* Character counter turns red and prevents tweet submittion after 140 characters
* Limited minimum window size to avoid deformation on very small screens

# Visuals

## Screenshots

* Desktop Layout
!["Desktop Layout"]()

* Tablet Layout
!["Screenshot of new URL page"]()

* Phone Layout
!["Screenshot of URL Index page"]()

* Errors
!["Screenshot of URL show page"]()


## GIFs
* Responsive Design

![Desktop to Tablet and Back]()

* Submitting A New Tweet

![Submitting A New Tweet]()

* Tweet Validation Error

![Tweet Validation Error]()


* Subtle Hover Effects

![Subtle Hover Effects]()


# Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.


## Dependencies

- Express
- Node 5.10.x or above


# Purpose

This application was created as an assignment project for **Lighthouse Labs' Web Development Bootcamp** by [Vince Emond](https://github.com/VinceEmond).