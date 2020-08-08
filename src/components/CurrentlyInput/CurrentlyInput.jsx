import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: '',
  suffix: ' DZ',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 13, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
  const {setMin,setMax,setPrice,setPricePromo,value} = inputProps;
  const handleCurrency = (e)=>{
    const name = e.currentTarget.attributes["name"].value;
    const value = e.currentTarget.value.split(" ")[0]
    switch (name) {
      case "min":
        setMin(value);
        break;
      case "max":
        setMax(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "pricePromo":
        setPricePromo(value);
        break;
      default:
        break;
    }
  }
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })
  return <MaskedInput value={value}  onChange={handleCurrency} mask={currencyMask} {...inputProps} />
}

CurrencyInput.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
}

CurrencyInput.propTypes = {
  inputmode: PropTypes.string,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
}

export default CurrencyInput
