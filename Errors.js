export function findError(errorCode) {
  switch(parseInt(errorCode)) {
    case 'timeout':
      return 'The transaction has timed out please try again later.';
    case 3601:
      return 'The 3D Secure authentication of this cardholder by the card issuer failed.';
    case 3602:
      return 'The confirmation number included in the 3D Secure authentication request could not be found. The confirmation number must be the one returned by the payment processor in response to the original authorization or purchase.';
    case 3603:
      return 'You submitted a request that is not available for 3D Secure authentication.';
    case 3604:
      return 'The original authorization or purchase request has expired. The 3D Secure authentication request must be completed within 60 minutes of the original authorization or purchase.';
    case 3605:
      return 'The 3D Secure authentication service was not available for the card used in this transaction.';
    case 1000:
      return 'An internal error occurred. Please contact Technical Support before retrying the transaction.';
    case 1001:
      return 'An error occurred with the external processing gateway. Please retry the transaction.';
    case 1002:
      return 'An internal error occurred. Please retry the transaction.';
    case 1003:
      return 'An error occurred with the external processing gateway. Do not retry the transaction. Contact Technical Support for more information.';
    case 1004:
      return 'Your account is not enabled for this transaction type. Please verify your parameters and retry the transaction.';
    case 1006:
      return 'An error occurred with the external processing gateway. Do not retry the transaction. Contact Technical Support for more information.';
    case 1007:
      return 'An internal error occurred. Please retry the transaction.';
    case 1008:
      return 'An internal error occurred. Do not retry the transaction. Contact Technical Support for more information.';
    case 1018:
      return 'The external processing gateway has reported the transaction is unauthorized. Do not retry the transaction. Contact Technical Support for more information.';
    case 1028:
      return 'The external processing gateway has reported invalid data. Please verify your parameters and retry the transaction.';
    case 1043:
      return 'The external processing gateway has reported the account type is invalid. Do not retry the transaction. Contact Technical Support for more information.';
    case 1060:
      return 'The external processing gateway has reported a limit has been exceeded. Do not retry the transaction.';
    case 1078:
      return 'The external processing gateway has reported a system error. Please retry the transaction.';
    case 1087:
      return 'The external processing gateway has rejected the transaction. Do not retry the transaction. Contact Technical Support for more information.';
    case 3001:
      return 'You submitted an unsupported card type with your request. Please verify this parameter and retry the transaction.';
    case 3002:
      return 'You submitted an invalid card number or brand or combination of card number and brand with your request. Please verify these parameters and retry the transaction.';
    case 3003:
      return 'You submitted an incorrect value for the cvdIndicator parameter with your request. Please verify this parameter and retry the transaction.';
    case 3005:
      return 'You submitted an incorrect value for the cvd parameter with your request. Please verify this parameter and retry the transaction.';
    case 3006:
      return 'You submitted an expired credit card number with your request. Please verify this parameter and retry the request.';
    case 3008:
      return 'You submitted a card type for which the merchant account is not configured.';
    case 3009:
      return 'Your request has been declined by the issuing bank.';
    case 3011:
      return 'Your request has been declined by the issuing bank because the card used is a restricted card. Contact the cardholder’s credit card company for further investigation.';
    case 3012:
      return 'Your request has been declined by the issuing bank because the credit card expiry date submitted is invalid.';
    case 3013:
      return 'Your request has been declined by the issuing bank due to problems with the credit card account.';
    case 3014:
      return 'Your request has been declined – the issuing bank has returned an unknown response. Contact the cardholder’s credit card company for further investigation.';
    case 3015:
      return 'The bank has requested that you process the transaction manually by calling the cardholder’s credit card company.';
    case 3016:
      return 'The bank has requested that you retrieve the card from the cardholder – it may be a lost or stolen card.';
    case 3017:
      return 'You submitted an invalid credit card number with your request. Please verify this parameter and retry the transaction.';
    case 3018:
      return 'The bank has requested that you retry the transaction.';
    case 3019:
      return 'Your request has failed the CVD check. Please note that the amount may still have been reserved on the customer’s card, in which case it will be released in from 3 to 5 business days. Please ensure the CVD value is accurate before retrying the transaction.';
    case 3022:
      return 'The card has been declined due to insufficient funds.';
    case 3023:
      return 'Your request has been declined by the issuing bank due to its proprietary card activity regulations.';
    case 3024:
      return 'Your request has been declined because the issuing bank does not permit the transaction for this card.';
    case 3032:
      return 'Your request has been declined by the issuing bank or external gateway because the card is probably in one of their negative databases.';
    case 3036:
      return 'Your request has been declined due to an invalid issuer.';
    case 3037:
      return 'Your request has been declined because it is invalid.';
    case 3038:
      return 'Your request has been declined due to customer cancellation.';
    case 3039:
      return 'Your request has been declined due to an invalid authentication value.';
    case 3040:
      return 'Your request has been declined because the request type is not permitted on the card.';
    case 3041:
      return 'Your request has been declined due to a timeout.';
    case 3042:
      return 'Your request has been declined due to a cryptographic error.';
    case 3044:
      return 'You have submitted a duplicate request.';
    case 3046:
      return 'The transaction was declined because the amount was set to zero.';
    case 3047:
      return 'The transaction was declined because the amount exceeds the floor limit.';
    case 3048:
      return 'The transaction was declined because the amount is less than the floor limit.';
    case 3049:
      return 'The bank has requested that you retrieve the card from the cardholder – the credit card has expired.';
    case 3050:
      return 'The bank has requested that you retrieve the card from the cardholder – fraudulent activity is suspected.';
    case 3051:
      return 'The bank has requested that you retrieve the card from the cardholder – contact the acquirer for more information.';
    case 3052:
      return 'The bank has requested that you retrieve the card from the cardholder – the credit card is restricted.';
    case 3053:
      return 'The bank has requested that you retrieve the card from the cardholder – please call the acquirer.';
    case 3054:
      return 'The transaction was declined due to suspected fraud.';
    case 3202:
      return 'You have exceeded the maximum number of settlements allowed. Contact Technical Support for more information.';
    case 3203:
      return 'The authorization is either fully settled or cancelled.';
    case 3204:
      return 'The requested settlement amount exceeds the remaining authorization amount.';
    case 3205:
      return 'The authorization you are attempting to settle has expired.';
    case 3402:
      return 'The requested credit amount exceeds the remaining settlement amount.';
    case 3403:
      return 'You have already processed the maximum number of credits allowed for this settlement.';
    case 3404:
      return 'The settlement has already been fully credited.';
    case 3405:
      return 'The settlement you are attempting to credit has expired.';
    case 3406:
      return 'The settlement you are attempting to credit has not been batched yet. There are no settled funds available to credit.';
    case 3413:
      return 'The requested Credit amount exceeds the permissible Visa credit ratio. Please verify this parameter and retry the transaction.';
    case 3415:
      return 'You cannot cancel this transaction. It is not in a state that can be cancelled. It may already have been completed and therefore not be in a pending state.';
    case 3416:
      return 'The external processing gateway for which your merchant account is configured does not support partial settlements. Ensure that the amount you are trying to settle is identical to the amount in the original authorization and retry the transaction.';
    case 3417:
      return 'There is already another request being processed on the transaction referenced for this request. Please use the confirmation number used for this request to run a report or lookup to determine the results.';
    case 3502:
      return 'The authorization has already been settled. You cannot process an authorization reversal transaction against an authorization that has been settled.';
    case 3704:
      return 'The transaction referred to cannot be found.';
    case 3706:
      return 'The transaction referred to is not fully authenticated.';
    case 3707:
      return 'The transaction referred to is missing responses.';
    case 3800:
      return 'The transaction was declined by the authentication gateway. Do not retry the transaction.';
    case 3801:
      return 'The transaction was declined by the payment gateway. Do not retry the transaction.';
    case 3802:
      return 'The transaction was not completed successfully. Please retry the transaction.';
    case 3803:
      return 'The transaction attempt failed. Do not retry the transaction. Please contact Technical Support for more information.';
    case 3809:
      return 'The payment provider for the transaction you attempted denied you permission. Do not retry the transaction.';
    case 3810:
      return 'The payment transaction is pending due to payment provider fraud-management filters. Do not retry the transaction.';
    case 3811:
      return 'The request has been cancelled by the customer.';
    case 4000:
      return 'The transaction was declined by our Risk Management department. Code 4000.';
    case 4001:
      return 'The card number or email address associated with this transaction is in our negative database.';
    case 4002:
      return 'The transaction was declined by our Risk Management department. Code 4002.';
    default:
      return 'There was an error while processing your transaction, please try again later.';
  }
}

export default {
  findError: findError
};
