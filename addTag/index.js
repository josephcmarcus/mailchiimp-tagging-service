require("dotenv").config();
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MC_KEY,
  server: process.env.MC_SERVER,
});

module.exports = async function (context) {
  // Obtain the listId, request body, and subscriberHash from the context argument
  const { listId, body, subscriberHash } = context.bindingData.args;
  // Set the name of the tag as the course name from the request body
  const tagName = body.object.course.name;
  // The tag object takes the tagName above and sets the status to active
  const tag = { tags: [{name: tagName, status: "active"}] }
    // Use the mailchimp client to add the tag to the member
    const response = await client.lists.updateListMemberTags(listId, subscriberHash, tag);
    // Return the response to the orchestrator
    return response;
};
