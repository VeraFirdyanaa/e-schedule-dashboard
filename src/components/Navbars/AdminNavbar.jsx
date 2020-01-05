import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Navbar,
  Nav,
  Container,
  NavItem
} from "reactstrap";

class AdminNavbar extends React.Component {

  onLogout = () => {
    localStorage.clear();
    this.props.history.push('/auth/login');
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-10 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <NavItem onClick={this.onLogout}>
                <a style={{ cursor: 'pointer', color: '#fff' }}>
                  <span className="mb-0 text-sm font-weight-bold">
                    <i className="ni ni-user-run" style={{ marginRight: 7 }}/>
                      Logout
                    </span>
                </a>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;