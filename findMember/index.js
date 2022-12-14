require("dotenv").config();
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MC_KEY,
  server: process.env.MC_SERVER,
});

module.exports = async function (context) {
  // Obtain the listId and email from the context object
  const listId = context.bindingData.params[0];
  const body = context.bindingData.params[1]
  const email = body.object.user.email;

  try {
    // Use the mailchimp client to see if a member exists in the list
    const response = await client.lists.getListMember(listId, email);
    return response;
  } catch (err) {
    // If the member doesn't exist, return null
    return null;
  }
};
