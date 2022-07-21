import { successJSONResponse, failureJSONResponse } from '@libs/api-gateway';

const fibonacci = async (event) => {

  let inputValue = event.pathParameters.num;

  if (!inputValue) {
    return failureJSONResponse({
      message: `Please specify an input value!`
    });
  }

  if (isNaN(inputValue)) {
    return failureJSONResponse({
      message: `Input should be a number!`
    });
  }

  if (inputValue >= 1 && inputValue <= 150) {

    let host = event['headers']['Host'];
    let stage = event['requestContext']['stage'];
    let baseURL = `http://${host}/${stage}`;

    let responseFact, factorialVal, fibonacciVal;

    
    const axios = require('axios').default;
    responseFact=await axios.get(`${baseURL}/factorial/${inputValue}`).then(
      res => responseFact = res.data
    ).catch(
      error => responseFact = error.response.data
    )

    //assign factorial value from response
    factorialVal = responseFact.Factorial;

    //calculate fibonacci
    let x = 0;
    let y = 1;
    let z = 0;
    if (inputValue == 1) {
      z = 0;
    }
    else if (inputValue == 2) {
      z = 1;
    }
    else {
      for (let i = 0; i < inputValue - 2; i++) {
        z = x + y;
        x = y;
        y = z;
      }
    }

    //assign fibonnaci value
    fibonacciVal = z;

    let responseBody = { "Input": inputValue, "Factorial": factorialVal, "Fibonacci": fibonacciVal };

    return successJSONResponse(responseBody);

  }
  else {
    return failureJSONResponse({
      message: `Number should be more than 1 and less than 150!`
    });
  }

};



export const main = fibonacci;
