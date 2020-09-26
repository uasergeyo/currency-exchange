import { connect } from 'react-redux';
import Body from '../body';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const BODY_W = connect(mapStateToProps("Body"), mapDispatchToProps("Body"))(Body);

export default BODY_W;
