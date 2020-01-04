import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import API from '../../utils/Api';

class Login extends React.Component {

  state = {
    email: null,
    password: null,
    submitting: false
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    if (token) {
      this.props.history.push('/');
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onLogin = () => {
    API.post('api/users/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small style={{ fontWeight: 'bold', fontSize: 20, fontFamily:'Sans-serif'}}>Login</small>
              </div>
              <Form role="form" style={{ marginTop: 50 }}>
                <FormGroup className="mb-4">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend" >
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Masukan Email anda" type="email" name="email" onChange={this.handleChange} style={{ paddingLeft : 10}} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Masukan Password anda" type="password" name="password" onChange={this.handleChange} style={{ paddingLeft : 10}} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-5" color="primary" type="button" onClick={this.onLogin}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Login;
