import React, { useState } from "react";
import { Container, Row, Col, Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = { id: Math.random(), value: userInput };
      setList([...list, newItem]);
      setUserInput("");
    }
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (index) => {
    const edited = prompt("Edit todo:", list[index].value);
    if (edited && edited.trim() !== "") {
      const updatedList = [...list];
      updatedList[index].value = edited;
      setList(updatedList);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <center><h1>TODO LIST</h1></center>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Add item..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button variant="dark" onClick={addItem}>ADD</Button>
          </InputGroup>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <ListGroup>
            {list.map((item, index) => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                {item.value}
                <span>
                  <Button variant="light" className="me-2" onClick={() => deleteItem(item.id)}>Delete</Button>
                  <Button variant="light" onClick={() => editItem(index)}>Edit</Button>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
