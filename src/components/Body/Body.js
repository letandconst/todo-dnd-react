import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'
import { v1 } from 'uuid'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const item = {
    id: v1(),
    name: "Clean the house"
  }
  
  const item2 = {
    id: v1(),
    name: "Wash the dishes"
  }
  const item3 = {
    id: v1(),
    name: "Do the assignments"
  }

const Body = () => {
    const [text, setText] = useState("")
    const [state, setState] = useState({
      "todo": {
        title: "Todo",
        items: [item, item2, item3]
      },
      "in-progress": {
        title: "In Progress",
        items: []
      },
      "done": {
        title: "Completed",
        items: []
      }
    })
    


    const handleDragEnd = ({destination, source}) => {
        if (!destination) {
          return
        }
    
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
          return
        }
    
        // Creating a copy of item before removing it from state
        const itemCopy = {...state[source.droppableId].items[source.index]}
    
        setState(prev => {
          prev = {...prev}
          // Remove from previous items array
          prev[source.droppableId].items.splice(source.index, 1)
    
    
          // Adding to new items array location
          prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
    
          return prev
        })
      }
    
      const addItem = () => {
        setState(prev => {
          return {
            ...prev,
            todo: {
              title: "Todo",
              items: [
                ...prev.todo.items,
                {
                  id: v1(),
                  name: text
                }
              
              ]
            }
          }
        })
    
        setText("")
      }
 
    const removeItem = () =>{
        console.log("test")
    }
      
    
 
  return (
    <div className='site-layout-content'>
    <div className ="add">
    <input type='text' value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addItem}>Add Item </button>
    </div>
    

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
          {_.map(state, (data, key) => {
            return (
                <>
              <Col key={key} span={8}>
                <h3>
                  {data.title}
                </h3>
                <Droppable droppableId={key}>
                  {provided => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={'droppable-col'}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${snapshot.isDragging &&
                                      'dragging'}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                    <div>
                                    {/* <button onClick = {(e) => {
                                      
                                    }} className ='delete'> <EditOutlined /></button> */}
                                    {/* <button  onClick={removeItem} className ='delete'> <DeleteOutlined /> </button> */}
                                    </div>
                                  </div>
                                
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </Col>
              </>
            )
          })}
        </Row>
      </DragDropContext>
    </div>
  )
}

export default Body
