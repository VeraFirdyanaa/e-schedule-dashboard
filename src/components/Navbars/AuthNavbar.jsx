import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    let dashboardNav = null;
    let profileNav = null;
    let token = localStorage.getItem('token');

    if (token) {
      dashboardNav = (
        <NavItem>
          <NavLink className="nav-link-icon" to="/" tag={Link}>
            <i className="ni ni-planet" />
            <span className="nav-link-inner--text">Dashboard</span>
          </NavLink>
        </NavItem>
      );

      profileNav = (
        <NavItem>
          <NavLink
            className="nav-link-icon"
            to="/admin/user-profile"
            tag={Link}
          >
            <i className="ni ni-single-02" />
            <span className="nav-link-inner--text">Profile</span>
          </NavLink>
        </NavItem>
      )
    }
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
            <img style={{ width:130, height:130, marginTop: 50 }} alt="..." src={require("assets/img/brand/Logo-STMIK-BaniSaleh.jpg")} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                {dashboardNav}
                {/* <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem> */}
                {profileNav}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
