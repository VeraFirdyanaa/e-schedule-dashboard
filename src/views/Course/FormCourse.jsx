import React, { Component } from 'react';

import {
  Container,
  Row,
  Card,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";

import Header from "components/Headers/Header.jsx";
import API from '../../utils/Api';

class FormCourse extends Component {

  state = {
    loading: false,
    code: '',
    sks: 1,
    status: '',
    name: '',
    isEdit: false,
    id: null,
    submitting: false
  }

  componentWillMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.setState({
        isEdit: true,
        id: this.props.match.params.id
      }, () => {
        API.get("api/courses/" + this.props.match.params.id)
          .then(res => {
            console.log('res detail course', res);
            this.setState({
              code: res.data.code,
              name: res.data.name,
              sks: res.data.sks,
              status: res.data.status
            })
          })
          .catch(err => {
            console.log('err', err);
            alert('err to get detail Course');
          })
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSave = e => {
    let answer = window.confirm('Are you sure want to save this data ?');
    if (answer) {
      this.setState({
        submitting: true
      }, () => {
        if (!this.state.isEdit) {
          API.post("api/courses", {
            code: this.state.code,
            name: this.state.name,
            sks: this.state.sks,
            status: this.state.status
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/courses');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Creating Course');
            });
        } else {
          API.put("api/courses/" + this.state.id, {
            code: this.state.code,
            name: this.state.name,
            sks: this.state.sks,
            status: this.state.status
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/courses');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Updating Course');
            });
        }
      })
    }
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
                  <h3 className="mb-0">{this.state.isEdit ? 'Edit' : 'New'} Course</h3>
                </CardHeader>
                <Form>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="code" md={2}>Kode Mata Kuliah</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Kode Mata Kuliah" name="code" onChange={this.handleChange} value={this.state.code} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Nama Mata Kuliah</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Nama Mata Kuliah" name="name" onChange={this.handleChange} value={this.state.name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="sks" md={2}>Jumlah SKS</Label>
                    <Col md={9}>
                      <Input type="number" placeholder="Jumlah SKS" name="sks" onChange={this.handleChange} value={this.state.sks} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="status" md={2}>Status</Label>
                    <Col md={9}>
                      <Input type="select" name="status" placeholder="Status" onChange={this.handleChange} value={this.state.status}>
                        <option>------- Pilih Status Jurusan -------</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col md={{ size: 9, offset: 2 }}>
                      <Button color="info" onClick={this.onSave} disabled={this.state.submitting}><i className="fas fa-save"></i>&nbsp;Simpan</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Card>
            </div>
          </Row>
        </Container >
      </>
    )
  }
}

export default FormCourse;