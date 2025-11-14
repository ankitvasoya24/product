import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify'

const Product = ({ addToCart }) => {
  const { slug }  = useParams(); 
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url = "https://dummyjson.com/products";
    if (slug) {
      url = `https://dummyjson.com/products/category/${slug}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  }, [slug]);

  // search
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    
    <div>
      <Container className="mt-4">
        <Form className="d-flex mb-4" onSubmit={handleSearch}>
          <Form.Control
          
            type="text"
            placeholder="Search product..."
            className="me-2"
            style={{ width: "220px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>

      {/* Product section */}
        <Row>
          <h3 style={{paddingBottom:"12px"}}>
            {slug ? `Category: ${slug}` : "All Products"}
          </h3>

          {product.length === 0 ? (
            <p>No products found.</p>
          ) : (
            product.map((items) => (
              <Col md={4} sm={6} className="mb-4" key={items.id}>
                <Card className="h-100 shadow-sm" style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src={items.thumbnail}
                    alt={items.title}
                    style={{ height: "230px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{items.title}</Card.Title>
                    <Card.Text>
                      {items.description.substring(0, 50)}...
                    </Card.Text>
                    <h5>${items.price}</h5>
                    <div className="mt-auto d-flex justify-content-center">
                      <Button variant="primary" onClick={() => { 
                        addToCart(items);

                        toast.success(`${items.title} Added to Cart`,{
                          toastId: items.id,
                          autoClose: 2000,
                          position: 'top-center'
                        })
                        }}>
                        Add to Cart
                      </Button>
                      
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
      
    </div>
    
  );
};

export default Product;
