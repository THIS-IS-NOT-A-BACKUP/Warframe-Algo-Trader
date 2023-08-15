import { environment } from "@/environment";
import { useState, useEffect } from "react";

function ScreenReaderButton() {
  const [isRunning, setIsRunning] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${environment.API_BASE_URL}/screen_reader`);
      const data = await response.json();
      setIsRunning(data.Running);
    } catch (error) {
      console.error("Error fetching live scraper status:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Update every second
    fetchData();
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleButtonClick = () => {
    const apiUrl = isRunning
      ? `${environment.API_BASE_URL}/screen_reader/stop`
      : `${environment.API_BASE_URL}/screen_reader/start`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsRunning(!isRunning);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button
        className={
          isRunning
            ? "p-1 rounded-lg bg-rose-700 text-white-custom shadow-md shadow-rose-700"
            : "p-1 rounded-lg bg-purple-custom-saturated text-white-custom shadow-md shadow-purple-700"
        }
        onClick={handleButtonClick}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <span>
        {isRunning
          ? " - Whisper Sensor: Running"
          : " - Whisper Sensor: Not running"}
      </span>
    </div>
  );
}

export default ScreenReaderButton;
