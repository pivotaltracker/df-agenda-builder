import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../App.css';

const styles = {
  ActivitiesContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ActivitiesContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  ActivitiesLabels: {
    fontSize: '36px',
    marginTop: '0px',
    textAlign: 'right',
    color: '#aaa',
    marginLeft: '20px',
  },
  ActivitiesLabel: {
    margin: '23px 0',
  },
  ActivitiesCards: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Card: {
    width: 500,
    backgroundColor: '#F4F5F7',
  },
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `${grid * 1.5}px 10px`,
  border: isDragging ? '1px dashed #3f51b5' : '1px solid #D8D9DB',

  // change background colour if dragging
  background: isDragging ? 'white' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: 'none',
  padding: grid,
  width: 420,
});

class ActivityScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    let {
      activities,
      onActivityReorder,
    } = this.props;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedActivities = reorder(
      activities,
      result.source.index,
      result.destination.index
    );

    onActivityReorder(reorderedActivities)
  }

  render () {
    let {
      activities,
      classes,
    } = this.props;

    return (
      <div>
        <Typography className={classes.instructions}>Which activities will help you achieve your Kick-off objectives?</Typography>
        <div className={classes.ActivitiesContentContainer}>
          <Card className={classes.Card}>
            <div className={classes.ActivitiesContent}>


              <div className={classes.ActivitiesLabels}>
              {activities.map((item, index) => (
                <div key={index} className={classes.ActivitiesLabel}>{index + 1}</div>
              ))}
              </div>

              <div className={classes.ActivitiesCards}>
                <DragDropContext onDragEnd={this.onDragEnd} className='ActivitiesItems'>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      className='MuiPaper-root-9 MuiCard-root-146 SimpleCard-card-148'>
                        {activities.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            >
                            {item.content}
                            </div>
                          )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>


            </div>
          </Card>
        </div>
      </div>
    );
  }
}

ActivityScheduler.propTypes = {
  onActivityReorder: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActivityScheduler);
