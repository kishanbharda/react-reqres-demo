import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/reqresDataAction';
import Skeleton from 'react-loading-skeleton';
import './product.css';

const Products = (props) => {
	const [isLoadingProducts, setLoadingProductsStatus] = useState(true);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		console.log("called useEffect products");
		loadData(1);
	}, []);

	const loadData = (page) => {
		setLoadingProductsStatus(true);
		props.fetchProducts(page, 7).then((data) => {
			console.log(data);
			setProducts(data.data);
			setCurrentPage(data.page);
			setTotalPages(data.total_pages);
			setLoadingProductsStatus(false);
		}).catch((error) => {
			console.log(error);
			setLoadingProductsStatus(false);
		});
	}

	const loadPage = (page) => {
		loadData(page);
	}

	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(
			<Pagination.Item active={i === currentPage} key={i.toString()} onClick={() => loadPage(i)}>{i}</Pagination.Item>
		)
	}

	return (
		<Container fluid>
			<Row>
				{
					isLoadingProducts ? (
						[1, 2, 4, 4, 5, 6].map((item) => (
							<Col md={4} sm={6} className="p-2">
								<div className="product-box-container">
									<Skeleton style={{ height: '100%', width: '100%' }} />
								</div>
							</Col>
						))
					) : (
							<>
								{products.map((product) => (
									<Col md={4} sm={6} className="p-2">
										<div className="product-box-container">
											<div style={{ height: '100%', width: '100%', backgroundColor: product.color }}>
												<div className="title-container">
													<h4>{product.name} - {product.year}</h4>
													<h6>{product.pantone_value}</h6>
												</div>
											</div>
										</div>
									</Col>
								))}
							</>
						)
				}
			</Row>
			<Row>
				<Col md={12} className="center p-3">
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
	fetchProducts: (page, delay) => dispatch(fetchProducts(page, delay))
});

export default connect(null, mapDispatchToProps)(Products);