# node-passrestaurant

Une API pour la carte Pass Restaurant de Sodexo

## Usage

```
const Sodexo = require('node-passrestaurant')
const sodexo = new Sodexo({
  {
    "PUBLIC_ID" : "",
    "CLIENT_KEY" : "",
    "CLIENT_ID" : "",
    "WS_VERSION" : ""
})
```

### Sign in

```
sodexo.signIn(login, password)
```

### Get Consumer Info

```
sodexo.getConsumerInfos(login)
  .then(response => {
    console.log(response)
  })
```

### Get transactions

```
sodexo.getTransactions(login, cardId, cardType)
  .then(response => {
    console.log(response)
  })
```
