export const stringRegexPattern = /^[a-zA-Z]{0,20}$/;
export const phoneNumberRegexPattern = /^[0-9-]{0,24}$/;
export const numberRegexPattern = /^[0-9]{0,7}$/;
export const emailRegexPattern = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{0,80}$/;
export const slackRegexPattern = /^[a-zA-Z]{0,20}$/;
export const companyRoleRegexPattern = /^[a-zA-z ]{0,80}$/;
export const passwordRegexPattern = /^[a-zA-Z0-9]{0,20}$/;
export const lastNameRegexPattern = /^[a-zA-Z ]{0,40}$/;

export function addASpace(str) {
  let response = str.replace(/([A-Z])/g, " $&");
  return response;
}
