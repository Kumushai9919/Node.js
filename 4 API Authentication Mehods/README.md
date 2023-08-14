## 4 Types of API Authentication
1. No Authentication
2. Basic Authentication
3. API Key Authorisation
4. Token Based Authentication
<img width="1501" alt="Screenshot 2023-08-14 at 7 35 07 PM" src="https://github.com/Kumushai9919/Node.js/assets/83897840/657b96f4-97a9-40b3-85b7-e6045ab6c2fa">

### Authentication
##### Made API Authentication by using Postman and this API documentation by simply getting funny secrets from APIs-> https://secrets-api.appbrewery.com/ 
 
#### 1. No Authentication
- Many public APIs usually is used without no authentication, just with request limitations
#### 2. Basic Authentication
- Basic Authentication is required for some endpoints. Use your username and password to authenticate.
- Making API Authentication by username and password - with user account just by passing base64 encoded string in the header of the request,
  and pass this encoded string authorization data when you make a request:
  <img width="640" alt="Screenshot 2023-08-14 at 7 35 53 PM" src="https://github.com/Kumushai9919/Node.js/assets/83897840/7b9299af-8d44-4357-87d8-2eeed04a8377">

#### 3. API Key Authorisation
- An API Key is requred to Authorize certain endpoints. Use the API key obtained from the /generate-api-key endpoint.
- We can to pass our API key in headers or query params ->
  <img width="636" alt="Screenshot 2023-08-14 at 7 38 44 PM" src="https://github.com/Kumushai9919/Node.js/assets/83897840/5f537a61-0cd4-4e3b-b802-122394e3c1d6">

#### 4. Token Based Authentication
- Bearer Token Authentication is required for some endpoints. Use your username and password to get a token obtained from the /get-auth-token endpoint.
- We get user’s username and password to log in and then once they’ve logged in, we generate a token to be used with the API, the API doesn’t get involved with the username and password→ instead it is the TOKEN that’s constantly being used to interact with the API
- <img width="858" alt="Screenshot 2023-08-14 at 7 40 30 PM" src="https://github.com/Kumushai9919/Node.js/assets/83897840/ef669273-2704-43cd-9a4b-22df04fd4701">
