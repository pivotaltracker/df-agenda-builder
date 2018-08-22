import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import BannerWatermark from '../images/banner_watermark.png';
import TrackerLogo from '../images/Tracker_Horizontal.svg';

const styles = {
  header: {
    backgroundImage: `url(${BannerWatermark})`,
    backgroundColor: '#49718F',
    height: '100px',
    display: 'flex',
    alignItems: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  logo: {
    margin: '10px 10px 0 0',
    width: '200px',
  }
};


class Header extends React.Component {
  render() {
    let {
      classes,
    } = this.props;

    return(
      <div className={classes.header}>
        <img className={classes.logo} src={TrackerLogo} />
      </div>
    );
  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
