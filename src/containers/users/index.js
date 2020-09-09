import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Image, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/reqresDataAction';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

const Users = (props) => {
	const [isLoadingUsers, setLoadingUsersStatus] = useState(true);
	const [users, setUsers] = useState([]);
	const [totalPages, setTotalPages] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const history = useHistory();

	useEffect(() => {
		console.log("called useEffect users");
		loadData(1);
	}, []);

	const loadData = (page) => {
		setLoadingUsersStatus(true);
		props.fetchUsers(page, 5).then((data) => {
			console.log(data);
			setUsers(data.data);
			setCurrentPage(data.page);
			setTotalPages(data.total_pages);
			setLoadingUsersStatus(false);
		}).catch((error) => {
			console.log(error);
			setLoadingUsersStatus(false);
		});
	}

	const loadPage = (page) => {
		loadData(page);
	}

	const navigateToDetail = (user) => {
		console.log(user);
		history.push({
			pathname: 'users/user-detail',
			state: { user }
		});
	}

	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(
			<Pagination.Item active={i === currentPage} key={i.toString()} onClick={() => loadPage(i)}>{i}</Pagination.Item>
		)
	}

	return (
		<Container fluid>
			<Row className="justify-content-center">
				<Col md={6} sm={12} className="p-4">
					<ListGroup>
						{
							isLoadingUsers ? (
								[1, 2, 3, 4, 5].map((item) => (
									<ListGroupItem className="d-flex align-items-center" key={item.toString()}>
										<div>
											<Skeleton circle={true} height={50} width={50} />
										</div>
										<div className="px-3">
											<div className="font-weight-bold">
												<Skeleton style={{ width: '100%' }} />
											</div>
											<div className="text-black-50">
												<Skeleton width={200} />
											</div>
										</div>
									</ListGroupItem>
								))
							) : (
									users.map((user) => (
										<ListGroupItem
											key={user.id.toString()}
											className="d-flex align-items-center list-group-item-action"
											onClick={() => navigateToDetail(user)}>
											<div><Image src={user.avatar} roundedCircle height={50} width={50} /></div>
											<div className="px-3">
												<div className="font-weight-bold">
													{user.first_name}{' '}{user.last_name}
												</div>
												<div className="text-black-50">
													{user.email}
												</div>
											</div>
										</ListGroupItem>
									))
								)
						}
					</ListGroup>
					{
						totalPages > 1 && (
							<span className="m-2 d-flex justify-content-center">
								<Pagination>
									{pages}
								</Pagination>
							</span>
						)
					}
				</Col>
			</Row>
		</Container>
	)
};

const mapDispatchToProps = (dispatch) => ({
	fetchUsers: (page, delay) => dispatch(fetchUsers(page, delay))
});

export default connect(null, mapDispatchToProps)(Users);