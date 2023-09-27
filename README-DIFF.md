# Thoughts

Thoughts about developing this prototype

## What would you do additionally or different?

I would like to manage style and theme  
To this end I thought about using styled components and adding sass to define a theme, centrally locate a siongle source of truth for style values like color, spacing, fonts, etc.  
Ultimately, I decided against this to stick to the instruction to not "over-index" this challenge. Instead, I'm modifying what's already in place, making use of the static app.css file. 

## overall design aesthetic

- Instead of adding a lot of colors and fonts I'm opting to keep the interface "clean" and simple. 
- I did not add considerations for ADA

## Where I spent my time 

Tuesday
- building functionality fetching/filtering valid data 
- build transactions table 
- build transaction detail modal 
- changed font to sans-serif, added an exit icon to modal with some color

Wednesday 
- restyle transactions table (my original use of colors was too busy and ugly IMHO), sticking with mostly monochromatic theme 
- completed story 1: display transactions in table, show loading indicator, display modal when transaction selected
- start story 2: modify express endpoints, then add client-side ability to select new endpoints

### server endpoints 

- running into a lot of interesting data issues, which are fun to solve: top 10 merchants is top 11 b/c of tie, top 10 by amount credit is really top 1, adding numbers results is long floats, etc ...


### server data source: Top 10 merchants

interpreted this to mean top 10 merchants by number of transactions  

#### valid endpoints 

```json
http://localhost:3000/transactions/top-by-amount/description/debit/5
```

### server data source: Top 10 by amount

### server data source: Top categories by amount
