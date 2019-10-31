import React, { Component } from 'react';

import {
  Container,
  Row,
  Card,
  CardHeader,
  Table,
  ButtonGroup,
  Button
} from "reactstrap";

import Header from "components/Headers/Header.jsx";
import API from '../../utils/Api';
import moment from 'moment';

class Lecture extends Component {

  state = {
    lectures: [],
    total: 0,
    loading: false
  }

  componentDidMount() {
    this.getLectures();
  }

  getLectures = () => {
    API.get("api/lectures")
      .then(res => {
        console.log('res', res);
        this.setState({
          lectures: res.data.lectures,
          total: res.data.total
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  render() {
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
                            <Button className="btn-icon btn-2" color="info" type="button">
                              <span className="btn-inner--icon">
                                <i className="fas fa-pen" />
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2" color="danger" type="button">
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
              </Card>
            </div>
          </Row>
        </Container>
      </>
    )
  }
}

export default Lecture;