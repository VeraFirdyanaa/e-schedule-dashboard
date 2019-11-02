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

class FormMajor extends Component {

  state = {
    loading: false,
    code: '',
    level: '',
    head: '',
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
        API.get("api/majors/" + this.props.match.params.id)
          .then(res => {
            console.log('res detail major', res);
            this.setState({
              code: res.data.code,
              name: res.data.name,
              level: res.data.level,
              head: res.data.head,
              status: res.data.status
            })
          })
          .catch(err => {
            console.log('err', err);
            alert('err to get detail Major');
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
          API.post("api/majors", {
            code: this.state.code,
            name: this.state.name,
            level: this.state.level,
            head: this.state.head,
            status: this.state.status
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/majors');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Creating Major');
            });
        } else {
          API.put("api/majors/" + this.state.id, {
            code: this.state.code,
            name: this.state.name,
            level: this.state.level,
            head: this.state.head,
            status: this.state.status
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/majors');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Updating Major');
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
                  <h3 className="mb-0">{this.state.isEdit ? 'Edit' : 'New'} Major</h3>
                </CardHeader>
                <Form>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="code" md={2}>Kode Jurusan</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Kode Jurusan" name="code" onChange={this.handleChange} value={this.state.code} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Nama Jurusan</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Nama Jurusan" name="name" onChange={this.handleChange} value={this.state.name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="head" md={2}>Kepala Jurusan</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Kepala Jurusan" name="head" onChange={this.handleChange} value={this.state.head} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="level" md={2}>Jenjang</Label>
                    <Col md={9}>
                      <Input type="select" name="level" placeholder="Jenis Kelamin" onChange={this.handleChange} value={this.state.level}>
                        <option>------- Pilih Jenjang -------</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                        <option value="D3">D3</option>
                      </Input>
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

export default FormMajor;