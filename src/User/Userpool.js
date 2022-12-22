import {CognitoUserPool} from 'amazon-cognito-identity-js';

    const poolData = {
        UserPoolId : "eu-west-1_L3SLNTGpz",
        ClientId   : "70jrhlvss8hrslpkmsdm67lo0g"
    }

export default new CognitoUserPool(poolData);