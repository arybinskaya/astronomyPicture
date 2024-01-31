import React, { useState } from "react";
import { useQuery } from "react-query";

interface Image {
  date: string;
  title: string;
  url: string;
}

const fetchImages = async (
  startDate: string,
  endDate: string
): Promise<Image[]> => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startDate}&end_date=${endDate}`
  );
  const data = await response.json();
  return data;
};

const ListOfPistures: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("2023-01-01");
  const [endDate, setEndDate] = useState<string>("2023-01-10");

  const { data, isLoading, isError } = useQuery(
    ["images", startDate, endDate],
    () => fetchImages(startDate, endDate)
  );

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error fetching data</h3>;

  return (
    <div>
      <h1 className="d-flex justify-content-center align-items-center mt-5">
        Select the date of the astronomical picture
      </h1>
      <div className=" d-flex justify-content-center align-items-center">
        <div className="mx-3">
          <label className="mx-2">Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mx-3">
          <label className="mx-2">End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <ul className="list-unstyled mt-5">
          {data?.map((image) => (
            <li className="mb-5" key={image.date}>
              <img className="w-75" src={image.url} alt={image.title} />
              <h2>{image.title}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListOfPistures;
