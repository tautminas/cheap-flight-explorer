# Cheap Flight Explorer

## About the application

Cheap Flight Explorer is an application for finding the cheapest flight option. It is made using Node.js with Express and Axios. It uses [Tequila Flight Search API](https://tequila.kiwi.com/portal/docs/tequila_api) for getting the data. Select flight options and start searching.

## Running the program

Register to the [Tequila Flight Search API](https://tequila.kiwi.com/portal/docs/tequila_api) for the API key. Create your own "Solution". There is no need to provide a credit card or billing information, just skip it. When registering for your API key choose Meta Search as your product type. If the website prompts you for the type of partnership you can either choose "Book with Kiwi.com" or the affiliate program. You should see your API key under the details of your solution.

Create a .env file in the root directory of the project. Add your API key as a `TEQUILA_API_KEY` variable:

```
TEQUILA_API_KEY=value_of_your_api_key
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node index.js
```

Access the application by opening a browser and going to `http://localhost:3000`
