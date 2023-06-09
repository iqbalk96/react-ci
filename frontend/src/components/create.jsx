import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../utils/config';

const Create = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = { title: '', url: '' };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    const [state, setState] = useState(
        { title: '', url: '' }
    )

    const navigate = useNavigate();

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setState((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}website/add_website`, {
            method: 'POST',
            body: JSON.stringify({
                title: state.title,
                url: state.url
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                alert("New website saved successfully");
                navigate("/")
            }
        });
    }
    return (
        <div id="container">
            <Form onSubmit={handleSubmit}>
                <Card>
                    <Card.Header>
                        <h5>Create New Website</h5>
                        <Button variant="outline-primary" size="sm">
                            <Link to="/">Go to Websites</Link>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Title</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={state.value}
                                    onChange={handleChange}
                                    placeholder="Enter title..."
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Url</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="url"
                                    value={state.value}
                                    onChange={handleChange}
                                    placeholder="Enter url..."
                                />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button type="submit" variant="primary" size="sm">Submit</Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    );
}

export default Create;