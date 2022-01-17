import { forwardRef, useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
const Card = forwardRef(function Card({text, isDragging, connectDragSource, connectDropTarget }, ref) {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
        getNode: () => elementRef.current,
    }));
    return (<div ref={elementRef} style={{ ...style, opacity }}>
        {text}
		</div>);
});
export default DropTarget(ItemTypes.CARD, {
    hover(props, monitor, component) {
        if (!component) {
            return null;
        }
        
        const node = component.getNode();
        if (!node) {
            return null;
        }
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = node.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        props.moveCard(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
}, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.CARD, {
    beginDrag: (props) => ({
        id: props.id,
        index: props.index,
    }),
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Card));
