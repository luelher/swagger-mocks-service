exports.test_swagger_path = '/organizations/DummyInstitution/services/dummy_service/versions/99.json';

exports.simple_service_swagger_oas_response = `
{
  "host": "simple-service-interop.herokuapp.com",
  "info": {
    "title": "Hello",
    "version": "1.0.0",
    "description": "Servicio Simple de Referencia\n"
  },
  "paths": {
    "/hello": {
      "get": {
        "responses": {
          "200": {
            "schema": {
              "type": "object",
              "properties": {
                "respuesta": {
                  "type": "string",
                  "description": "Respuesta."
                }
              }
            },
            "description": "Hello GET"
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "name",
            "type": "string",
            "description": "Nombre"
          }
        ]
      }
    }
  },
  "schemes": [
    "https"
  ],
  "swagger": "2.0",
  "basePath": "/simple_example"
}`;

exports.complex_service_swagger_oas_response = `
{
  "host": "complex-service-interop.herokuapp.com",
  "info": {
    "title": "Servicio Dummy Complejo de Referencia",
    "contact": {
      "email": "contacto@interoperabilidad.digital.gob.cl"
    },
    "license": {
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html",
      "name": "Apache 2.0"
    },
    "version": "0.0.1",
    "description": "Este es un ejemplo dummy complejo para Interoperabilidad \n"
  },
  "paths": {
    "/personas": {
      "get": {
        "summary": "Listado de personas",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/people"
              }
            },
            "description": "successful operation"
          }
        },
        "operationId": "peopleIndex"
      },
      "post": {
        "summary": "Crear persona",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "201": {
            "schema": {
              "$ref": "#/definitions/people"
            },
            "description": "created"
          },
          "422": {
            "description": "unprocessable entity"
          }
        },
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "schema": {
              "$ref": "#/definitions/newpeople"
            }
          }
        ]
      }
    },
    "/personas/{id}": {
      "delete": {
        "summary": "Eliminando Personas",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "schema": {
              "type": "object",
              "properties": {
                "respuesta": {
                  "type": "string",
                  "description": "Respuesta."
                }
              }
            },
            "description": "successful operation"
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "type": "integer",
            "required": true,
            "description": "Id de la persona a ser eliminada"
          }
        ]
      }
    }
  },
  "schemes": [
    "http"
  ],
  "swagger": "2.0",
  "basePath": "/complex_example",
  "definitions": {
    "datos": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        },
        "telefonos": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/telefono"
          }
        }
      }
    },
    "people": {
      "type": "object",
      "required": [
        "persona"
      ],
      "properties": {
        "datos": {
          "$ref": "#/definitions/datos"
        },
        "persona": {
          "$ref": "#/definitions/nombreyapellido"
        }
      }
    },
    "telefono": {
      "type": "number",
      "minimum": 111111
    },
    "newpeople": {
      "type": "object",
      "properties": {
        "persona": {
          "$ref": "#/definitions/formpeople"
        }
      }
    },
    "formpeople": {
      "type": "object",
      "required": [
        "nombres",
        "apellidos"
      ],
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        },
        "nombres": {
          "type": "string"
        },
        "apellidos": {
          "type": "string"
        },
        "telefonos_attributes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/telefonoarray"
          }
        }
      }
    },
    "telefonoarray": {
      "type": "object",
      "properties": {
        "numero": {
          "type": "string"
        }
      }
    },
    "nombreyapellido": {
      "type": "object",
      "required": [
        "nombres",
        "apellidos"
      ],
      "properties": {
        "id": {
          "type": "integer"
        },
        "nombres": {
          "type": "string"
        },
        "apellidos": {
          "type": "string"
        }
      }
    }
  }
}
`;
