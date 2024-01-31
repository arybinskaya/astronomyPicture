import React from "react";
import { useQuery } from "react-query";

const TodayNASA = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY").then(
      (response) => response.json()
    )
  );

  if (isLoading) return <h3>Загрузка...</h3>;

  if (error) return <h3>Ошибка при получении данных</h3>;

  return (
    <>
      <div>
        <h1 className="d-flex justify-content-center align-items-center">
          Astronomy Picture of the Day
        </h1>
        <p className="mt-5">{data.explanation}</p>
        <div className="mt-5 d-flex justify-content-center align-items-center">
          <img src={data.url} alt="planet"></img>
        </div>
      </div>
    </>
  );
};

export default TodayNASA;
