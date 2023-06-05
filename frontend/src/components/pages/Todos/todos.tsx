import { Container, Row, Col } from "react-bootstrap";
import TodosList from "./child-components/todos-list";
import { useState } from "react";
import { SortBy as SortMethod, FilterBy as FilterMethod } from "./types";

export default function Todos() {
  const [sortBy, setSortBy] = useState<string>(SortMethod.ID);
  const [filterBy, setFilterBy] = useState<string>(FilterMethod.NONE);

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortBy(event.target.value);
  };

  const handleFilterOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterBy(event.target.value);
  };

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Todos</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-row gap-2">
            <label>Sort by</label>
            <select
              title="Sort By"
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
            <label>Filter</label>
            <select
              title="Filter By"
              value={filterBy}
              onChange={handleFilterOptionChange}
            >
              {Object.keys(FilterMethod).map((key) => (
                <option
                  key={key}
                  value={FilterMethod[key as keyof typeof FilterMethod]}
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
          <TodosList sortBy={sortBy} filterBy={filterBy} />
        </Col>
      </Row>
    </Container>
  );
}
