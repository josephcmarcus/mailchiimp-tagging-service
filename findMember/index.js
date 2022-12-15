require("dotenv").config();
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MC_KEY,
  server: process.env.MC_SERVER,
});

module.exports = async function (context) {
  // Obtain the listId, request body from the activityPayload object
  const { listId, body } = context.bindingData.args;
  // Obtain the email from the request body
  const email = body.object.user.email;
  try {
    // Use the mailchimp client to see if a member exists in the list
    // If the member exists, get the subscriberHash and return it along with the listID and body
    const result = await client.lists.getListMember(listId, email);
    const response = {
      listId: listId,
      body: body,
      subscriberHash: result.id,
    }
    return response;
  } catch (err) {
    context.log(err);
    return null;
  }
};
