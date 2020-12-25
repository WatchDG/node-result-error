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

function checkParameter(parameter: string, regExp: RegExp){
    try{
        if(!regExp.test(parameter)){
            return ResultFail(new ResultError({
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Unsupported parametr value.'
                })
            }))
        }
         return ResultOk(null);
    }catch (error){
        return ResultFail(error);
    }
}

((ctx)=>{
    try{
        checkParameter('Alex', /^[A-Z][a-z]+$/).unwrap();
        checkParameter('_Smith', /^[A-Z][a-z]+$/).unwrap();
        checkParameter('28', /^[1-9][0-9]?$/).unwrap();
    }catch (error){
        if(error instanceof ResultError){
            const data = error.unwrap();
            ctx.status = data.statusCode;
            ctx.body = data.body;
        }else{
            console.error(error);
            ctx.status = 500;
        }
    }
})();
```