import React, { Component, Fragment } from 'react';

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
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner
} from "reactstrap";

import Header from "components/Headers/Header.jsx";
import API from '../../utils/Api';
import ReactDatetime from 'react-datetime';
import ImageUploader from 'react-images-upload';
import moment from 'moment';

class FormStudent extends Component {

  state = {
    loading: false,
    npm: '',
    name: '',
    pob: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    photo: null,
    photoSelected: false,
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
        API.get("api/students/" + this.props.match.params.id)
          .then(res => {
            console.log('res', res);
            this.setState({
              npm: res.data.npm,
              name: res.data.name,
              pob: res.data.pob,
              dob: moment(res.data.dob),
              gender: res.data.gender,
            })
          })
          .catch(err => {
            console.log('err', err);
            alert('err to get detail Student');
          })
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleDateChange = e => {
    this.setState({
      dob: new Date(e)
    })
  }

  onDrop = picture => {
    console.log('pricture', picture);
    this.setState({
      photoSelected: true
    });
    let fd = new FormData();
    fd.append('file', picture[0]);
    fd.append('upload_preset', 'bansal_scheduler');
    fetch("https://api.cloudinary.com/v1_1/dat7joee/image/upload", {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: fd
    })
      .then(res => {
        console.log('res', res);
        this.setState({
          photo: res.data.url
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  onSave = e => {
    let answer = window.confirm('Are you sure want to save this data ?');
    if (answer) {
      this.setState({
        submitting: true
      }, () => {
        if (!this.state.isEdit) {
          API.post("api/students", {
            npm: this.state.npm,
            name: this.state.name,
            pob: this.state.pob,
            dob: this.state.dob,
            gender: this.state.gender,
            email: this.state.email,
            password: this.state.password
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/students');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Creating Student');
            });
        } else {
          API.put("api/students/" + this.state.id, {
            npm: this.state.npm,
            name: this.state.name,
            pob: this.state.pob,
            dob: this.state.dob,
            gender: this.state.gender,
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/students');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err);
              alert('Error Creating Student');
            });
        }
      });
    }
  }

  render() {
    let photoMahasiswa = null;

    if (this.state.photoSelected && !this.state.photo) {
      photoMahasiswa = <Spinner type="grow" color="danger" />
    }

    if (this.state.photoSelected && this.state.photo) {
      photoMahasiswa = <img src={this.state.photo} alt="Foto Mahasiswa" style={{ width: 100, height: 100 }} />
    }

    return (
      <>
        <Header noStats={true} />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">{this.state.isEdit ? 'Edit' : 'New'} Student</h3>
                </CardHeader>
                <Form>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="npm" md={2}>NPM</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="NPM" name="npm" onChange={this.handleChange} value={this.state.npm} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Name</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Nama Mahasiswa" name="name" onChange={this.handleChange} value={this.state.name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Place of Birth</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Tempat Lahir" name="pob" onChange={this.handleChange} value={this.state.pob} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Date of Birth</Label>
                    <Col md={9}>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Date Picker Here"
                          }}
                          timeFormat={false}
                          onChange={this.handleDateChange}
                          value={this.state.dob}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="gender" md={2}>Gender</Label>
                    <Col md={9}>
                      <Input type="select" name="gender" placeholder="Jenis Kelamin" onChange={this.handleChange} value={this.state.gender}>
                        <option>------- Pilih Jenis Kelamin -------</option>
                        <option value="pria">Pria</option>
                        <option value="wanita">Wanita</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  {
                    this.state.isEdit ? null : (
                      <Fragment>
                        <FormGroup row style={{ marginLeft: 10 }}>
                          <Label htmlFor="name" md={2}>Photo</Label>
                          <Col md={9}>
                            {
                              this.state.photoSelected ? (
                                <div>{photoMahasiswa}</div>
                              ) : (
                                  < ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                  />)
                            }
                          </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginLeft: 10 }}>
                          <Label htmlFor="email" md={2}>Email</Label>
                          <Col md={9}>
                            <Input type="text" placeholder="Email" name="email" onChange={this.handleChange} />
                          </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginLeft: 10 }}>
                          <Label htmlFor="password" md={2}>Password</Label>
                          <Col md={9}>
                            <Input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                          </Col>
                        </FormGroup>
                      </Fragment>
                    )
                  }
                  <FormGroup>
                    <Col md={{ size: 9, offset: 2 }}>
                      <Button color="info" onClick={this.onSave}><i className="fas fa-save"></i>&nbsp;Simpan</Button>
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

export default FormStudent;