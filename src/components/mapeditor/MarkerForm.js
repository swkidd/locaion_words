import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

const formTypesSelect = (state, setState) => ({
    "flashCard": <FlashCardForm state={state} setState={setState} />
})
const dummyCreate = dispatch => async () => {
    await dispatch({
        type: "save",
        formType: "flashCard",
        frontText: "hey",
        backText: "there",
        zoom: 12,
        lat: 1,
        lng: 1,
    }) 
    await dispatch({
        type: "createGroup",
        name: "group1"
    }) 
}

const MarkerForm = ({markerDescriptions = [], dispatch = () => {}}) => {
    const [formType, setFormType] = useState("flashCard")
    const [markerGroup, setMarkerGroup] = useState("flashCard")
    const [markerData, setMarkerData] = useState({})
    return (
        <Form onSubmit={e => e.preventDefault()}>
            <Form.Row>
                {formTypesSelect(markerData, setMarkerData)[formType]}
                <Col>
                    <Form.Control
                        size="sm"
                        as="select"
                        value={formType}
                        onChange={e => setFormType(e.target.value)}
                    >
                        <option value="flashCard">flash card</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Button size="sm" variant="primary" type="button" onClick={dummyCreate(dispatch)}>
                        Create
                    </Button>
                </Col>
                <Col>
                    <Dropdown size="sm" variant="primary" title="M">
                        <Dropdown.Toggle as={CustomToggle}>
                            Markers 
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={SearchMenu(dispatch)}>
                            {markerDescriptions.map(d => <Dropdown.Item as="div">{d}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Form.Control
                        size="sm"
                        as="select"
                        value={markerGroup}
                        onChange={e => setMarkerGroup(e.target.value)}
                    >
                        <option value="mainGroup">main group</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Button 
                        size="sm"
                        variant="secondary"
                        type="button"
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
          onChange={e => dispatch({ type: "filter", value: e.target.value})}
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
