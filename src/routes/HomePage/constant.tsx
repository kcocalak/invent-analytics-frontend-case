import { AlignType } from "rc-table/lib/interface";

export const movieTableColumns = [
  {
    title: "Poster",
    dataIndex: "Poster",
    key: "Poster",
    width: 100,
    align: "center" as AlignType,
    render: (Poster: string) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Poster !== "N/A" ? (
          <img
            alt={Poster}
            src={Poster}
            style={{ height: "100px", width: "fit-content" }}
          />
        ) : (
          <img height={100} />
        )}
      </div>
    ),
  },
  {
    title: "Movie Name",
    dataIndex: "Title",
    key: "Title",
    width: 150,
    align: "center" as AlignType,
  },
  {
    title: "Release Date",
    dataIndex: "Year",
    key: "Year",
    width: 120,
    align: "center" as AlignType,
  },
  {
    title: "IMDb ID",
    dataIndex: "imdbID",
    key: "imdbID",
    width: 130,
    align: "center" as AlignType,
  },
];
