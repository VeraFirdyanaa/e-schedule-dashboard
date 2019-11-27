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
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText
} from "reactstrap";

import Header from "components/Headers/Header.jsx";
import API from '../../utils/Api';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

class FormCourse extends Component {

  state = {
    loading: false,
    code: '',
    sks: 1,
    status: '',
    name: '',
    semester: 'ganjil',
    isEdit: false,
    isDetail: false,
    id: null,
    submitting: false,
    search: '',
    searching: false,
    searchResult: [],
    lectures: [],
    jenisPembelajaran: ''
  }

  componentWillMount() {
    if (this.props.match.params && this.props.match.params.id) {
      let isDetail = this.props.match.path.indexOf("detail") > -1 ? true : false;
      this.setState({
        isEdit: isDetail ? false : true,
        isDetail: isDetail ? true : false,
        id: this.props.match.params.id
      }, () => {
        API.get("api/courses/" + this.props.match.params.id)
          .then(res => {
            console.log('res detail course', res);
            this.setState({
              code: res.data.code,
              name: res.data.name,
              sks: res.data.sks,
              semester: res.data.semester,
              status: res.data.status,
              angkaKelas: res.data.angkaKelas,
              lectures: res.data.lectures || [],
              jenisPembelajaran: res.data.jenisPembelajaran
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
        if (!this.state.isEdit && !this.state.isDetail) {
          API.post("api/courses", {
            code: this.state.code,
            name: this.state.name,
            sks: this.state.sks,
            semester: this.state.semester,
            status: this.state.status,
            angkaKelas: this.state.angkaKelas,
            lectures: [],
            jenisPembelajaran: this.state.jenisPembelajaran
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
            semester: this.state.semester,
            status: this.state.status,
            angkaKelas: this.state.angkaKelas,
            lectures: this.state.lectures.map(lecture => lecture._id),
            jenisPembelajaran: this.state.jenisPembelajaran
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

  onLectureSearchChange = async e => {
    this.setState({ search: e.target.value, searchResult: [], searching: true });
    let debounceSearch = AwesomeDebouncePromise(this.getLectures, 500);
    let results = await debounceSearch();
    console.log('results', results);
    this.setState({ searchResult: results ? results.data : [], searching: false });
  }

  getLectures = () => API.get(`/api/lectures/search?search=${this.state.search}`);

  onAddLecture = lecture => {
    let lectures = [...this.state.lectures];
    let indexFound = lectures.findIndex(lc => lc._id === lecture._id);
    if (indexFound > -1) {
      alert('Dosen yang dipilih sudah berada dalam list dosen terpilih!');
    } else {
      lectures.push(lecture);
    }

    this.setState({ lectures, searchResult: [], search: '' });
  }

  onRemoveLecture = index => {
    let lectures = [...this.state.lectures];
    lectures.splice(index, 1);
    this.setState({ lectures });
  }


  render() {
    let semesterOptions = [];
    for (let i = 0; i < 8; i++) {
      if ((i + 1) % 2 === 0) {
        semesterOptions.push({
          key: 'genap',
          value: i + 1
        });
      } else {
        semesterOptions.push({
          key: 'ganjil',
          value: i + 1
        });
      }
    }

    return (
      <>
        <Header noStats={true} />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">{this.state.isEdit ? 'Edit' : (this.state.isDetail ? 'Detail' : 'New')} Course</h3>
                </CardHeader>
                <Form>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="code" md={2}>Kode Mata Kuliah</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Kode Mata Kuliah" name="code" onChange={this.handleChange} value={this.state.code} disabled={this.state.isDetail} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="name" md={2}>Nama Mata Kuliah</Label>
                    <Col md={9}>
                      <Input type="text" placeholder="Nama Mata Kuliah" name="name" onChange={this.handleChange} value={this.state.name} disabled={this.state.isDetail} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="sks" md={2}>Jumlah SKS</Label>
                    <Col md={9}>
                      <Input type="number" placeholder="Jumlah SKS" name="sks" onChange={this.handleChange} value={this.state.sks} disabled={this.state.isDetail} />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="semester" md={2}>Semester</Label>
                    <Col md={9}>
                      <Input type="select" name="semester" placeholder="Semester (Ganjil/Genap)" onChange={this.handleChange} value={this.state.semester} disabled={this.state.isDetail}>
                        <option>------- Pilih Semester Ganjil/Genap -------</option>
                        <option value="ganjil">Ganjil</option>
                        <option value="genap">Genap</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="angkaKelas" md={2}>Semester Kelas</Label>
                    <Col md={9}>
                      <Input type="select" name="angkaKelas" placeholder="Semester (Ganjil/Genap)" onChange={this.handleChange} value={this.state.angkaKelas} disabled={this.state.isDetail}>
                        <option>------- Pilih Semester Kelas -------</option>
                        {
                          semesterOptions.filter((key) => key.key === this.state.semester).map((smt) => <option key={smt.value} value={smt.value}>{smt.value}</option>)
                        }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="jenisPembelajaran" md={2}>Jenis Pembelajaran</Label>
                    <Col md={9}>
                      <Input type="select" name="jenisPembelajaran" placeholder="Semester (Ganjil/Genap)" onChange={this.handleChange} value={this.state.jenisPembelajaran} disabled={this.state.isDetail}>
                        <option>------- Pilih Jenis Pembelajaran -------</option>
                        <option value="teori">Teori</option>
                        <option value="praktikum">Praktikum</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginLeft: 10 }}>
                    <Label htmlFor="status" md={2}>Status</Label>
                    <Col md={9}>
                      <Input type="select" name="status" placeholder="Status" onChange={this.handleChange} value={this.state.status} disabled={this.state.isDetail}>
                        <option>------- Pilih Status Mata Kuliah -------</option>
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
                  {
                    this.state.isDetail ? (
                      <>
                        <FormGroup row style={{ marginLeft: 10 }}>
                          <Label md={2}>Dosen Terpilih</Label>
                          <Col md={9} style={{ marginTop: 5 }}>
                            {
                              this.state.lectures.length > 0 ? this.state.lectures.map((lecture, index) => (
                                <ListGroup key={lecture._id} style={{ marginBottom: 10 }}>
                                  <ListGroupItem>
                                    <ListGroupItemHeading>NOMOR INDUK DOSEN: {lecture.nid}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                      NAMA DOSEN: {lecture.name}
                                    </ListGroupItemText>
                                    <Button color="danger" type="button" onClick={() => this.onRemoveLecture(index)}>Hapus</Button>
                                  </ListGroupItem>
                                </ListGroup>
                              )) : (
                                  <div>
                                    <p>Belum ada Dosen terpilih untuk Mata Kuliah Ini</p>
                                  </div>
                                )
                            }
                          </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginLeft: 10 }}>
                          <Label md={2}>Tambah Dosen</Label>
                          <Col md={6}>
                            <Input type="text" placeholder="Cari Nama Atau Nomor Induk Dosen" name="search" onChange={this.onLectureSearchChange} value={this.state.search} />
                            {
                              this.state.searchResult.length > 0 && (this.state.search && this.state.search !== 0) ? this.state.searchResult.map(lecture => (
                                <ListGroup key={lecture._id} style={{ marginTop: 20 }}>
                                  <ListGroupItem>
                                    <ListGroupItemHeading>NOMOR INDUK DOSEN: {lecture.nid}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                      NAMA DOSEN: {lecture.name}
                                    </ListGroupItemText>
                                    <Button color="success" type="button" onClick={() => this.onAddLecture(lecture)}>Tambahkan</Button>
                                  </ListGroupItem>
                                </ListGroup>
                              )) : this.state.search && this.state.search.length > 0 && !this.state.searching ? (
                                <p className="text-center" style={{ marginTop: 10 }}>Dosen Tidak Ditemukan dengan Nama atau Nomor Induk &ldquo;<span style={{ fontWeight: 'bold' }}>{this.state.search}</span>&rdquo;</p>
                              ) : null
                            }
                          </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col md={{ size: 9, offset: 2 }}>
                            <Button color="info" onClick={this.onSave} disabled={this.state.submitting}><i className="fas fa-save"></i>&nbsp;Simpan Dosen Terpilih</Button>
                          </Col>
                        </FormGroup>
                      </>
                    ) : null
                  }
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