import { d } from '../helpers'

function mapStateToProps(component) {
	switch (component) {
		case "Body":
			return function (state) {
				return {
					data: d`${state}promiseReducer.currenciesAPI.payload`,
					status: d`${state}.promiseReducer.currenciesAPI.status`,
					err: d`${state}promiseReducer.currenciesAPI.error`,
				}
			}
		case "Converter":
			return function (state) {
				return {
					data: d`${state}.createData.editableData`,
					currencyChanges: d`${state}.changeCurrencyPosition.lastChange`

				}
			}
		case "CurrencyTable":
			return function (state) {
				return {
					data: d`${state}.createData.editableData`,
				}
			}
		case "TableRow":
			return function (state) {
				return {
					dataPB: d`${state}promiseReducer.currenciesAPI.payload`,
					editableData: d`${state}.createData.editableData`,
				}
			}

		default: return undefined;
	}
}

export default mapStateToProps;