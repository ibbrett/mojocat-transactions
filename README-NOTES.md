# Notes

Thoughts about developing this prototype

## Considerations. What did you do? What would you do additionally or different?

- I typically like to centralize and manage style with a clearly defined theme. I added sass for local build. However, this was marginally effective for this prototype. I would prefer to define a theme (color palette, fonts, spacing, sizes) with a more sophisticated method.
- I thought about using styled components. Sematically and intuitively it is more readable. Ultimately, I decided against this approach to stick to the instruction to not "over-index" this challenge. Instead, I'm modifying what's already in place, making use of the static app.css file, which is easier to cache, I also wanted to limit the need for JavaScript style hydrating at the client. 
- Instead of adding a lot of colors, fonts, icons I opted to keep the interface "clean" and simple. 
- I did not add considerations for ADA.
- I did not add sorting for columns.
- I wanted the transaction table to display well at all viewport sizes. I added some basic media queries to help this
- I kept my module imports to a minimum. One exception was adding react-icons, which I only used for the exit icon in the modal

## Where I spent my time 

Tuesday - story 1
- Built functionality fetching/filtering valid data 
- Built transactions table 
- Built transaction detail modal 
- Changed font to sans-serif, added an exit icon to modal with some color

Wednesday - story 2
- Completed story 1: display transactions in table, show loading indicator, display modal when transaction selected
- Restyled transactions table (my original use of colors was too busy and ugly IMHO), sticking with mostly monochromatic theme 
- Modified express endpoints, added client-side ability to select new endpoints
- Note: endpoint objectives a little unclear. For example, not sure about displaying individual records versus aggregating data. Does "top 10 by amount" include both debit and credit? I decided to treat debit and credit separately and creating different results for each.
- I added a few extra transaction records to differentiate credit results between merchants and categories
- I thought about adding ascending/descending sorting but elected not to b/c it wasn't asked for  
- I ran into a lot of interesting data issues, which were fun to solve: top 10 merchants is top 11 b/c of tie, top 10 by amount credit is really top 1, adding numbers results is long floats, etc ...
- I added droplist to UI

Thursday - long answer questions  
- thought about security, performance and privacy 
- cleaned up layout and style

## long answer questions 

### What would be some of the performance considerations for this application with hundreds of users? Thousands? Millions?

The first few things that come to mind is handling load, caching and payloads.  
- First, to reduce the load on our server, services and databases we can make use of caching, API caching, using CDNs for static assets.  
- Second, we can design our requests and responses efficiently to limit our payloads to send only what we need over the wire. This is one of the reasons we switched from XML to JSON, or why some setups make use of graphQL. In general, don't add data or structure to the payload that isn't needed or used.
- Third, in a cloud environment, we have tools like Kubernetes to help with increased loads/requests. Kubernetes has the ability to add/remove pods and containers to manage heavier/lighter request loads to ensure a server doesn't get overloaded. 

### How would you think about the privacy of the data being explored in this application?

In general, keeping this financial data, much like medical data, is extremely important to keep private. Users want to feel confident their data isn't accessible by unauthorized parties. In other words, we can't expose an API with this data to the public. We need to lock down the API to only allow authenticated users with the granted level of authorization to view this data.

### From a security perspective how would you propose to manage the authentication and authorization of the end user for this application?

This depends on how/where this app is served. For example, if we are serving this in AWS, we could use Cognito and JWTs to limit access only to authenticated/authorized users.
