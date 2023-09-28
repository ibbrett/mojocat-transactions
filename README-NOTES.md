# Notes

Thoughts about developing this prototype

## What would you do additionally or different?

I would like to manage style and theme  
To this end I thought about using styled components and adding sass to define a theme, centrally locate a siongle source of truth for style values like color, spacing, fonts, etc.  
Ultimately, I decided against this to stick to the instruction to not "over-index" this challenge. Instead, I'm modifying what's already in place, making use of the static app.css file. 

## overall design aesthetic

- Instead of adding a lot of colors and fonts I'm opting to keep the interface "clean" and simple. 
- I did not add considerations for ADA
- I did not add sorting for columns
- I wanted the transaction table to display well at all viewport sizes. I added some basic media queries to help this
- I kept my module imports to a minimum, choosing mostly to work with what was already there. One exception was adding react-icons, which I only used for the exit icon
- I added sass for local build. however, I would prefer to define a theme (colors, fonts, spacing, sizes) with a more sophisticated method.
- I also thought about using styled components to manage elements and style. Sematically and intuitively it is more readable. Ultimately, I decided against this to simply add to existing css stylesheet, mainly for performance reasons as JavaScript-defined style has to be hydrated at the client.

## Where I spent my time 

Tuesday - story 1
- building functionality fetching/filtering valid data 
- build transactions table 
- build transaction detail modal 
- changed font to sans-serif, added an exit icon to modal with some color

Wednesday - story 2
- restyle transactions table (my original use of colors was too busy and ugly IMHO), sticking with mostly monochromatic theme 
- completed story 1: display transactions in table, show loading indicator, display modal when transaction selected
- modified express endpoints, added client-side ability to select new endpoints
- endpoint objectives a little unclear: not sure about displaying individual records or aggregating data
- for example "top 10 by amount", does this include both debit and credit? I decided to treat debit and credit separately and creating different results for each
- added a few extra records to differentiate credit results between merchants and categories
- thought about adding ascending/descending sorting but elected not to b/c it wasn't asked for  
- ran into a lot of interesting data issues, which are fun to solve: top 10 merchants is top 11 b/c of tie, top 10 by amount credit is really top 1, adding numbers results is long floats, etc ...
- added droplist to UI

Thursday - long answer questions  
- security 

## long answer questions 

### What would be some of the performance considerations for this application with hundreds of users? Thousands? Millions?

The first few things that come to mind is handling load, caching and payloads.  
- First, to reduce the load on our server, services and databases we can employ API caching.  
- Second, we can design our requests and responses efficiently to limit our payloads to send only what we need over the wire. This is one of the reasons we switched from XML to JSON, or why some setups make use of graphQL. In general, don't add data or structure to the payload that isn't needed or used.
- Third, in a cloud environment, we have tools like Kubernetes to help with increased loads. Kubernetes has the ability to add/remove pods and containers to manage heavier/lighter request loads to ensure a server doesn't get overloaded. 

### How would you think about the privacy of the data being explored in this application?

In general, keeping this financial data, much like medical data, is extremely important to keep private. Users want to feel confident their data isn't accessible by unauthorized parties. In other words, we can't expose an API with this data to the public. We need to lock down the API to only allow authenticated users with the granted level of authorization to view this data.

### From a security perspective how would you propose to manage the authentication and authorization of the end user for this application?

This depends on how/where this app is to be served. For example, if we are serving this in AWS, we could use Cognito and JWTs to limit access only to authenticated/authorized users.

