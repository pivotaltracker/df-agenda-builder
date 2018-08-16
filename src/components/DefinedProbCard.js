import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import mobile from '../images/mobile.svg';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain'
  },
};

function DefinedProbCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card} 
        style={{ marginLeft: 30, marginRight: 30, flex:1, cursor: 'pointer'}} 
        elevation={props.active ? 20 : 1}
        onClick={() => {
          props.onClick('Defined')
        }}
      >  
        <CardMedia
          className={classes.media}
          image={mobile}
          title="Defined Problem"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Existing Defined Problem
          </Typography>
          <Typography component="p">
            I have an existing, defined problem that I want to validate.
          </Typography>
          <Typography component="p">
            I want the D&F to produce a set of validated use cases and wireframes.
          </Typography>
        </CardContent>
        <CardActions>
          {/* Insert actions here */}
        </CardActions>
      </Card>
    </div>
  );
}

DefinedProbCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefinedProbCard);
