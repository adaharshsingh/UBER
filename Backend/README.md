# User Registration API

## Endpoint
`POST /users/register`

## Description
This endpoint allows users to register by providing their details. It validates the input data and creates a new user in the database.

## Required Data Format
The request body must be in JSON format and include the following fields:

- `fullName`: An object containing:
  - `firstName`: A string representing the user's first name (minimum length: 3 characters).
  - `lastName`: A string representing the user's last name (optional, minimum length: 3 characters).
- `email`: A string representing the user's email address (must be a valid email format and unique).
- `password`: A string representing the user's password (minimum length: 6 characters).

### Example Request Body
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}

## Status Codes
- `201 Created`: User successfully registered.
- `400 Bad Request`: Validation errors occurred (e.g., missing fields, invalid email).
- `500 Internal Server Error`: An error occurred on the server while processing the request.