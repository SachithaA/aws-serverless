import { successJSONResponse, failureJSONResponse } from '@libs/api-gateway';


const factorial = async (event) => {

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

  if (inputValue >= 1 && inputValue <= 100) {

    const factorial = n => !(n > 1) ? 1 : factorial(n - 1) * n;
    const inputFactorial = factorial(inputValue);

    let responseBody = { "Input": inputValue, "Factorial": inputFactorial };

    return successJSONResponse(responseBody);

  } 
  else {
    let responseBody = { "Input": inputValue, "Factorial": `Error! Number should be more than 1 and less than 100!` };
    return failureJSONResponse(responseBody);
  }

};



export const main = factorial;
