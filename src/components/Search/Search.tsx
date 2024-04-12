import { Col, Form, Input, InputNumber, Row, Select } from "antd";

import { ClockCircleOutlined } from "@ant-design/icons";
import { FormType } from "../../routes/HomePage/types";
import { useAppSelector } from "../../redux/hooks";
import "./Search.scss";
interface SearchProps {
  debouncedSearch: (value: FormType) => void;
}

const Search = ({ debouncedSearch }: SearchProps) => {
  const [form] = Form.useForm();
  const movie = useAppSelector((state) => state.movie);
  const SearchMovies = (values: FormType): void => {
    debouncedSearch(values);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="basic"
      initialValues={{ title: movie.s, type: movie.type, year: movie.y }}
      onValuesChange={(_changedValues, allValues) => {
        SearchMovies(allValues);
      }}
      onFinish={() => {}}
      autoComplete="off"
    >
      <Row className="row">
        <Col span={8} className="col">
          <Form.Item
            label="Movie Name"
            name="title"
            rules={[
              {
                required: true,
                message: "Movie Name is required.",
              },
            ]}
          >
            <Input placeholder="Movie Name" className="form-item" />
          </Form.Item>
        </Col>
        <Col span={8} className="col">
          <Form.Item name={"type"} label="Type">
            <Select
              placeholder="Choose Type"
              allowClear
              options={[
                { value: "movie", label: "Movie" },
                { value: "series", label: "TV Series" },
                { value: "episode", label: "TV Series Episodes" },
              ]}
              className="form-item"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8} className="col">
          <Form.Item name={"year"} label="Year">
            <InputNumber
              placeholder="Release Date"
              addonAfter={<ClockCircleOutlined />}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
