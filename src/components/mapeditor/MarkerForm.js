import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

const markerTypeSelect = (state, setState) => ({
    "flashCard": <FlashCardForm state={state} setState={setState} />
})

const createMarker = (groupId, frontText, backText, dispatch) => {
    dispatch({
        type: "currentMarker",
        value: {
            groupId,
            frontText,
            backText,
        }
    })
    dispatch({
        type: "listMarkers"
    })
    dispatch({
        type: "createPlace",
        value: true
    })
}

const dummyCreateGroup = dispatch => () => { 
    dispatch({
        type: "createGroup",
        name: "group1"
    }) 
    dispatch({
        type: "listGroups"
    })
}

const MarkerForm = ({goToPosition, state, dispatch}) => {
    const [markerType, setMarkerType] = useState("flashCard")
    const [markerGroup, setMarkerGroup] = useState("")
    const [markerData, setMarkerData] = useState({})
    const [createButtonVariant, setCBV] = useState("primary")
    
    return (
        <Form onSubmit={e => e.preventDefault()}>
            <Form.Row>
                {markerTypeSelect(markerData, setMarkerData)[markerType]}
                <Col>
                    <Form.Control
                        size="sm"
                        as="select"
                        value={markerType}
                        onChange={e => setMarkerType(e.target.value)}
                    >
                        <option value="flashCard">flash card</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Button size="sm" variant={state.createPlace? "success" : "primary"} type="button" onClick={() => {
                        //depends on marker type
                        if (!state.currentGroup || !markerData) return
                        createMarker(state.currentGroup.id, markerData.frontText, markerData.backText, dispatch)
                    }}>
                        Create
                    </Button>
                </Col>
                <Col>
                    <Dropdown size="sm" variant="primary" title="M">
                        <Dropdown.Toggle as={CustomToggle}>
                            Markers 
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={SearchMenu(dispatch)}>
                            {((state || {}).markers || []).map(m => (
                                <Dropdown.Item 
                                    as="div"
                                    onClick={() => goToPosition({center: {lat: m.lat, lng: m.lng}, zoom: m.zoom})}
                                >
                                    {m.frontText}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Form.Control
                        size="sm"
                        as="select"
                        value={markerGroup}
                        onChange={e => { 
                            setMarkerGroup(e.target.value)
                            dispatch({ type: "currentGroup", id: e.target.value })
                        }}
                    >
                        {((state || {}).markerGroups || []).map(mg => (
                            <option value={mg.id}>{mg.name}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col>
                    <Button 
                        size="sm"
                        variant="secondary"
                        type="button"
                        onClick={dummyCreateGroup(dispatch)}
                    >
                        New Group 
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

// custom dropdown
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    size="sm"
    variant="secondary"
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </Button>
));

const SearchMenu = dispatch => React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={e => {/*search logic goes here*/}}
        />
        
        <div className="list-unstyled">
            {children}
        </div>
      </div>
    );
  },
);

// form types
const FlashCardForm = ({ state, setState }) => {
    return (
        <React.Fragment>
            <Col>
                <Form.Control 
                    size="sm" 
                    placeholder="front text" 
                    value={state.frontText || ""}
                    onChange={e => 
                        setState({ frontText: e.target.value, backText: state.backText })
                    }
                />
            </Col>
            <Col>
                <Form.Control 
                    size="sm" 
                    placeholder="back text" 
                    value={state.backText || ""}
                    onChange={e => 
                        setState({ frontText: state.frontText, backText: e.target.value })
                    }
                />
            </Col>
        </React.Fragment>
    )
}

export default MarkerForm;
