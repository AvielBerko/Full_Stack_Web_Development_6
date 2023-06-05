import { Container, Row, Col } from "react-bootstrap";
import PostsList from "./child-components/posts-list";
import { useState } from "react";
import { SortBy as SortMethod } from "./types";

export default function Posts() {
  const [sortBy, setSortBy] = useState("id");

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortBy(event.target.value);
  };

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Posts</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-row gap-2">
            <label>Sort By</label>
            <select
              title="sort options"
              value={sortBy}
              onChange={handleSortOptionChange}
            >
              {Object.keys(SortMethod).map((key) => (
                <option
                  key={key}
                  value={SortMethod[key as keyof typeof SortMethod]}
                >
                  {key}
                </option>
              ))}
            </select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <PostsList sortBy={sortBy} />
        </Col>
      </Row>
    </Container>
  );
}
