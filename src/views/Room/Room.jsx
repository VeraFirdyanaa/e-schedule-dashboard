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

class Room extends Component {

  state = {
    rooms: [],
    total: 0,
    totalPage: 1,
    perPage: 10,
    page: 1,
    loading: false
  }

  componentDidMount() {
    this.getRooms();
  }

  getRooms = () => {
    API.get(`api/rooms?page=${this.state.page}&limit=${this.state.perPage}`)
      .then(res => {
        let total_page = res.data.total / 10;
        this.setState({
          rooms: res.data.rooms,
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
    }, () => this.getRooms())
  }

  deleteRoom = id => {
    let answer = window.confirm('Are you sure want to delete this Room ?');

    if (answer) {
      API.delete("api/rooms/" + id)
        .then(res => {
          console.log('res', res);
          alert('Data Berhasil Di Hapus')
          this.getRooms();
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
                      <h3 className="mb-0">Room List</h3>
                    </div>
                    <div className="col text-right">
                      <Button size="sm" color="success" onClick={() => this.props.history.push('/admin/rooms/create')}>New <i className="fas fa-plus"></i></Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nama Ruangan</th>
                      <th scope="col">Gedung</th>
                      <th scope="col">Jenis Pembelajaran</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rooms.map(room => (
                      <tr key={room._id}>
                        <td>{room.name}</td>
                        <td>{room.building}</td>
                        <td style={{ textTransform: 'capitalize' }}>{room.jenisPembelajaran}</td>
                        <td style={{ textTransform: 'capitalize', color: room.status === 'active' ? '#048535' : '#cf0202' }}>{room.status}</td>
                        <td>
                          <ButtonGroup>
                            <Button className="btn-icon btn-2" color="info" type="button" onClick={() => this.props.history.push({ pathname: '/admin/rooms/edit/' + room._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-pen" />
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2" color="danger" type="button" onClick={() => this.deleteRoom(room._id)}>
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

export default Room;