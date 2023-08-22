# Proyecto Backend con GraphQL

🚀 **¡Bienvenido a mi Proyecto Backend con GraphQL!**

Este proyecto se realizó para demostrar mis habilidades y conocimientos en el desarrollo backend utilizando Node.js y GraphQL. Muestra cómo diseñar e implementar una API de GraphQL utilizando el esquema proporcionado para comunicar con mi otro proyecto creado con React, puedes ver mi proyecto [aquí](https://github.com/JMMOLLER/org)
.

## Características

- 🎯 Utiliza el esquema de GraphQL para un diseño de API potente y eficiente.
- 🌌 Configura MongoDB con índices para una gestión optimizada de datos.
- ⏰ Implementa limpieza automática de documentos con eliminación automática de documentos que utilizan el campo "createdAt" después de 30 minutos.
- 📄 Aplica validación de esquema utilizando MongoDB Compass.
- 🚀 Integra Apollo para operaciones de GraphQL sin problemas.
- 🪪 Uso de suscripciones con Apollo Server.

## Esquema de GraphQL

```graphql
type Query {
    random: Float!
    helpers: [Helper]
    teams: [Team]
}

type Helper {
    _id: ID!
    id: String
    name: String
    position: String
    photo: String
    team: Team
}

input HelperInput {
    id: String
    name: String
    position: String
    photo: String
    teamRef: String
}

type Team {
    _id: ID!
    id: String
    teamName: String
    colors: teamColors
}

type teamColors {
    primary: String
    background: String
}

type Subscription {
    newHelper: Helper
}

type Mutation {
    createHelper(input: HelperInput): Helper
}
```
## Configuración de MongoDB

- 📚 Se configura MongoDB con índices eficientes para un mejor rendimiento.
- ⏳ La limpieza de documentos se automatiza con la eliminación de documentos que utilizan el campo "createdAt" después de 30 minutos.
- 🛡️ Se implementa la validación de esquema utilizando MongoDB Compass para garantizar la consistencia de los datos.

Para ello crea una base de datos en MongoDB y crea 2 coleciones, una llamada ```teams``` y el otro ```helpers```.
Luego en helpers agregaremos 2 indices con los siguientes comandos:
```javascript
db.helpers.createIndex({ id: 1 }, { unique: true });
db.helpers.createIndex({ id: 1 }, { unique: true });
```
y opcionalmente podemos agregar este validador de esquema en ```helpers```:

```javascript
{
  $jsonSchema: {
    required: [
      'id',
      'name',
      'position',
      'photo',
      'teamRef'
    ],
    properties: {
      id: {
        bsonType: 'string'
      },
      name: {
        bsonType: 'string'
      },
      position: {
        bsonType: 'string'
      },
      photo: {
        bsonType: 'string'
      },
      teamRef: {
        bsonType: 'objectId'
      },
      createdAt: {
        bsonType: 'date'
      }
    }
  }
}
```
Tan solo nos faltaría el esquema de ```teams```, el cuál es el siguiente:
```javascript
{
  $jsonSchema: {
    required: [
      'id',
      'teamName',
      'colors'
    ],
    properties: {
      id: {
        bsonType: 'string'
      },
      teamName: {
        bsonType: 'string'
      },
      colors: {
        bsonType: 'object'
      },
      'colors.primary': {
        bsonType: 'string'
      },
      'colors.background': {
        bsonType: 'string'
      }
    }
  }
}
```

## Clona este repositorio.

Ahora que ya tenemos MongoDB configurado ya lo tenemos casi todo. Ahora realice lo siguiente:

- Instale las dependencias con ```npm install```.
- Configura la conexión de MongoDB en la configuración del proyecto.
- Ejecuta el proyecto con ```npm start```.

¡Explora el esquema de GraphQL, experimenta con consultas y disfruta de esta API generada con Apollo!

## Nota
Las variables de entorno para este proyecto son:
- ```APOLLO_GRAPH_REF=```
- ```MONGODB_URI=```
- ```NODE_ENV=```
- ```PORT=```