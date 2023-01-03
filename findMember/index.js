require('dotenv').config();
const client = require('@mailchimp/mailchimp_marketing');

client.setConfig({
  apiKey: process.env.MC_KEY,
  server: process.env.MC_SERVER,
});

module.exports = async function (context) {
  // Obtain the listId and request body from the context argument
  const { listId, body } = context.bindingData.args;
  // Obtain the email from the request body
  const email = body.object.user.email;
  // Query the mailchimp client to see if a member exists in the list
  const result = await client.lists.getListMember(listId, email);
  // Get the subscriberHash and return it with the listID and original req body back to the orchestrator
  const response = {
    listId: listId,
    body: body,
    subscriberHash: result.id,
  };
  return response;
};
