import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

const Update = () => {

    const { id } = useParams();
    const [state, setState] = useState({ id: '', value: '', url: '' })

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}website/website?id=${id}`)
            .then(response => {
                return response.json();
            }).then(result => {
                setState({
                    id: result.id,
                    title: result.title,
                    url: result.url
                });
            });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}website/update_website`, {
            method: 'PUT',
            body: JSON.stringify({
                id: state.id,
                title: state.title,
                url: state.url
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Website update successfully.");
                navigate("/")
            }
        });
    }

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

    return (
        <div id="container">
            <Form onSubmit={handleSubmit}>
                <Card>
                    <Card.Header>
                        <h5>Update Website</h5>
                        <Button variant="outline-primary" size="sm">
                            <Link to="/">Go to Websites</Link>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Title</Form.Label>
                            <Form.Control type="hidden" name="id"
                                value={state.id}
                            />
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={state.title}
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
                                    value={state.url}
                                    onChange={handleChange}
                                    placholder="Enter url..."
                                />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm">
                            Submit
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    )
}

// render() {
//     return (
//         <div id="container">
//             <Form onSubmit={handleSubmit}>
//                 <Card>
//                     <Card.Header>
//                         <h5>Update Website</h5>
//                         <Button variant="outline-primary" size="sm">
//                             <Link to="/">Go to Websites</Link>
//                         </Button>
//                     </Card.Header>
//                     <Card.Body>
//                         <Form.Group as={Row}>
//                             <Form.Label column sm="2">Title</Form.Label>
//                             <Form.Control type="hidden" name="id" value={state.id} />
//                             <Col sm="10">
//                                 <Form.Control
//                                     type="text"
//                                     name="title"
//                                     value={state.title}
//                                     onChange={handleChange}
//                                     placeholder="Enter title..."
//                                 />
//                             </Col>
//                         </Form.Group>

//                         <Form.Group as={Row}>
//                             <Form.Label column sm="2">Url</Form.Label>
//                             <Col sm="10">
//                                 <Form.Control
//                                     type="text"
//                                     name="url"
//                                     value={state.url}
//                                     onChange={handleChange}
//                                     placholder="Enter url..."
//                                 />
//                             </Col>
//                         </Form.Group>
//                     </Card.Body>
//                     <Card.Footer>
//                         <Button
//                             type="submit"
//                             variant="primary"
//                             size="sm">
//                             Submit
//                     </Button>
//                     </Card.Footer>
//                 </Card>
//             </Form>
//         </div>
//     );
// }
// }

export default Update;