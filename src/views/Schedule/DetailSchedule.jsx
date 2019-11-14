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
import moment from 'moment';

class DetailSchedule extends Component {

  state = {
    detailSchedules: [],
    conflicts: [],
    isEdit: false,
    isDetail: false,
    id: null
    // total: 0,
    // totalPage: 1,
    // perPage: 10,
    // page: 1,
    // loading: false
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.getDetailSchedules();
    }
  }

  getDetailSchedules = () => {
    let isDetail = this.props.match.path.indexOf("detail") > -1 ? true : false;
    this.setState({
      isEdit: isDetail ? false : true,
      isDetail: isDetail ? true : false,
      id: this.props.match.params.id
    }, () => {
      API.get("api/schedules/" + this.props.match.params.id)
        .then(res => {
          console.log('res detail schedule', res);
          this.setState({
            detailSchedules: res.data ? res.data.scheduleList : [],
            conflicts: res.data ? res.data.conflictList : []
          });
        })
        .catch(err => {
          console.log('err', err);
          alert('err to get detail StudyYear');
        })
    });
  }

  // changePage = page => {
  //   console.log('changing page', page);
  //   this.setState({
  //     page: page
  //   }, () => this.getDetailSchedules())
  // }

  render() {
    // let pages = new Array(this.state.totalPage);
    // console.log(pages.length);
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
                      <h3 className="mb-0">Detail Jadwal Perkuliahan</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Kelas</th>
                      <th scope="col">Hari</th>
                      <th scope="col">Waktu Perkuliahan</th>
                      <th scope="col">Mata Kuliah</th>
                      <th scope="col">Dosen</th>
                      <th scope="col">Jenis Kelas</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.detailSchedules.map(detailSchedule => (
                      <tr key={detailSchedule._id}>
                        <td>{detailSchedule.kelas.code}</td>
                        <td style={{ textTransform: 'capitalize' }}>{detailSchedule.day}</td>
                        <td>{moment(detailSchedule.startTime).format("HH:mm")}</td>
                        <td>{detailSchedule.course.name}</td>
                        <td>{detailSchedule.lecture.name}</td>
                        <td style={{ textTransform: 'capitalize' }}>{detailSchedule.classType}</td>
                      </tr>
                    )
                    )}
                  </tbody>
                </Table>
                <Row className="align-items-center">
                  <div className="col" style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                    <h3 className="mb-0">Jadwal Bentrok</h3>
                  </div>
                </Row>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Kelas</th>
                      <th scope="col">Hari</th>
                      <th scope="col">Waktu Perkuliahan</th>
                      <th scope="col">Mata Kuliah</th>
                      <th scope="col">Dosen</th>
                      <th scope="col">Jenis Kelas</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.conflicts.map(cnf => (
                      <tr key={cnf._id}>
                        <td>{cnf.kelas.code}</td>
                        <td style={{ textTransform: 'capitalize' }}>{cnf.day}</td>
                        <td>{moment(cnf.startTime).format("HH:mm")}</td>
                        <td>{cnf.course.name}</td>
                        <td>{cnf.lecture.name}</td>
                        <td style={{ textTransform: 'capitalize' }}>{cnf.classType}</td>
                      </tr>
                    )
                    )}
                  </tbody>
                </Table>
                {/* <CardFooter className="py-4">
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
                </CardFooter> */}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    )
  }
}

export default DetailSchedule;