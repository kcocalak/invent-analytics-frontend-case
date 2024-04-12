import { Layout, Pagination, Row, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { movieTableColumns } from "./constant";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { FormType, MovieSearchResult, MovieState, SearchType } from "./types";
import Search from "../../components/Search/Search";
import { debounce } from "lodash";
import { Content, Header } from "antd/es/layout/layout";
import api from "../../api/api";
import { setMovieSearch } from "../../redux/movieSearch";
import "./index.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const movie = useAppSelector((state) => state.movie);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState<MovieState>({
    Response: "True",
    Search: [],
    totalResults: "0",
    loading: false,
    page: 1,
  });

  // Async Function
  const getMovies: any = async (body: SearchType) => {
    try {
      setLoading(true);
      let res = await api.get("/", {
        params: body,
      });
      if (res.data.Response === "True") {
        setMovieData((prev: MovieState) => ({ ...prev, ...res.data }));
        return res.data;
      } else {
        setMovieData({
          Response: "True",
          Search: [],
          totalResults: "0",
          loading: false,
          page: 1,
        });
        setErrorMessage(res.data.Error);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(movie);
  }, [movie]);

  const debouncedSearch = debounce(async (value: FormType) => {
    dispatch(
      setMovieSearch({
        ...movie,
        s: value.title,
        type: value.type,
        y: value.year,
        page: 1,
      })
    );
  }, 500);

  const PaginationOnChange = (page: number) => {
    dispatch(setMovieSearch({ ...movie, page: page }));
  };

  return (
    <Layout>
      <Content className="content">
        <Search debouncedSearch={debouncedSearch} />
        <Table
          size="small"
          scroll={{ y: "60vh" }}
          loading={loading}
          rowKey={(obj) => obj.imdbID}
          pagination={false}
          columns={movieTableColumns}
          dataSource={movieData.Search}
          locale={{ emptyText: errorMessage }}
          className="table"
          onRow={(record: MovieSearchResult) => {
            return {
              onClick: () => {
                navigate(`/detail/${record.imdbID}`);
              }, // click row
            };
          }}
        />
        <Row justify="center">
          <Pagination
            onChange={PaginationOnChange}
            className="pagination"
            current={movie.page}
            total={+movieData.totalResults}
            pageSizeOptions={[10]}
          />
        </Row>
      </Content>
      {/* <Footer /> */}
    </Layout>
  );
};

export default Home;
