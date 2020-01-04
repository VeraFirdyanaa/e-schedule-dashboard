import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";

class Header extends React.Component {

  state = {
    user: null
  }

  componentWillMount() {
    let user = localStorage.getItem('user');
    console.log('user', user);
    if (user) {
      this.setState({
        user: JSON.parse(user)
      });
    }
  }

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              {!this.props.noStats ? (
                <>
                  <Row>
                    <Col lg="12" xl="12">
                      <h1 className="display-2 text-white">Welcome, {this.state.user ? (this.state.user.role !== 'admin' ? this.state.user.name : 'Admin') : 'John Doe'}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" xl="3" onClick={() => this.props.history.push('/admin/students')} style={{ cursor: 'pointer' }}>
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Students
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.props.analytics && this.props.analytics.students ? this.props.analytics.students : 0}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="ni ni-hat-3" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            {/* <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" />
                        </span>{" "} */}
                            <span className="text-nowrap">Total Mahasiswa</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0" onClick={() => this.props.history.push('/admin/lectures')} style={{ cursor: 'pointer' }}>
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Lectures
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.props.analytics && this.props.analytics.lectures ? this.props.analytics.lectures : 0}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                <i className="ni ni-circle-08" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            {/* <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" />
                        </span>{" "} */}
                            <span className="text-nowrap">Total Dosen</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0" onClick={() => this.props.history.push('/admin/courses')} style={{ cursor: 'pointer' }}>
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Mata Kuliah
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">{this.props.analytics && this.props.analytics.courses ? this.props.analytics.courses : 0}</span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                <i className="fas fa-journal-whills" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            {/* <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" />
                        </span>{" "} */}
                            <span className="text-nowrap">Total Mata Kuliah</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0" onClick={() => this.props.history.push('/admin/kelass')} style={{ cursor: 'pointer' }}>
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Kelas
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.props.analytics && this.props.analytics.kelas ? this.props.analytics.kelas : 0}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                <i className="fas fa-users" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            {/* <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" />
                        </span>{" "} */}
                            <span className="text-nowrap">Total Kelas</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 25 }}>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0" onClick={() => this.props.history.push('/admin/majors')} style={{ cursor: 'pointer' }}>
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Jurusan
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.props.analytics && this.props.analytics.majors ? this.props.analytics.majors : 0}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-dharmachakra" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            {/* <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" />
                        </span>{" "} */}
                            <span className="text-nowrap">Total Jurusan</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0" onClick={() => this.props.history.push('/admin/rooms')} style={{ cursor: 'pointer' }}>
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Ruang Kelas
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.props.analytics && this.props.analytics.rooms ? this.props.analytics.rooms : 0}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                <i className="fas fa-door-open" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            {/* <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" />
                        </span>{" "} */}
                            <span className="text-nowrap">Total Ruang Kelas</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </>
              ) : null}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Header);
