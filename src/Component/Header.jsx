import React, { useEffect, useState } from "react";
import { Form, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


const Header = ({ cart }) => {
  const [category, setCategoty] = useState([]);

  console.log(category);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoty(data.slice(0, 5));
      })
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container style={{ margin: "15px 30px" }}>
          <Navbar.Brand
            as={Link}
            to="/product"
            style={{ fontSize: "28px", cursor: "pointer" }}
          >
            Shoppy
          </Navbar.Brand>
          <Nav
            className="me-auto gap-2"
            style={{ fontSize: "18px", color: "black", marginLeft: "30px" }}
          >
            <Nav.Link as={Link} to="/product">
              Product
            </Nav.Link>

            <NavDropdown title="Category">
              {category.map((cat, index) => (
                <NavDropdown.Item
                  key={index}
                  as={Link}
                  to={`/category/${cat.slug}`}
                >
                  {cat.name} 
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          <Form className="d-flex ms-auto">
            <Button
              className="text-white"
              as={Link}
              to="/cart"
              variant="primary"
            >
            Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
