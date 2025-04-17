import React, { useEffect, useState } from 'react';
import {
  Button, Form, Table, Card, Container, Row, Col, Badge
} from 'react-bootstrap';
import {
  FiUsers, FiPackage, FiDollarSign, FiPlusCircle, FiUpload, FiMenu
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const sampleProducts = [
    {
      id: 1,
      name: 'Paracetamol',
      description: 'Pain reliever and fever reducer',
      stock: 100,
      uses: 'Headache, Fever',
      price: 5.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Ibuprofen',
      description: 'Anti-inflammatory medication',
      stock: 75,
      uses: 'Pain, Inflammation',
      price: 7.50,
      image: 'https://via.placeholder.com/150'
    }
  ];

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState(sampleProducts);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    image: null, name: '', description: '', stock: 0, uses: '', price: 0
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive' },
    ];
    const mockOrders = [
      { id: 1, userId: 1, productId: 101, quantity: 2, totalPrice: 24.99, status: 'completed' },
      { id: 2, userId: 2, productId: 102, quantity: 1, totalPrice: 12.99, status: 'shipped' },
      { id: 3, userId: 1, productId: 103, quantity: 3, totalPrice: 45.97, status: 'pending' },
    ];

    setUsers(mockUsers);
    setOrders(mockOrders);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newEntry = {
      id: products.length + 1,
      ...newProduct,
      image: previewImage || 'https://via.placeholder.com/150'
    };
    setProducts([...products, newEntry]);
    setNewProduct({ image: null, name: '', description: '', stock: 0, uses: '', price: 0 });
    setPreviewImage(null);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: 'success',
      active: 'success',
      shipped: 'primary',
      pending: 'warning',
      inactive: 'secondary'
    };
    return statusMap[status.toLowerCase()] || 'light';
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h4>MedPlusMart</h4>
        </div>
        <div className="sidebar-menu">
          <button
            className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiUsers className="sidebar-icon" /> Dashboard
          </button>
          <button
            className={`sidebar-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FiPackage className="sidebar-icon" /> Products
          </button>
          <button
            className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiDollarSign className="sidebar-icon" /> Orders
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${!sidebarOpen ? 'full-width' : ''}`}>
        <div className="content-header">
          <Button variant="light" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </Button>
          <h2>Admin Dashboard</h2>
          <div className="user-info">
            <span>Welcome, Admin</span>
            <div className="user-avatar">A</div>
          </div>
        </div>

        <div className="content-body">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <>
              <div className="dashboard-cards">
                <Card className="stat-card">
                  <Card.Body>
                    <FiUsers className="stat-icon" />
                    <Card.Title>{users.length}</Card.Title>
                    <Card.Text>Total Users</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="stat-card">
                  <Card.Body>
                    <FiPackage className="stat-icon" />
                    <Card.Title>{products.length}</Card.Title>
                    <Card.Text>Total Products</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="stat-card">
                  <Card.Body>
                    <FiDollarSign className="stat-icon" />
                    <Card.Title>{orders.length}</Card.Title>
                    <Card.Text>Total Orders</Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <Card className="section-card">
                <Card.Header><h5>Users Information</h5></Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr><th>ID</th><th>Name</th><th>Email</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td><Badge bg={getStatusBadge(user.status)}>{user.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </>
          )}

          {/* Products */}
          {activeTab === 'products' && (
            <>
              <Card className="section-card">
                <Card.Header><h5>Add New Product</h5></Card.Header>
                <Card.Body>
                  <Form onSubmit={handleAddProduct}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Image</Form.Label>
                          <div className="image-upload-container">
                            {previewImage ? (
                              <img src={previewImage} alt="preview" className="image-preview" />
                            ) : (
                              <div className="image-upload-placeholder">
                                <FiUpload size={32} />
                                <span>Upload</span>
                              </div>
                            )}
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="image-upload-input"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control name="name" value={newProduct.name} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" name="description" rows={2} value={newProduct.description} onChange={handleInputChange} required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Stock</Form.Label>
                          <Form.Control name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} required />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Price (₹)</Form.Label>
                          <Form.Control name="price" type="number" value={newProduct.price} onChange={handleInputChange} required />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Uses</Form.Label>
                          <Form.Control name="uses" value={newProduct.uses} onChange={handleInputChange} required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit"><FiPlusCircle className="me-2" />Add Product</Button>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="section-card mt-4">
                <Card.Header><h5>Product List</h5></Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr><th>ID</th><th>Image</th><th>Name</th><th>Stock</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td><img src={product.image} alt={product.name} className="product-thumbnail" /></td>
                          <td>{product.name}</td>
                          <td>{product.stock}</td>
                          <td>₹{product.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <Card className="section-card">
              <Card.Header><h5>Orders</h5></Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr><th>ID</th><th>User ID</th><th>Product ID</th><th>Quantity</th><th>Total Price</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.userId}</td>
                        <td>{order.productId}</td>
                        <td>{order.quantity}</td>
                        <td>₹{order.totalPrice.toFixed(2)}</td>
                        <td><Badge bg={getStatusBadge(order.status)}>{order.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
