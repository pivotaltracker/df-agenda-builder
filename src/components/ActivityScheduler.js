import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../App.css';

const styles = {
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
  margin: `${grid * 1.5}px 75px`,
  border: isDragging ? '1px dashed #3f51b5' : '1px solid #D8D9DB',

  // change background colour if dragging
  background: isDragging ? 'white' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: '#F4F5F7',
  padding: grid,
  width: 500,
});

class ActivityScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const activities = reorder(
      this.props.activities,
      result.source.index,
      result.destination.index
    );

    this.props.onActivityReorder(activities)
  }

  render () {
    let {
      classes
    } = this.props;
    
    return (
      <div>
        <Typography className={classes.instructions}>Which activities will help you achieve your Kick-off objectives?</Typography>
        <div className='contentContainer'>
          <div className='timingCards'>

            <DragDropContext onDragEnd={this.onDragEnd} className='ActivitiesItems'>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className='MuiPaper-root-9 MuiPaper-elevation1-12 MuiPaper-rounded-10 MuiCard-root-146 SimpleCard-card-148'
                  >
                    {this.props.activities.map((item, index) => (
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
      </div>
    );
  }
}

ActivityScheduler.propTypes = {
  onActivityReorder: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActivityScheduler);
