import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';

async function sendData(snackName: string) {
  const dbClient = new DynamoDBClient({
    region: process.env.AWS_DEFAULT_REGION
  });
  const params: PutCommandInput = {
      Item: {
        name: snackName
      },
      TableName: process.env.DYANAMODB_TABLE_NAME,
    };
  const data = await dbClient.send(new PutCommand(params));
  console.log("Info: DynamoDB Data", data);

}

exports.handler = async (event: any) => {

  console.log('Info:', event);
  
  // マッピングテンプレートを使用していない場合、event.bodyをパースする必要がある。
  const requestBody = JSON.parse(event.body);

  // Slack Event Subscription TEST用
  if (requestBody['type'] === 'url_verification' ) {
    return {
      status: 200,
      challenge: requestBody['challenge'],
      message: 'URLは有効です'
    }
  }
  
  const blocks: Array<any> = requestBody.event.blocks  
  var snackName = "";
  var result;

  const elements: Array<any> = blocks[0].elements[0].elements;
  
  await Promise.all(elements.map(async element => {
    console.log('DEBUG:', element);
    // 一番最初のtextを追加対象の文字列として判定する。
    if (element.type === "text" && !snackName ) {
      snackName = element.text;
    }
  }));

  if (snackName) result = await sendData(snackName);
  

  return {
    message: 'DynamoDBにデータが送信されました',
    result: result,
  }

}
