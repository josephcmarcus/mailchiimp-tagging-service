/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 *
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  const listId = context.df.getInput().listId;
  const body = context.df.getInput().body.shift();
  const activityPayload = [];
  activityPayload.push(listId, body);

  const findMemberResult = yield context.df.callActivity(
    "findMember",
    activityPayload
  );
  if (findMemberResult !== null) {
    const addTagResult = yield context.df.callActivity(
      "addTag",
      activityPayload
    );
    return addTagResult;
  }
  return `Could not add tag '${bo}' `
});
