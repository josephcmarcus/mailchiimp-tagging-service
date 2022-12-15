const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const activityPayload = {
      listId: context.df.getInput().listId,
      body: context.df.getInput().body.shift(),
    };

    // Orchestrator calls the functions below
    const findMemberResult = yield context.df.callActivity("findMember", activityPayload);
    const addTagResult = yield context.df.callActivity("addTag",findMemberResult);
   return addTagResult;
});