import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast'
import { findError } from './Errors.js';
import {
  Text,
  View,
  Image,
  Button,
  WebView,
  TextInput,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

const validateCard = require('card-validator');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.testingpays.com/_YOUR_API_KEY_/optimal/v1/silentPost/',
      paymentStatusUrl: 'http://_YOUR_SERVER_ADDRESS/api/optimal/',
      paymentRef: () => Math.floor(Math.random() * (2000 - 100) + 100),
      html: null,
      lodaing: false,
      cardNumber: '4111111111111111',
      expiry: '02/22',
      cv2: '101',

      cardNumberInvalid: false,
      expiryInvalid: false,
      cv2Invalid: false,
    };
  }
  renderForm() {
    return (
      <View>
        {renderNavbar()}
        <View style={ styles.form }>
          <View style={ styles.inputWrapper }>
            <Text style={ [styles.inputLabel, this.state.cardNumberInvalid && styles.invalidLabel] }>Card Number</Text>
            <TextInput
              style={ [styles.input, this.state.cardNumberInvalid && styles.invalidInput] }
              value={ this.state.cardNumber }
              keyboardType={ 'numeric' }
              onChangeText={ v => validate(['number', 'cardNumber', v], this.setState.bind(this)) }
            />
            {renderError(this.state.cardNumberInvalid, 'cardNumber')}
          </View>

          <View style={ styles.inputWrapper }>
            <Text style={ [styles.inputLabel, this.state.expiryInvalid && styles.invalidLabel] }>Expiry Date</Text>
            <TextInput
              style={ [styles.input, this.state.expiryInvalid && styles.invalidInput] }
              value={ this.state.expiry }
              keyboardType={ 'numeric' }
              onChangeText={ v => validate(['expirationDate', 'expiry', manageDate(v)], this.setState.bind(this)) }
            />
            {renderError(this.state.expiryInvalid, 'expiryDate')}
          </View>

          <View style={ styles.inputWrapper }>
            <Text style={ [styles.inputLabel, this.state.cv2Invalid && styles.invalidLabel] }>CVV</Text>
            <TextInput
              style={ [styles.input, this.state.cv2Invalid && styles.invalidInput] }
              value={ this.state.cv2 }
              keyboardType={ 'numeric' }
              onChangeText={ v => validate(['cvv', 'cv2',  v], this.setState.bind(this)) }
            />
            {renderError(this.state.cv2Invalid, 'CV2')}
          </View>

          <View style={ styles.inputWrapper }>
            <Button
              color={ colors.secondary }
              title='Submit'
              containerStyle={ styles.button }
              accessibilityLabel='Submit Form'
              disabled={ !canSubmit(this.state) }
              onPress={ () => submitForm(this.state, this.setState.bind(this), this.refs) }
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={ styles.container }>
        <StatusBar hidden={ true } />
        <Spinner visible={ this.state.loading } overlayColor={ colors.primary } />
        <Toast
          position='bottom'
          ref='successToast'
          style={{ backgroundColor: colors.primary }}
          textStyle={{ color: colors.secondary }}
        />
        <Toast
          position='bottom'
          ref='errorToast'
          style={{ backgroundColor: colors.invalid }}
          textStyle={{ color:'white' }}
        />
        {!!this.state.html ? renderWebView(this.state.html, this.setState.bind(this)) : this.renderForm()}
      </KeyboardAvoidingView>
    );
  }
}

function renderNavbar() {
  return (
    <View style={ styles.navbar }>
      <Image style={ styles.logo } source={require('./assets/images/logo.png')} />
    </View>
  );
};

function renderError(bool, type) {
  return bool ? <Text style={ styles.errorText }>{getError(type)}</Text>: null;
};

function renderWebView(html, setState) {
  return (
    <WebView
      source={{html: html}}
      javaScriptEnabled={true}
      onLoadStart={() => setState({loading: true})}
      onLoadEnd={() => setState({loading: false})}
      style={ styles.webView }
    />
  );
};

function submitForm({url, paymentStatusUrl, paymentRef, cv2, expiry = '/', cardNumber}, setState, {errorToast, successToast}) {
  setState({loading: true});
  const [month, year] = expiry.split('/');
  const ref = paymentRef();

  fetch(url.concat(ref), {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cvdNumber: cv2,
      cardExpiryMonth: month,
      cardExpiryYear: year,
      cardNum: cardNumber
    })
  }).then(r => r.text())
    .then(text => setState({html: text}))
    .then(() => setTimeout(() => setState({loading: false}), 1000))
    .then(() => pollServer(paymentStatusUrl.concat(ref), errorToast, successToast, setState))
    .catch(err => {
      setState({loading: false});
      errorToast.show('Sorry there was an error while starting the transaction. Please double check your api key is correct', DURATION.LENGTH_LONG);
    });
};

async function pollServer(paymentStatusUrl, errorToast, successToast, setState, attempts = 0) {
  if (attempts == 10) {
    handleResult({status: 'timeout'}, errorToast, successToast);
    return setState({html: null});
  }

  try {
    const rawResult = await fetch(paymentStatusUrl);
    const result = await rawResult.json();

    if (result.transaction) {
      handleResult(result.transaction, errorToast, successToast);
      setState({html: null})
    } else if (result.status == 'pending') {
      setTimeout(() => pollServer(paymentStatusUrl, errorToast, successToast, setState, attempts + 1), 1000);
    }
  } catch(e) {
    handleResult({status: 'network_error'}, errorToast, successToast);
    setState({html: null})
  }
};

function handleResult({status, errorCode = 'generic_err'}, errorToast, successToast) {
  switch(status) {
    case 'success':
      return showResult(['Payment Successful!', successToast]);
    case 'errored':
      return showResult([findError(errorCode), errorToast]);
    default:
      return showResult(['There was an error while processing your transaction, please try again later.', errorToast]);
  };
};

function showResult([message, toast]) {
  toast.show(message, DURATION.LENGTH_LONG);
};

function manageDate(v) {
  return v.replace(/^([1-9]\/|[2-9])$/g, '0$1/')
    .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 > 11/
    .replace(/^1([3-9])$/g, '01/$1') // 13 > 01/3
    .replace(/^0\/|0+$/g, '0') // 0/ > 0 and 00 > 0
    .replace(/[^\d|^\/]*/g, '') // To allow only digits and `/`
    .replace(/\/\//g, '/'); // Prevent entering more than 1 `/`
};

function canSubmit({cardNumberInvalid, expiryInvalid, cv2Invalid}) {
  return (cardNumberInvalid && expiryInvalid && cv2Invalid) ? 'true' : 'false';
};

function validate(tuple, setState) {
  const [ funcName, propName, value ] = tuple;
  setState({[propName]: value});

  const result = validateCard[funcName](value);

  setState({
    [propName.concat('Invalid')]: result.isPotentiallyValid ? false: true
  });
};

function getError(type) {
  switch(type) {
    case 'cardNumber':
      return 'Your card seems to be invalid';
    case 'expiryDate':
      return 'Your expiry date seems to be invalid';
    case 'CV2':
      return 'Your cv2 number seems to be invalid';
    default:
      return 'There might be an error with your credit card details. Please review them.'
  }
};

const colors = {
  primary: '#3a3d3d',
  secondary: '#67C5A5',
  background: '#f8f8f8',
  invalid: '#EF4060'
};

const styles = StyleSheet.create({
  webView: { flex: 1, },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navbar: {
    height: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    resizeMode: 'contain',
    height: 25,
  },
  form: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  inputWrapper: {
    marginBottom: 100,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    color: colors.primary,
    borderColor: colors.primary,
    backgroundColor: 'white',
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: colors.invalid,
  },
  invalidLabel: {
    color: colors.invalid,
  },
  button: {
    backgroundColor: colors.background,
  },
  errorText: {
    color: 'red',
    marginBottom: 40,
  },
});
