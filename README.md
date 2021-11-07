# Foodies: Green Buffet project

## Team Members
- Andrey
- Kira
- Venetia
- Viviane
- Alexander

## Tech Used
- Dishtracker API
- Website hosted on Exoscale

Website:
http://194.182.171.170/
(Firefox is recommended)

## Detailed Solution Architecture 

- Apache2 Web Server on Ubuntu Server VM Hosted on 
  a 'Tiny' VM on Exoscale
  
- Static Website 
  - Dishtracker API
  - Bootstrap CSS
  - Chart.js
  
- We used the Dishtracker Self-Service Application to register
  different Food Items with the Instance.
  - Corny (+variants)
  - Red Bull (+variants)
  - We learned that it works at a fixed distance
  - We learned which items work well and which are difficult
  - From our Experience, it is better to have:
    - low variance in the appearance of the food item
    - no overlap between food items
    - a flat surface of a distinct color which the food items sit on
  
- We learned about the 2 stage classification in the Dishtracker
  and how to register new food items with the correct prefix.

- The database will be recorded by Dishtracker (history of consumption)
- Database processing
  - pandas
  - numpy (calculating statistics)
  - xgboost (predictions)

## Acknowledgements

- Alex from Dishtracker helped us with the Setup - thank you 
