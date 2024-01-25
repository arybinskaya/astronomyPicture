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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div>
      <h1>Select the date of the astronomical picture</h1>
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <ul>
        {data?.map((image) => (
          <li key={image.date}>
            <img src={image.url} alt={image.title} />
            <p>{image.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfPistures;
