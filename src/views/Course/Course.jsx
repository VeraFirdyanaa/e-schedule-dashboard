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

class Course extends Component {

  state = {
    courses: [],
    total: 0,
    totalPage: 1,
    perPage: 10,
    page: 1,
    loading: false
  }

  componentDidMount() {
    this.getCourses();
  }

  getCourses = () => {
    API.get(`api/courses?page=${this.state.page}&limit=${this.state.perPage}`)
      .then(res => {
        let total_page = res.data.total / 10;
        this.setState({
          courses: res.data.courses,
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
    }, () => this.getCourses())
  }

  deleteCourse = id => {
    let answer = window.confirm('Are you sure want to delete this Course ?');

    if (answer) {
      API.delete("api/courses/" + id)
        .then(res => {
          console.log('res', res);
          alert('Data Berhasil Di Hapus')
          this.getCourses();
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
                      <h3 className="mb-0">Course List</h3>
                    </div>
                    <div className="col text-right">
                      <Button size="sm" color="success" onClick={() => this.props.history.push('/admin/courses/create')}>New <i className="fas fa-plus"></i></Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Kode Mata Kuliah</th>
                      <th scope="col">Nama Mata Kuliah</th>
                      <th scope="col">SKS</th>
                      <th scope="col">Semester Kelas</th>
                      <th scope="col">Semester</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.courses.map(course => (
                      <tr key={course._id}>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.sks}</td>
                        <td>{course.angkaKelas}</td>
                        <td style={{ textTransform: 'capitalize' }}>{course.semester}</td>
                        <td style={{ textTransform: 'capitalize', color: course.status === 'active' ? '#048535' : '#cf0202' }}>{course.status}</td>
                        <td>
                          <ButtonGroup>
                            <Button className="btn-icon btn-2" color="default" type="button" onClick={() => this.props.history.push({ pathname: '/admin/courses/detail/' + course._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-eye" />
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2" color="info" type="button" onClick={() => this.props.history.push({ pathname: '/admin/courses/edit/' + course._id })}>
                              <span className="btn-inner--icon">
                                <i className="fas fa-pen" />
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2" color="danger" type="button" onClick={() => this.deleteCourse(course._id)}>
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

export default Course;