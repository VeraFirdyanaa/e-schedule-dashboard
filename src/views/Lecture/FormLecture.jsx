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

class FormLecture extends Component {

  state = {
    loading: false,
    nid: null,
    name: null,
    pob: null,
    photo: null,
    photoSelected: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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

  render() {
    let photoDosen = null;

    if (this.state.photoSelected && !this.state.photo) {
      photoDosen = <Spinner type="grow" color="danger" />
    }

    if (this.state.photoSelected && this.state.photo) {
      photoDosen = <img src={this.state.photo} alt="Foto Dosen" style={{ width: 100, height: 100 }} />
    }

    return (
      <>
        <Header noStats={true} />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">New Lecture</h3>
                </CardHeader>
                <Form>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="nid" md={2}>NID</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Nomor Induk Dosen" name="nid" onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Name</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Nama Dosen" name="name" onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Place of Birth</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Tempat Lahir" name="pob" onChange={this.handleChange} />
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
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Gender</Label>
                    <Col md={9}>
                      <Input type="select" name="select" placeholder="Jenis Kelamin" onChange={this.handleChange}>
                        <option>------- Pilih Jenis Kelamin -------</option>
                        <option value="pria">Pria</option>
                        <option value="wanita">Wanita</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Photo</Label>
                    <Col md={9}>
                      {
                        this.state.photoSelected ? (
                          <div>{photoDosen}</div>
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
                </Form>
              </Card>
            </div>
          </Row>
        </Container >
      </>
    )
  }
}

export default FormLecture;