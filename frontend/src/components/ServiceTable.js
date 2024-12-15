import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './ServiceTable.css'; // Custom CSS for styling

const ServiceTable = () => {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({ name: '', description: '', price: '' });

    // Fetch services
    useEffect(() => {
        fetch('http://localhost:4000/admin/services')
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((error) => console.error('Error fetching services:', error));
    }, []);

    // Add a new service
    const addService = () => {
        fetch('http://localhost:4000/admin/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newService),
        })
            .then((response) => response.json())
            .then((data) => {
                setServices([...services, data]);
                setNewService({ name: '', description: '', price: '' });
            });
    };

    // Update a service
    const updateService = () => {
        fetch(`http://localhost:4000/admin/services/${editingService.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingService),
        }).then(() => {
            setServices(
                services.map((service) =>
                    service.id === editingService.id ? editingService : service
                )
            );
            setEditingService(null);
        });
    };

    // Delete a service
    const deleteService = (id) => {
        fetch(`http://localhost:4000/admin/services/${id}`, { method: 'DELETE' }).then(() => {
            setServices(services.filter((service) => service.id !== id));
        });
    };

    return (
        <div className="service-table container mt-5">
            <h2 className="text-light text-center mb-4">Manage Services</h2>
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            {editingService?.id === service.id ? (
                                <>
                                    <td>{service.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingService.name}
                                            onChange={(e) =>
                                                setEditingService({
                                                    ...editingService,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingService.description}
                                            onChange={(e) =>
                                                setEditingService({
                                                    ...editingService,
                                                    description: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={editingService.price}
                                            onChange={(e) =>
                                                setEditingService({
                                                    ...editingService,
                                                    price: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={updateService}
                                        >
                                            Save
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{service.id}</td>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>${service.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setEditingService(service)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger ms-2"
                                            onClick={() => deleteService(service.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    <tr>
                        <td>#</td>
                        <td>
                            <input
                                type="text"
                                value={newService.name}
                                onChange={(e) =>
                                    setNewService({ ...newService, name: e.target.value })
                                }
                                placeholder="Service Name"
                                className="form-control"
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={newService.description}
                                onChange={(e) =>
                                    setNewService({ ...newService, description: e.target.value })
                                }
                                placeholder="Description"
                                className="form-control"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={newService.price}
                                onChange={(e) =>
                                    setNewService({ ...newService, price: e.target.value })
                                }
                                placeholder="Price"
                                className="form-control"
                            />
                        </td>
                        <td>
                            <button className="btn btn-success" onClick={addService}>
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ServiceTable;
