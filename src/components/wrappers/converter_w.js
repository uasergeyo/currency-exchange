import { connect } from 'react-redux';
import Converter from '../converter';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const CONVERTER_W = connect(mapStateToProps("Converter"), mapDispatchToProps("Converter"))(Converter);

export default CONVERTER_W;
