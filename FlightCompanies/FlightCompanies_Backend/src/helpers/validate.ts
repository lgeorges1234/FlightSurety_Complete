import Validator from "validatorjs";
import { getUserFromEmail } from "./userUtilityFunction";


export const validate = async (body: any, rules: any, customMessages: any) => {
  // console.log(`helpers/validate -- validator -- body : ${JSON.stringify(body)}`)
  const validation = new Validator(body, rules, customMessages);
  // validation.checkAsync(fail, passes)
  // console.log(`helpers/validate -- validator -- validation.passes() : ${JSON.stringify(validation.passes())}`)
  // console.log(`helpers/validate -- validator -- validation.errors : ${JSON.stringify(validator.errors)}`)
  return validation;
};


// Check the strengh of a password
const passwordStrengthCheck = (pwd: string, status: string = "activ"): boolean => {
    // console.log(`helpers/validate -- passwordStrengthCheck -- status : ${JSON.stringify(status)}`)
    const strongPassword = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    );
    const mediumPassword = new RegExp(
      '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
    );
    const passwordIsStrongEnough = (status == 'admin' || status == 'root') ? strongPassword.test(pwd) : mediumPassword.test(pwd);
    // console.log(`helpers/validate -- passwordStrengthCheck -- passwordIsStrongEnough : ${JSON.stringify(passwordIsStrongEnough)}`)
    return passwordIsStrongEnough;
  };

  // add a custom validator's rule to check the strenght of the password
Validator.register(
  'strongPassword',
  (password, requirement) => passwordStrengthCheck(password as string, requirement),
  'Password is not strong enough'
  );


// add a custom validator's rult to check if the new user's mail is already registered
Validator.registerAsync('unique', 
  async function(email,  _attribute, _req, passes) {
      await getUserFromEmail(email as string)
        .then((result) => {
          console.log(result)
          if(!result){
              passes(false); // return false if value exists
              return;
          }
          passes();
        })
    },
    'email is already registered'
)




