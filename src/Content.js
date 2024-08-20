import React, { useEffect, useState } from "react";

function Content() {
  const tabs = ["posts", "comments", "albums"];
  const [type, setType] = useState("posts");
  const [titles, setTitles] = useState([]);
  const [goToTop, setGoToTop] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((titles) => setTitles(titles));
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      setGoToTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ul>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setType(tab)}
            style={
              type === tab
                ? {
                    background: "#333",
                    color: "#fff",
                  }
                : {}
            }
          >
            {tab}
          </button>
        ))}
      </ul>
      <ul>
        {titles.map((title) => (
          <li key={title.id}>{title.title || title.name}</li>
        ))}
      </ul>
      {goToTop && (
        <button
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
          }}
        >
          Go To Top
        </button>
      )}
    </div>
  );
}

export default Content;
