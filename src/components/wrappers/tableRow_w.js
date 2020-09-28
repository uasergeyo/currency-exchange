import { connect } from 'react-redux';
import TableRow from '../tableRow';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const TABLE_ROW_W = connect(mapStateToProps("TableRow"), mapDispatchToProps("TableRow"))(TableRow);

export default TABLE_ROW_W;
