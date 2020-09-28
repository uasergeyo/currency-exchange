import { connect } from 'react-redux';
import CurrencyTable from '../currencyTable';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const CURRENCY_TABLE_W = connect(mapStateToProps("CurrencyTable"), mapDispatchToProps("CurrencyTable"))(CurrencyTable);

export default CURRENCY_TABLE_W;
