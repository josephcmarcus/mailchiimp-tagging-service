require("dotenv").config();
const md5 = require("md5");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MC_KEY,
  server: process.env.MC_SERVER,
});

module.exports = async function (context) {
  // Obtain the listId, hashedId, and tagName from the context object
  const listId = context.bindingData.args[0];
  const body = context.bindingData.args[1]
  // The hashedId is the MD5 hash of the email address from the context object
  const hashedId = md5(body.object.user.email);
  // The tagName is the name of the course from the context object
  const tagName = body.object.course.name;
  // The tag object takes the tagName above and sets the status to active
  const tag = { tags: [{name: tagName, status: "active"}] }

  try {
    // Use the mailchimp client to add a tag to a member
    const response = await client.lists.updateListMemberTags(listId, hashedId, tag);
    return response;
  } catch (err) {
    // If the member doesn't exist, return null
    return err;
  }
};
