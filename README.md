# node-result-error

wrapper for data via error class ResultError

## install

```shell
npm install node-result-error
# or
yarn add node-result-error
```

## example

```ts
import {ResultOk, ResultFail} from 'node-result';
import {ResultError} from "node-result-error";

function checkParameter(parameters: object, parameterName: string, regExp: RegExp) {
    try {
        const parameterValue = parameters[parameterName];
        if (!regExp.test(parameterValue)) {
            return ResultFail(new ResultError({
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Unsupported parameter value.',
                    parameterName,
                    parameterValue
                })
            }));
        }
        return ResultOk(null);
    } catch (error) {
        return ResultFail(error);
    }
}

((ctx) => {
    try {
        const user = {
            firstName: 'Alex',
            lastName: '_Smith',
            age: '28'
        };
        checkParameter(user, 'firstName', /^[A-Z][a-z]+$/).unwrap();
        checkParameter(user, 'lastName', /^[A-Z][a-z]+$/).unwrap();
        checkParameter(user, 'age', /^[1-9][0-9]?$/).unwrap();
        ctx.status = 200;
        ctx.body = 'ok';
    } catch (error) {
        if (error instanceof ResultError) {
            const data = error.unwrap();
            ctx.status = data.statusCode;
            ctx.body = data.body;
        } else {
            console.error(error);
            ctx.status = 500;
        }
    }
})();
```