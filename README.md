# Mailchimp Tagging Function

This Azure Durable Function leverages the Mailchimp Node.js client library to:

1. Query the Mailchimp API and check that a user exists in an audience list.
2. Add a tag to the selected user's account in Mailchimp.

## Setup

* Ensure that a listId is passed as a query parameter in the initial HTTP request that triggers the service. 
  * Reference the httpStarter index.js file to note where the listId is pulled from a listId query parameter. If desired, you can reconfigure how the listId is passed to the service.
* Use environment variables to pass a Mailchimp API key and server designation to the Mailchimp node client. 
* Since this service is currently used for tagging users who purchase courses from Teachable, the tag is simply the name of the course as defined by the webhook request body from the trigger HTTP request from Teachable. 
  * If you want to apply a different tag name, you will need to reconfigure the tagName variable in the addTag index.js file.

## Key Dependencies

* Mailchimp official Node.js client library: <https://github.com/mailchimp/mailchimp-marketing-node>
* dotenv to load environment variables from a .env file: <https://github.com/motdotla/dotenv>