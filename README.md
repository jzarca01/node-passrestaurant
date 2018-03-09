# sodexo-api
Une API pour la carte Pass Restaurant de Sodexo

## Utilisation

```
const SodexoApi = require('sodexo-api')
const sodexo = new SodexoApi()

sodexo.signIn(login, password)
  .then(response => {
    API_TOKEN = response.token
    })
```
