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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col
} from "reactstrap";
import ReactDatetime from 'react-datetime';

import Header from "components/Headers/Header.jsx";
import API from '../../utils/Api';
import PusherService from '../../components/services/pusher.service';
import moment from 'moment';

class FormStudyYear extends Component {

  state = {
    loading: false,
    code: '',
    status: '',
    startYear: '',
    endYear: '',
    semester: 'ganjil',
    stage: null,
    isEdit: false,
    isDetail: false,
    id: null,
    submitting: false,
    scheduleUrl: null,
    scheduleId: null,
    endTeachingPlan: null,
    results: null
  }

  componentWillMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.getDetail();
    }
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      let PsService = new PusherService();

      PsService.bind('status', data => {
        console.log('status', data);
        if (data) {
          // this.setState({
          //   results: data
          // });
          this.getDetail();
        }
      });
    }
  }

  getDetail = () => {
    let isDetail = this.props.match.path.indexOf("detail") > -1 ? true : false;
    this.setState({
      isEdit: isDetail ? false : true,
      isDetail: isDetail ? true : false,
      id: this.props.match.params.id
    }, () => {
      API.get("api/studyYears/" + this.props.match.params.id)
        .then(res => {
          console.log('res detail studyYear', res);
          this.setState({
            code: res.data.code,
            startYear: res.data.startYear,
            endYear: res.data.endYear,
            semester: res.data.semester,
            stage: res.data.stage,
            status: res.data.status,
            endTeachingPlan: res.data.endTeachingPlan ? res.data.endTeachingPlan : null,
            scheduleId: res.data && res.data.scheduleId ? res.data.scheduleId : null
          });
        })
        .catch(err => {
          console.log('err', err);
          alert('err to get detail StudyYear');
        })
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
          API.post("api/studyYears", {
            // code: this.state.code,
            startYear: this.state.startYear,
            endYear: this.state.endYear,
            semester: this.state.semester,
            status: this.state.status
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/studyYears');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              console.log('err', err.response);
              let response = err.response;
              if (response && response.data && response.data.message) {
                alert(response.data.message)
              } else {
                alert('Error Creating StudyYear');
              }
            });
        } else {
          API.put("api/studyYears/" + this.state.id, {
            code: this.state.code,
            startYear: this.state.startYear,
            endYear: this.state.endYear,
            semester: this.state.semester,
            status: this.state.status,
            stage: this.state.stage
          })
            .then(res => {
              this.setState({
                submitting: false
              });
              console.log('res', res);
              alert('Data Berhasil Disimpan!');
              this.props.history.push('/admin/studyYears');
            })
            .catch(err => {
              this.setState({
                submitting: false
              });
              let response = err.response;
              if (response && response.data && response.data.message) {
                alert(response.data.message)
              } else {
                alert('Error Updating StudyYear');
              }
            });
        }
      })
    }
  }

  handleDateChange = e => {
    this.setState({
      endTeachingPlan: new Date(e)
    })
  }

  goToPageResolver = () => {
    console.log('go to manual scheduling page ...');
  }

  startAutomation = (automationType, studyYearId) => {
    console.log('starting Automation ...');
    let ans = window.confirm('Apakah kamu yakin ingin Memulai Penjadawalan ?');
    if (ans) {
      API.post(`/api/studyYears/automation?scheduler=${automationType}&id=${studyYearId}`, {
        endTeachingPlan: this.state.stage === 'init' ? this.state.endTeachingPlan : null
      })
        .then(res => {
          console.log('res', res);
          this.getDetail();
          if (res && res.data && res.data.message) {
            alert(res.data.message);
          } else {
            alert('Berhasil Memulai Penjadwalan!');
          }
        })
        .catch(err => {
          let response = err.response;
          if (response && response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert('Error to Start Automation!');
          }
        });
    }
  }

  getStage = (stage, studyYearId) => {
    let result = {
      stage: stage,
      color: '#AAABC',
      buttonText: 'Mulai Penjadwalan',
      disabled: false,
      action: null
    }

    switch (stage) {
      case 'init':
        result.stage = 'Belum Berjalan';
        result.action = () => this.startAutomation('notified', studyYearId);
        break;
      case 'notified':
        result = {
          stage: `Proses Teaching Plan oleh Dosen hingga ${this.state.endTeachingPlan ? moment(this.state.endTeachingPlan).format("DD/MM/YYYY") : "-"}`,
          color: 'orange',
          buttonText: 'Sedang berjalan ...',
          disabled: true
        };
        break;
      case 'ready':
        result = {
          stage: 'Teaching Plan Selesai, Siap Untuk Menjalankan Automation',
          color: 'blue',
          buttonText: 'Jalankan Automation',
          disabled: false,
          action: () => this.startAutomation('start', studyYearId)
        }
        break;
      case 'running':
        result = {
          stage: 'Schedule Automation Sedang Berjalan',
          color: 'info',
          buttonText: 'Sedang berjalan ...',
          disabled: true,
        }
        break;
      case 'conflict':
        result = {
          stage: 'Terjadi Bentrok Pada Penjadwalan, Harap Melakukan Penjadwalan Manual untuk Data yang Bentrok',
          color: 'red',
          buttonText: 'Resolve Conflict',
          disabled: false,
          action: this.goToPageResolver
        }
        break;
      case 'completed':
        result = {
          stage: 'Jadwal Mata Kuliah Berhasil Dibuat',
          color: 'green',
          buttonText: 'Berhasil Dibuat',
          disabled: false,
          action: () => this.props.history.push('/admin/schedules/detail/' + this.state.scheduleId)
        }
      default:
        return result;
    }

    return result
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
                  <h3 className="mb-0">{this.state.isEdit ? 'Edit' : 'New'} StudyYear</h3>
                </CardHeader>
                <Form>
                  {this.state.isDetail ? (
                    <FormGroup row style={{ marginLeft: 10 }}>
                      <Label htmlFor="code" md={2}>Kode Tahun Ajaran</Label>
                      <Col md={9}>
                        <Input type="text" placeholder="Kode Tahun Ajaran" name="code" onChange={this.handleChange} value={this.state.code} disabled={true} />
                      </Col>
                    </FormGroup>
                  ) : null}
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="startYear" md={2}>Tahun Mulai</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Tahun Mulai" name="startYear" onChange={this.handleChange} value={this.state.startYear} disabled={this.state.isDetail} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="endYear" md={2}>Tahun Berakhir</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Tahun Berakhir" name="endYear" onChange={this.handleChange} value={this.state.endYear} disabled={this.state.isDetail} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="semester" md={2}>Semester</Label>
                    <Col md={9}>
                      <Input type="select" name="semester" placeholder="Semester (Ganjil/Genap)" onChange={this.handleChange} value={this.state.semester} disabled={this.state.isDetail}>
                        <option>------- Pilih Status Semester -------</option>
                        <option value="ganjil">Ganjil</option>
                        <option value="genap">Genap</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="status" md={2}>Status</Label>
                    <Col md={9}>
                      <Input type="select" name="status" placeholder="Status" onChange={this.handleChange} value={this.state.status} disabled={this.state.isDetail}>
                        <option>------- Pilih Status Tahun Ajaran -------</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  {!this.state.isDetail ? (
                    <FormGroup>
                      <Col md={{ size: 9, offset: 2 }}>
                        <Button color="info" onClick={this.onSave} disabled={this.state.submitting}><i className="fas fa-save"></i>&nbsp;Simpan</Button>
                      </Col>
                    </FormGroup>
                  ) : null}
                </Form>
                {
                  this.state.isDetail && this.state.status === 'active' ? (
                    <Fragment>
                      <Form>
                        <FormGroup style={{ marginLeft: 10 }}>
                          <h2 style={{ marginLeft: 10 }}>Info & Status Penjadawalan</h2>
                        </FormGroup>
                        <FormGroup row style={{ marginLeft: 10 }}>
                          <Label md={2}>Status Penjadwalan: </Label>
                          <Label md={10} style={{ textTransform: 'capitalize', color: this.getStage(this.state.stage, this.state.id) ? this.getStage(this.state.stage, this.state.id).color : '#AAAABC' }}>{this.getStage(this.state.stage, this.state.id) ? this.getStage(this.state.stage, this.state.id).stage : '#AAAABC'}</Label>
                        </FormGroup>
                        {this.state.stage === 'init' ? (
                          <FormGroup row style={{ marginLeft: 10 }}>
                            <Label md={2}>Batas Pengisian Teaching Plan: </Label>
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
                                  value={this.state.endTeachingPlan}
                                />
                              </InputGroup>
                            </Col>
                          </FormGroup>
                        ) : null}
                        <FormGroup row>
                          <Col md={{ size: 1, offset: 2 }}>
                            <Button color="primary" disabled={this.getStage(this.state.stage, this.state.id) ? this.getStage(this.state.stage, this.state.id).disabled : false} onClick={this.getStage(this.state.stage, this.state.id) ? this.getStage(this.state.stage, this.state.id).action : null}>{this.getStage(this.state.stage, this.state.id) ? this.getStage(this.state.stage, this.state.id).buttonText : 'Proses'}</Button>
                          </Col>
                          {(this.state.stage === 'conflict') ? (
                            <Col md={{ size: 2 }}>
                              <Button style={{ marginLeft: 50 }} color="info" onClick={() => this.props.history.push('/admin/schedules/detail/' + this.state.scheduleId)}>Cek Hasil</Button>
                            </Col>
                          ) : null}
                        </FormGroup>
                      </Form>
                    </Fragment>
                  ) : null}
              </Card>
            </div>
          </Row>
        </Container >
      </>
    )
  }
}

export default FormStudyYear;