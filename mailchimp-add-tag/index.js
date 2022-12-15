const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  try {
    // const listId = context.df.getInput().listId;
    // const body = context.df.getInput().body.shift();
    // const activityPayload = [];
    // activityPayload.push(listId, body);
    const activityPayload = {
      listId: context.df.getInput().listId,
      body: context.df.getInput().body.shift(),
    }

    // Orchestrator calls the functions below

    const findMemberResult = yield context.df.callActivity("findMember", activityPayload);
    if (findMemberResult !== null) {
      const addTagResult = yield context.df.callActivity( "addTag", findMemberResult);
      return addTagResult;
    }
    context.log(
      `Could not add tag '${body.object.course.name}' to email '${body.object.user.email}' because of the following error: ${findMemberResult}`
    );
  } catch (err) {
    context.log(`Could not complete the operation because of the following error: ${err}`);
    return 'Error. Failed at orchestration. Please check the logs.';
  }
});
