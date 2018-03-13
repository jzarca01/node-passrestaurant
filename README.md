# sodexo-api
Une API pour la carte Pass Restaurant de Sodexo

## Usage

```
const SodexoApi = require('sodexo-api')
const sodexo = new SodexoApi()
```

### Sign in
```
sodexo.signIn(login, password)
  .then(response => {
    API_TOKEN = response.access_token
    })
```

### Get Consumer Info
```
sodexo.getConsumerInfos(login, API_TOKEN)
  .then(response => {
    console.log(response)
  })
```

### Get transactions
```
sodexo.getTransactions(login, cardId, cardType, API_TOKEN)
  .then(response => {
    console.log(response)
  })
```