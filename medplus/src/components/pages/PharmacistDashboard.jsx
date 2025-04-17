import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Nav, Card, Badge, Button, 
  Offcanvas, ListGroup, Alert, Spinner, Table
} from 'react-bootstrap';
import { 
  House, Clipboard2Check, Capsule, Cart, People, 
  GraphUp, Bell, PersonCircle, List, Clock, 
  CheckCircle, ExclamationTriangle, Plus, Search
} from 'react-bootstrap-icons';
import '../pages/Pharmacist.css';

const PharmacistDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  // Check viewport on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 992);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data
  const dashboardData = {
    stats: {
      pendingPrescriptions: 8,
      lowStockItems: 5,
      todaysOrders: 23,
      expiringSoon: 3
    },
    prescriptions: [
      { id: 1, patient: 'John Doe', medicine: 'Paracetamol 500mg', status: 'pending', date: '2023-08-18', rxNumber: 'RX-1001' },
      { id: 2, patient: 'Jane Smith', medicine: 'Insulin Glargine', status: 'approved', date: '2023-08-17', rxNumber: 'RX-1002' }
    ],
    inventory: [
      { id: 1, name: 'Paracetamol 500mg', stock: 12, expiry: '2024-12-01', lowStock: false, category: 'Analgesic' },
      { id: 2, name: 'Insulin Glargine', stock: 3, expiry: '2024-10-01', lowStock: true, category: 'Antidiabetic' }
    ]
  };

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter data
  const filteredData = (data) => 
    data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  // Tab content rendering
  const renderTabContent = () => {
    if (isLoading) return <LoadingSpinner />;

    switch (activeTab) {
      case 'prescriptions':
        return (
          <>
            <DashboardHeader 
              title="Prescription Management"
              subtitle="Review and process patient prescriptions"
            />
            <SearchBar 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prescriptions..."
            />
            <PrescriptionSection 
              prescriptions={filteredData(dashboardData.prescriptions)} 
              stats={dashboardData.stats} 
            />
          </>
        );

      case 'inventory':
        return (
          <>
            <DashboardHeader 
              title="Inventory Management" 
              subtitle="Monitor medication stock levels" 
            />
            <SearchBar 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inventory..."
            />
            <StatsRow stats={dashboardData.stats} />
            <InventorySection inventory={filteredData(dashboardData.inventory)} />
          </>
        );

      default:
        return (
          <>
            <DashboardHeader 
              title="Dashboard Overview"
              subtitle={`Welcome back! Today is ${new Date().toLocaleDateString()}`}
            />
            <StatsRow stats={dashboardData.stats} />
            <DashboardOverview 
              prescriptions={dashboardData.prescriptions} 
              inventory={dashboardData.inventory} 
            />
          </>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      {isMobileView && (
        <header className="mobile-header">
          <Container fluid>
            <Row className="align-items-center g-0">
              <Col className="text-center">
                <h1 className="app-title">MedPlusMart</h1>
              </Col>
              <Col xs="auto">
                <Button 
                  variant="link" 
                  className="menu-toggle" 
                  onClick={() => setShowMobileMenu(true)}
                  aria-label="Toggle menu"
                >
                  <List size={24} />
                </Button>
              </Col>
            </Row>
          </Container>
        </header>
      )}

      {/* Main Content */}
      <Container fluid className="main-content-container">
        <Row className="g-0 main-content-row">
          {/* Desktop Sidebar */}
          {!isMobileView && (
            <Col md={3} className="sidebar-col">
              <Sidebar 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                stats={dashboardData.stats}
              />
            </Col>
          )}

          {/* Mobile Menu */}
          <MobileMenu 
            show={showMobileMenu} 
            onHide={() => setShowMobileMenu(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            stats={dashboardData.stats}
          />

          {/* Content Area */}
          <Col className="content-col">
            <Container fluid className="content-area">
              {renderTabContent()}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Reusable Components
const LoadingSpinner = () => (
  <div className="text-center py-5">
    <Spinner animation="border" variant="primary" />
    <p className="mt-3">Loading dashboard data...</p>
  </div>
);

const DashboardHeader = ({ title, subtitle }) => (
  <div className="dashboard-header mb-4">
    <h2>{title}</h2>
    <p className="text-muted">{subtitle}</p>
  </div>
);

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="search-bar mb-4">
    <div className="search-input-container">
      <Search className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input"
        aria-label={placeholder}
      />
    </div>
  </div>
);

const Sidebar = ({ activeTab, setActiveTab, stats }) => (
  <aside className="sidebar">
    <div className="sidebar-header">
      <h2 className="app-title">MedPlusMart</h2>
      <div className="user-info">
        <PersonCircle size={28} className="me-2" />
        <div>
          <div className="user-name">Dr. Sarah Johnson</div>
          <div className="user-role">Pharmacist</div>
        </div>
      </div>
    </div>
    
    <Nav variant="pills" className="flex-column sidebar-nav">
      <NavItem 
        icon={<House />} 
        title="Dashboard" 
        active={activeTab === 'dashboard'} 
        onClick={() => setActiveTab('dashboard')} 
      />
      <NavItem 
        icon={<Clipboard2Check />} 
        title="Prescriptions" 
        active={activeTab === 'prescriptions'} 
        onClick={() => setActiveTab('prescriptions')} 
        badge={stats.pendingPrescriptions}
      />
      <NavItem 
        icon={<Capsule />} 
        title="Inventory" 
        active={activeTab === 'inventory'} 
        onClick={() => setActiveTab('inventory')} 
        badge={stats.lowStockItems}
        badgeVariant="warning"
      />
    </Nav>
  </aside>
);

const MobileMenu = ({ show, onHide, activeTab, setActiveTab, stats }) => (
  <Offcanvas show={show} onHide={onHide} className="mobile-menu" placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Menu</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Nav variant="pills" className="flex-column">
        <NavItem 
          icon={<House />} 
          title="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => { setActiveTab('dashboard'); onHide(); }} 
          mobile
        />
        <NavItem 
          icon={<Clipboard2Check />} 
          title="Prescriptions" 
          active={activeTab === 'prescriptions'} 
          onClick={() => { setActiveTab('prescriptions'); onHide(); }} 
          badge={stats.pendingPrescriptions}
          mobile
        />
        <NavItem 
          icon={<Capsule />} 
          title="Inventory" 
          active={activeTab === 'inventory'} 
          onClick={() => { setActiveTab('inventory'); onHide(); }} 
          badge={stats.lowStockItems}
          badgeVariant="warning"
          mobile
        />
      </Nav>
    </Offcanvas.Body>
  </Offcanvas>
);

const NavItem = ({ icon, title, active, onClick, badge, badgeVariant = 'danger', mobile = false }) => (
  <Nav.Item>
    <Nav.Link 
      active={active} 
      onClick={onClick}
      className={`d-flex align-items-center ${mobile ? 'py-3' : ''}`}
    >
      {React.cloneElement(icon, { className: `me-3 ${mobile ? 'icon-lg' : ''}` })}
      <span>{title}</span>
      {badge > 0 && (
        <Badge bg={badgeVariant} pill className="ms-auto">
          {badge}
        </Badge>
      )}
    </Nav.Link>
  </Nav.Item>
);

const StatsRow = ({ stats }) => (
  <Row className="stats-row mb-4 g-3">
    <Col md={6} lg={3}>
      <StatCard 
        title="Pending Rx" 
        value={stats.pendingPrescriptions} 
        icon={<Clipboard2Check />} 
        variant="primary" 
      />
    </Col>
    <Col md={6} lg={3}>
      <StatCard 
        title="Today's Orders" 
        value={stats.todaysOrders} 
        icon={<Cart />} 
        variant="success" 
      />
    </Col>
    <Col md={6} lg={3}>
      <StatCard 
        title="Low Stock" 
        value={stats.lowStockItems} 
        icon={<ExclamationTriangle />} 
        variant="warning" 
      />
    </Col>
    <Col md={6} lg={3}>
      <StatCard 
        title="Expiring Soon" 
        value={stats.expiringSoon} 
        icon={<Clock />} 
        variant="danger" 
      />
    </Col>
  </Row>
);

const StatCard = ({ title, value, icon, variant }) => (
  <Card className={`stat-card ${variant}`}>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-uppercase">{title}</h6>
          <h3 className="mb-0">{value}</h3>
        </div>
        <div className={`icon-circle ${variant}`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
      </div>
    </Card.Body>
  </Card>
);

const PrescriptionSection = ({ prescriptions, stats }) => (
  <>
    <Card className="dashboard-card">
      <Card.Header>
        <Row className="align-items-center g-2">
          <Col>
            <h5>Pending Approvals ({stats.pendingPrescriptions})</h5>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" size="sm">
              <Plus size={16} className="me-1" /> New
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {prescriptions.filter(p => p.status === 'pending').length > 0 ? (
          <ListGroup variant="flush">
            {prescriptions.filter(p => p.status === 'pending').map(item => (
              <PrescriptionListItem key={item.id} item={item} status="pending" />
            ))}
          </ListGroup>
        ) : (
          <EmptyState message="No pending prescriptions found" />
        )}
      </Card.Body>
    </Card>

    <Card className="dashboard-card mt-4">
      <Card.Header>
        <h5>Recently Approved</h5>
      </Card.Header>
      <Card.Body>
        {prescriptions.filter(p => p.status === 'approved').length > 0 ? (
          <ListGroup variant="flush">
            {prescriptions.filter(p => p.status === 'approved').map(item => (
              <PrescriptionListItem key={item.id} item={item} status="approved" />
            ))}
          </ListGroup>
        ) : (
          <EmptyState message="No approved prescriptions found" />
        )}
      </Card.Body>
    </Card>
  </>
);

const PrescriptionListItem = ({ item, status }) => (
  <ListGroup.Item className="prescription-item">
    <Row className="align-items-center g-2">
      <Col xs="auto">
        {status === 'pending' ? (
          <Clock className="text-warning" size={20} />
        ) : (
          <CheckCircle className="text-success" size={20} />
        )}
      </Col>
      <Col>
        <div>
          <strong>{item.medicine}</strong>
          <div className="text-muted small">{item.patient} • RX: {item.rxNumber}</div>
        </div>
      </Col>
      <Col xs="auto">
        {status === 'pending' ? (
          <Button variant="outline-primary" size="sm">Review</Button>
        ) : (
          <Badge bg="success">Approved</Badge>
        )}
      </Col>
    </Row>
  </ListGroup.Item>
);

const InventorySection = ({ inventory }) => (
  <Card className="dashboard-card">
    <Card.Header>
      <Row className="align-items-center g-2">
        <Col>
          <h5>Medicine Inventory</h5>
        </Col>
        <Col xs="auto">
          <Button variant="primary" size="sm">
            <Plus size={16} className="me-1" /> Add Item
          </Button>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      {inventory.length > 0 ? (
        <div className="table-responsive">
          <Table hover className="mb-0">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Category</th>
                <th className="text-center">Stock</th>
                <th className="text-end">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <InventoryTableRow key={item.id} item={item} />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <EmptyState message="No inventory items found" />
      )}
    </Card.Body>
  </Card>
);

const InventoryTableRow = ({ item }) => (
  <tr className={item.lowStock ? 'table-warning' : ''}>
    <td>
      <strong>{item.name}</strong>
      {item.lowStock && <Badge bg="warning" pill className="ms-2">Low</Badge>}
    </td>
    <td>{item.category}</td>
    <td className="text-center">{item.stock}</td>
    <td className="text-end">{item.expiry}</td>
  </tr>
);

const DashboardOverview = ({ prescriptions, inventory }) => (
  <Row className="g-3">
    <Col lg={6}>
      <Card className="dashboard-card h-100">
        <Card.Header>
          <h5>Recent Prescriptions</h5>
        </Card.Header>
        <Card.Body>
          {prescriptions.length > 0 ? (
            <ListGroup variant="flush">
              {prescriptions.slice(0, 4).map(item => (
                <PrescriptionListItem key={item.id} item={item} status={item.status} />
              ))}
            </ListGroup>
          ) : (
            <EmptyState message="No recent prescriptions" />
          )}
        </Card.Body>
      </Card>
    </Col>
    
    <Col lg={6}>
      <Card className="dashboard-card h-100">
        <Card.Header>
          <h5>Inventory Alerts</h5>
        </Card.Header>
        <Card.Body>
          {inventory.filter(i => i.lowStock).length > 0 ? (
            <ListGroup variant="flush">
              {inventory.filter(i => i.lowStock).map(item => (
                <InventoryAlertItem key={item.id} item={item} />
              ))}
            </ListGroup>
          ) : (
            <EmptyState message="No inventory alerts" variant="success" />
          )}
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

const InventoryAlertItem = ({ item }) => (
  <ListGroup.Item className="inventory-alert-item">
    <Row className="align-items-center g-2">
      <Col xs="auto">
        <ExclamationTriangle className="text-warning" size={20} />
      </Col>
      <Col>
        <strong>{item.name}</strong>
        <div className="text-muted small">{item.category}</div>
      </Col>
      <Col xs="auto">
        <Badge bg="danger" pill>{item.stock} left</Badge>
      </Col>
      <Col xs="auto">
        <Button variant="outline-primary" size="sm">Reorder</Button>
      </Col>
    </Row>
  </ListGroup.Item>
);

const EmptyState = ({ message, variant = 'secondary' }) => (
  <div className="empty-state">
    <div className={`empty-icon ${variant}`}>
      {variant === 'success' ? (
        <CheckCircle size={24} />
      ) : (
        <ExclamationTriangle size={24} />
      )}
    </div>
    <p className="text-muted">{message}</p>
  </div>
);

export default PharmacistDashboard;