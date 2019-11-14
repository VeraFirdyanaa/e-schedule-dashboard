import React, { Component } from 'react';

import {
  Container,
  Row,
  Card,
  CardHeader,
  Table,
  ButtonGroup,
  Button,
  CardFooter,
} from "reactstrap";

import Header from "components/Headers/Header.jsx";
import API from '../../utils/Api';
import PaginationComponent from "components/Pagination/PaginationComponent.jsx";

class StudyYear extends Component {

  state = {
    studyYears: [],
    total: 0,
    totalPage: 1,
    perPage: 10,
    page: 1,
    loading: false
  }

  componentDidMount() {
    this.getStudyYears();
  }

  getStudyYears = () => {
    API.get(`api/studyYears?page=${this.state.page}&limit=${this.state.perPage}`)
      .then(res => {
        let total_page = res.data.total / 10;
        this.setState({
          studyYears: res.data.studyYears,
          total: res.data.total,
          totalPage: Math.ceil(total_page)
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  changePage = page => {
    console.log('changing page', page);
    this.setState({
      page: page
    }, () => this.getStudyYears())
  }

  deleteStudyYear = id => {
    let answer = window.confirm('Are you sure want to delete this StudyYear ?');

    if (answer) {
      API.delete("api/studyYears/" + id)
        .then(res => {
          console.log('res', res);
          alert('Data Berhasil Di Hapus')
          this.getStudyYears();
        })
        .catch(err => {
          console.log('err', err);
          alert('Data Gagal Di Hapus');
        });
    }
  }

  render() {
    let pages = new Array(this.state.totalPage);
    console.log(pages.length);
    return (
      <>
        <Header noStats={true} />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Study Year List</h3>
                    </div>
                    <div className="col text-right">
                      <Button size="sm" color="success" onClick={() => this.props.history.push('/admin/studyYears/create')}>New <i className="fas fa-plus"></i></Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Kode Tahun Ajaran</th>
                      <th scope="col">Tahun Mulai</th>
                      <th scope="col">Tahun Berakhir</th>
                      <th scope="col">Semester</th>
                      <th scope="col">Stage</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.studyYears.map(studyYear => (
                      <tr key={studyYear._id}>
                        <td>{studyYear.code}</td>
                        <td>{studyYear.startYear}</td>
                        <td>{studyYear.endYear}</td>
                        <td style={{ textTransform: 'capitalize' }}>{studyYear.semester}</td>
                        <td style={{ textTransform: 'capitalize', color: studyYear.stage === 'processing' ? '#048535' : '#cf0202' }}>{studyYear.stage === 'init' ? 'Inisialisasi' : studyYear.stage}</td>
                        <td style={{ textTransform: 'capitalize', color: studyYear.status === 'active' ? '#048535' : '#cf0202' }}>{studyYear.status}</td>
                        <td>
                          <ButtonGroup>
                            <Button className="btn-icon btn-2" color="default" type="button" onClick={() => this.props.history.push({ pathname: '/admin/studyYears/detail/' + studyYear._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-eye" />
                              </span>
                            </Button>
                            {/* {studyYear.stage === 'init' && studyYear.status === 'active' ? (
                              <Button className="btn-icon btn-2" color="warning" type="button">
                                <span className="btn-inner--icon">
                                  <i className="fas fa-binoculars" />
                                </span>
                              </Button>
                            ) : null} */}
                            <Button className="btn-icon btn-2" color="info" type="button" onClick={() => this.props.history.push({ pathname: '/admin/studyYears/edit/' + studyYear._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-pen" />
                              </span>
                            </Button>
                            {studyYear.stage === 'init' ? (
                              <Button className="btn-icon btn-2" color="danger" type="button" onClick={() => this.deleteStudyYear(studyYear._id)}>
                                <span className="btn-inner--icon">
                                  <i className="fas fa-trash" />
                                </span>
                              </Button>
                            ) : null}
                          </ButtonGroup>
                        </td>
                      </tr>
                    )
                    )}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <PaginationComponent
                      totalItems={this.state.total}
                      pageSize={this.state.perPage}
                      onSelect={this.changePage}
                      activePage={this.state.page}
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    />
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    )
  }
}

export default StudyYear;