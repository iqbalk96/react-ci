import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

const Websites = () => {

    const [headers] = useState([
        { key: 'id', label: 'Id' },
        { key: 'title', label: 'Title' },
        { key: 'url', label: 'URL' }
    ])
    const [websites, setWebsites] = useState([])

    const deleteWebsite = (id) => {
        if (window.confirm("Are you sure want to delete?")) {
            fetch(`${BASE_URL}website/delete_website/${id}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.status === 200) {
                    alert("Website deleted successfully");
                    fetch(`${BASE_URL}`)
                        .then(response => {
                            return response.json();
                        }).then(result => {
                            setWebsites(result)
                        });
                }
            });
        }
    }

    useEffect(() => {
        fetch(`${BASE_URL}`)
            .then(response => {
                return response.json();
            }).then(result => {
                setWebsites(result)
            });
    }, [])

    return (
        <div id="container">
            <Card>
                <Card.Header>
                    <h5>All Website List</h5>
                    <Button variant="outline-primary" size="sm">
                        <Link to="/create">Add Website</Link>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                {
                                    headers.map(function (h) {
                                        return (
                                            <th key={h.key}>{h.label}</th>
                                        );
                                    })
                                }
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                websites.map(function (item, key) {
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.url}</td>
                                            <td>
                                                <Button variant="outline-primary" size="sm">
                                                    <Link to={`/update/${item.id}`}>Edit</Link>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => deleteWebsite(item.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }.bind(this))
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div >
    )
}

export default Websites;