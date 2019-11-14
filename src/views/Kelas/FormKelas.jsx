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

class FormKelas extends Component {

  state = {
    loading: false,
    code: '',
    major: '',
    status: '',
    semester: '',
    angkaKelas: 0,
    classType: '',
    majors: [],
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
        API.get("api/kelass/" + this.props.match.params.id)
          .then(res => {
            console.log('res detail kelas', res);
            this.setState({
              code: res.data.code,
              major: res.data.major,
              status: res.data.status,
              semester: res.data.semester,
              angkaKelas: res.data.angkaKelas,
              classType: res.data.classType
            })
          })
          .catch(err => {
            console.log('err', err);
            alert('err to get detail Kelas');
          })
      });
    }
  }

  componentDidMount() {
    this.getMajorList();
  }

  getMajorList = () => {
    API.get("api/majors/all")
      .then(res => {
        console.log('res list major', res);
        this.setState({
          majors: res.data
        });
      })
      .catch(err => {
        console.log('err', err);
        alert('err to get major list');
      });
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
          API.post("api/kelass", {
            code: this.state.code,
            major: this.state.major,
            status: this.state.status,
            semester: this.state.semester,
            angkaKelas: this.state.angkaKelas,
            classType: this.state.classType
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/kelass');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Creating Kelas');
            });
        } else {
          API.put("api/kelass/" + this.state.id, {
            code: this.state.code,
            major: this.state.major,
            status: this.state.status,
            semester: this.state.semester,
            angkaKelas: this.state.angkaKelas,
            classType: this.state.classType
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/kelass');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Updating Kelas');
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
                  <h3 className="mb-0">{this.state.isEdit ? 'Edit' : 'New'} Kelas</h3>
                </CardHeader>
                <Form>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="code" md={2}>Nama Kelas</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Nama Kelas" name="code" onChange={this.handleChange} value={this.state.code} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="major" md={2}>Jurusan</Label>
                    <Col md={9}>
                      <Input type="select" name="major" placeholder="Status" onChange={this.handleChange} value={this.state.major}>
                        <option>------- Pilih Jurusan -------</option>
                        {
                          this.state.majors.map(major => <option key={major._id} value={major._id}>{major.level} - {major.name}</option>)
                        }
                        {/* <option value="active">Aktif</option> */}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="angkaKelas" md={2}>Angka Kelas</Label>
                    <Col md={9}>
                      <Input type="number" placeholder="Angka Kelas" name="angkaKelas" onChange={this.handleChange} value={this.state.angkaKelas} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="classType" md={2}>Jenis Kelas</Label>
                    <Col md={9}>
                      <Input type="select" name="classType" placeholder="Jenis Kelas" onChange={this.handleChange} value={this.state.classType}>
                        <option>------- Pilih Jenis Kelas -------</option>
                        <option value="reguler">Reguler Pagi</option>
                        <option value="malam">Reguler Malam</option>
                        <option value="ekstension">Ekstension</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="semester" md={2}>Semester</Label>
                    <Col md={9}>
                      <Input type="select" name="semester" placeholder="Semester" onChange={this.handleChange} value={this.state.semester}>
                        <option>------- Pilih Semester -------</option>
                        <option value="ganjil">Ganjil</option>
                        <option value="genap">Genap</option>
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

export default FormKelas;