import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchUserDetail } from '../../actions/reqresDataAction';
import { useLocation } from 'react-router-dom';

const UserDetail = (props) => {
	const location = useLocation();
	const { user } = location.state;
	return (
		<Container fluid className="justify-content-center align-items-center">
			<Row className="justify-content-center">
				<Col md={6} className="p-2 justify-content-center align-items-center">
					<Card className="justify-content-center align-items-center">
						<Card.Body className="align-items-center d-flex flex-column">
							<Image roundedCircle height={150} width={150} src={user.avatar} />
							<div className="my-3 align-items-center d-flex flex-column">
								<h3>{user.first_name}{' '}{user.last_name}</h3>
								<span>{user.email}</span>
							</div>
							<div>
								<p className="text-center text-dark">
									Dolore ex ullamco minim dolor nostrud sunt nostrud cillum eiusmod pariatur ad quis culpa. Pariatur ex sunt nostrud velit consequat mollit proident nostrud proident Lorem reprehenderit est eu deserunt. In in mollit ullamco duis cillum sit. Voluptate velit aliquip minim cupidatat magna. Pariatur enim sit et enim elit elit consectetur tempor dolore. Non pariatur officia dolor duis eu eiusmod sint fugiat nisi aliqua.
								</p>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default UserDetail;
