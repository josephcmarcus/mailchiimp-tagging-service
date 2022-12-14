/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

require("dotenv").config();
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MC_KEY,
  server: process.env.MC_SERVER,
});

module.exports = async function (context) {
  // Obtain the listId and email from the context object
  const listId = context.bindingData.name[0];
  const email = context.bindingData.name[1].shift().object.user.email;

  try {
    // Use the mailchimp client to see if a member exists in the list
    const response = await client.lists.getListMember(listId, email);
    // if the member exists, return the response
    return response;
  } catch (err) {
    // If the member doesn't exist, return null
    return null;
  }
};
