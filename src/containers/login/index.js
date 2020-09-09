import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Spinner, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/loginAction';

const Login = (props) => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setSubmittingStatus] = useState(false);
	const [formError, setFormError] = useState(null);

	const onLogin = () => {
		setSubmittingStatus(true);
		props.loginUser(email, password).then(() => {
			setSubmittingStatus(false);
			setFormError(null);
			history.replace('/');
		}).catch(() => {
			setFormError("Username or Password is invalid.");
			setSubmittingStatus(false);
		});
	}

	return (
		<Container>
			<Row className="flex-column flex-grow-1 justify-content-center align-items-center">
				<Col className="col-md-6 col-sm-12 flex-grow-1 align-items-center justify-content-center">
					<h1>Login Here</h1>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
								}}
							/>
						</Form.Group>
						{
							formError && (
								<Card body border="danger" text="danger" className="my-2 text-center">{formError}</Card>
							)
						}
						<Button variant="primary" block disabled={isSubmitting} onClick={onLogin}>
							{
								isSubmitting ? (
									<span>
										<Spinner
											as="span"
											animation="grow"
											size="sm"
											role="status"
											aria-hidden="true"
										/>
										<span> Loading...</span>
									</span>
								) : (
										<span>LOGIN</span>
									)
							}
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
};

const mapDispatchToProps = (dispatch) => ({
	loginUser: (email, password) => dispatch(loginUser(email, password))
});

export default connect(null, mapDispatchToProps)(Login);