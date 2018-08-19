import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../App.css';

const styles = {
  AgendaViewer: {}
};

class AgendaViewer extends React.Component {
  render () {
    let {
      classes
    } = this.props;

    return (
      <div className={classes.AgendaViewer}>AgendaViewer</div>
    );
  }
}

AgendaViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgendaViewer);
