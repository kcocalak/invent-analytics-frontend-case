import { useParams, useNavigate } from "react-router-dom";
import { MovieType } from "./types";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Button, Col, Layout, Rate, Row } from "antd";
import { Typography } from "antd";
import Loading from "../../components/Skeleton";
import { Content } from "antd/es/layout/layout";
import NoImage from "../../assets/image.png";
import { handleRate } from "../../utils/general";
import "./index.scss";
const { Title } = Typography;

const MovieDetail = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState<any>(false);
  const [movieData, setMovieData] = useState<MovieType | null>(null);
  const navigate = useNavigate();

  const getMovieById = async (movieId: string) => {
    setLoading(true);
    let params = { i: movieId };

    const response = await api.get("/", {
      params,
    });
    setMovieData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    if (movieId) {
      getMovieById(movieId);
    }
  }, [movieId]);

  return (
    <Layout>
      <Content>
        {loading ? (
          <Loading />
        ) : (
          <Row>
            <Col span={24}>
              <Row>
                <Button onClick={() => navigate("/")} className="button">
                  Back
                </Button>
              </Row>

              <Row className="content-row">
                <Col span={12} className="image-col">
                  <img
                    src={
                      movieData?.Poster !== "N/A" ? movieData?.Poster : NoImage
                    }
                    alt={movieData?.Title}
                    className={
                      movieData?.Poster !== "N/A" ? "image" : "no-image"
                    }
                  />
                </Col>
                <Col span={12}>
                  <Row className="row">
                    <Title>{movieData?.Title}</Title>
                  </Row>
                  <Row className="row">
                    <Col span={8}>
                      <b>Year:</b> {movieData?.Year}
                    </Col>
                    <Col span={8}>
                      <b>Released: </b>
                      {movieData?.Released}
                    </Col>
                    <Col span={8}>
                      <b>Runtime: </b>
                      {movieData?.Runtime}
                    </Col>
                  </Row>
                  <Row className="row">
                    <Row className="row">
                      {movieData?.imdbRating !== "N/A" ||
                      movieData?.Ratings.length ? (
                        <Title level={4}>Ratings:</Title>
                      ) : (
                        ""
                      )}
                    </Row>
                    <Row className="row">
                      <Row className="row">
                        <Col span={24}>
                          {movieData?.imdbRating &&
                            movieData?.imdbRating !== "N/A" && (
                              <>
                                <b>Imdb Ratings:</b>
                                <Rate
                                  disabled
                                  allowHalf
                                  value={handleRate(movieData?.imdbRating)}
                                />
                                <span>({movieData.imdbVotes} votes)</span>
                              </>
                            )}
                        </Col>
                      </Row>
                      <Row className="row">
                        {movieData?.Ratings.map((item) => {
                          let rate = handleRate(item.Value);
                          return (
                            <Col span={8}>
                              <b>
                                {item.Source}:<br />{" "}
                              </b>
                              <Rate disabled allowHalf value={rate} />
                            </Col>
                          );
                        })}
                      </Row>
                    </Row>
                  </Row>
                  <Row className="row">
                    <span>
                      <b>Genre:</b> {movieData?.Genre}
                    </span>
                  </Row>
                  <Row className="row">
                    <span>
                      <b>Writer:</b> {movieData?.Writer}
                    </span>
                  </Row>
                  <Row className="row">
                    <span>
                      <b>Actors:</b> {movieData?.Actors}
                    </span>
                  </Row>
                  <Row className="row">
                    <span>
                      <b>Plot:</b>
                      {movieData?.Plot}
                    </span>
                  </Row>
                  <Row className="row">
                    <span>
                      <b>Language:</b>
                      <i>{movieData?.Language}</i>
                    </span>
                  </Row>
                  <Row className="row">
                    <span>
                      <b>Awards:</b>
                      <span className="awards-span">{movieData?.Awards}</span>
                    </span>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default MovieDetail;
