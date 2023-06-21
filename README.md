# ランダムおやつBOT データ追加関数
Slack Workflow -> Event Subscription(app_mention) -> Lambda -> DynamoDB

##　　INPUT

Slack Message

```
@snack_workflow ${SNACK_NAME}
${USER_NAME} さんからのリクエスト
```

`event.body`

```json
{
  "token":"XXXXXXXX",
  "team_id":"XXXXXXXX",
  "enterprise_id":"XXXXXXXX",
  "api_app_id":"XXXXXXXX",
  "event":{
    "type":"app_mention",
    "subtype":"bot_message",
    "text":"XXXXXXXX",
    "ts":"1687388705.214349",
    "username":"XXXXXXXX",
    "bot_id":"XXXXXXXX",
    "app_id":"XXXXXXXX",
    "blocks":[
      {
        "type":"rich_text",
        "block_id":"V99",
        "elements":[
          {
            "type":"rich_text_section",
            "elements":[
              {
                "type":"user",
                "user_id":"XXXXXXXX"
              },
              {
                "type":"text",
                "text":"${SNACK_NAME}"
              },
              {
                "type":"text",
                "text":"\n（"
              },
              {
                "type":"text",
                "text":"${USER_NAME}"
              },
              {
                "type":"text",
                "text":" さんからのリクエスト"
              }
            ]
          }
        ]
      }
    ],
    "channel":"XXXXXXXX",
    "event_ts":"1687388705.214349"
  },
  "type":"XXXXXXXX",
  "event_id":"XXXXXXXX",
  "event_time":1687388705,
  "authorizations":["...."],
  "is_ext_shared_channel":false,
  "event_context":"XXXXXXXX"
}

```
