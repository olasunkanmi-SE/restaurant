import { faRotateLeft, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Nav, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../hooks/UseShoppingCart";

export const Navigation = () => {
  const { quantity } = useShoppingCart();
  const navigate = useNavigate();

  const previousPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              <Stack direction="horizontal" gap={4}>
                <span onClick={previousPage}>
                  <FontAwesomeIcon icon={faBars} size="xl" />
                </span>
                <span onClick={previousPage}>
                  <FontAwesomeIcon icon={faRotateLeft} size="xl" />
                </span>
                <span onClick={previousPage}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                </span>
              </Stack>
            </Nav.Link>
          </Nav>
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-secondary"
            className="rounded-circle"
          >
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 902.86 902.86"
              // fill="currentColor"
            >
              <g>
                <g>
                  <path
                    d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                  />
                  <path
                    d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                  />
                </g>
              </g>
            </svg>
            <div
              style={{
                color: "#fff",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
                backgroundColor: "#198753",
              }}
              className="rounded-circle d-flex justify-content-center align-items-center"
            >
              {quantity}
            </div>
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
