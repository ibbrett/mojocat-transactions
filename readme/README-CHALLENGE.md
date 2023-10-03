# Synctera Front End Challenge

This project is a 'blank slate' environment but feel free to change/adjust/adapt anything you want. Pressing "Run" will compile the client-side code, and serve them via a small Express server.

The Express server has a `GET /transactions` endpoint. Take a look at the data it serves - this is your data source for the challenge. Use this data source to present a pleasant, professional and informative front-end experience.

## Story #1

### Background

A user wants to review a list and details about card transactions in the system.

### Requirements

Implement a view of transactions and a modal that allows to view transaction details.

- Display all transactions in a table
- Use a loading indicator until the data is ready to be presented.
- When a row is selected a modal should appear with the transaction details for that row.

## Story #2

### Background

A user wants to see transactions based on specific filters

### Requirements

Modify the express server to add data sources for the following:

- Top 10 merchants
- Top 10 by amount
- Top categories by amount

Then, add a dropdown the the UI to view transactions based on these options.

## Questions (long answer either in this document or a separate markdown file)

- What would be some of the performance considerations for this application with hundreds of users? Thousands? Millions?
- How would you think about the privacy of the data being explored in this application?
- From a security perspective how would you propose to manage the authentication and authorization of the end user for this application?

## Other Requirements and Tips

- Decide on a layout which is simple and yet effective: demonstrate your user experience sensibilities but don't over-index on making this a pixel-perfect interface; we are wanting to get a sense of coding style and approach
- We care more about completeness than perfection, manage your time accordingly
- You can import any third party library provided that the license allows free use
- The project should be run in this 'repl.it' environment and should execute when the 'run' button is invoked
- Any documentation or comments can be added in the code or as standalone markdown files
