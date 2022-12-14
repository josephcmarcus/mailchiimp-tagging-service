const df = require("durable-functions");

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const instancePayload = {
        "body": req.body,
        "listId": req.query.listId
    }
    const instanceId = await client.startNew(req.params.functionName, undefined, instancePayload);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};