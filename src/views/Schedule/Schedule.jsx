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

class Schedule extends Component {

  state = {
    schedules: [],
    total: 0,
    totalPage: 1,
    perPage: 10,
    page: 1,
    loading: false
  }

  componentDidMount() {
    this.getSchedules();
  }

  getSchedules = () => {
    API.get(`api/schedules?page=${this.state.page}&limit=${this.state.perPage}`)
      .then(res => {
        let total_page = res.data.total / 10;
        this.setState({
          schedules: res.data.schedules,
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
    }, () => this.getSchedules())
  }

  deleteSchedule = id => {
    let answer = window.confirm('Are you sure want to delete this Schedule ?');

    if (answer) {
      API.delete("api/schedules/" + id)
        .then(res => {
          console.log('res', res);
          alert('Data Berhasil Di Hapus')
          this.getSchedules();
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
                      <h3 className="mb-0">Schedule List</h3>
                    </div>
                    <div className="col text-right">
                      <Button size="sm" color="success" onClick={() => this.props.history.push('/admin/schedules/create')}>New <i className="fas fa-plus"></i></Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Tahun Ajaran</th>
                      <th scope="col">Sudah di Publikasi</th>
                      <th scope="col">Status Persetujuan</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.schedules.map(schedule => (
                      <tr key={schedule._id}>
                        <td>{schedule.studyYear ? schedule.studyYear.code : '-'}</td>
                        <td>{schedule.publish ? 'Ya' : 'Tidak'}</td>
                        <td style={{ textTransform: 'capitalize' }}>{schedule.agreedSteps}</td>
                        <td>
                          <ButtonGroup>
                            <Button className="btn-icon btn-2" color="default" type="button" onClick={() => this.props.history.push({ pathname: '/admin/schedules/detail/' + schedule._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-eye" />
                              </span>
                            </Button>
                            {/* <Button className="btn-icon btn-2" color="info" type="button" onClick={() => this.props.history.push({ pathname: '/admin/schedules/edit/' + schedule._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-pen" />
                              </span>
                            </Button> */}
                            <Button className="btn-icon btn-2" color="danger" type="button" onClick={() => this.deleteSchedule(schedule._id)}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-trash" />
                              </span>
                            </Button>
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

export default Schedule;