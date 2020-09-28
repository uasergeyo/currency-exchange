import { bindActionCreators } from 'redux';
import {
	actionGetCurrencies,
	actionCreateCurrencyData,
	actionEditCell,

} from './actionCreators';

function mapDispatchToProps(component) {
	switch (component) {
		case "Body": return function (dispatch) {
			return {
				onGetExchangeData: bindActionCreators(actionGetCurrencies, dispatch),
				onCreateData: bindActionCreators(actionCreateCurrencyData,dispatch),
			};
		}
		
		case "TableRow": return function (dispatch) {
			return{
				onEditData: bindActionCreators(actionCreateCurrencyData,dispatch),
				onChangeCell: bindActionCreators(actionEditCell,dispatch)
			}
		}


		default: return undefined;
	}
}

export default mapDispatchToProps;