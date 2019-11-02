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
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import Header from "components/Headers/Header.jsx";
import API from '../../utils/Api';
import moment from 'moment';

class Lecture extends Component {

  state = {
    lectures: [],
    total: 0,
    totalPage: 1,
    loading: false
  }

  componentDidMount() {
    this.getLectures();
  }

  getLectures = () => {
    API.get("api/lectures")
      .then(res => {
        let total_page = res.data.total / 10;
        this.setState({
          lectures: res.data.lectures,
          total: res.data.total,
          totalPage: Math.ceil(total_page)
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  deleteLecture = id => {
    let answer = window.confirm('Are you sure want to delete this Lecture ?');

    if (answer) {
      API.delete("api/lectures/" + id)
        .then(res => {
          console.log('res', res);
          alert('Data Berhasil Di Hapus')
          this.getLectures();
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
                  <Row>
                    <div className="col-11">
                      <h2 className="mb-0">Lecture List</h2>
                    </div>
                    <div className="col-1">
                      <Button color="success" onClick={() => this.props.history.push('/admin/lectures/create')}>New <i className="fas fa-plus"></i></Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">NID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Date Of Birth</th>
                      <th scope="col">Place of Birth</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Photo</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.lectures.map(lecture => (
                      <tr key={lecture._id}>
                        <td>{lecture.nid}</td>
                        <td>{lecture.name}</td>
                        <td>{moment(lecture.dob).format("DD/MM/YYYY")}</td>
                        <td>{lecture.pob}</td>
                        <td style={{ textTransform: 'capitalize' }}>{lecture.gender}</td>
                        <td><img src={lecture.photo} style={{ width: 60, height: 60 }} alt="Foto Dosen" /></td>
                        <td>
                          <ButtonGroup>
                            <Button className="btn-icon btn-2" color="info" type="button" onClick={() => this.props.history.push({ pathname: '/admin/lectures/edit/' + lecture._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-pen" />
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2" color="danger" type="button" onClick={() => this.deleteLecture(lecture._id)}>
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
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        {/* {pages.map((p, i) => ( */}
                        <PaginationLink
                          href="#"
                          onClick={e => e.preventDefault()}
                        >
                          {1}
                        </PaginationLink>
                        {/* ))} */}
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
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

export default Lecture;