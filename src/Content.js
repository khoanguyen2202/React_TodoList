import React, { useEffect, useState } from "react";

function Content() {
  const tabs = ["posts", "comments", "albums"];
  const [type, setType] = useState("posts");
  const [titles, setTitles] = useState([]);
  const [goToTop, setGoToTop] = useState(false);

  const [time, setTime] = useState(180);
  const [image, setImage] = useState();
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        clearInterval(timer);
        return 0;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px",
        }}
      >
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
        <h2>{`Timer: ${time} `}</h2>
        <input type="file" onChange={handleSelectImage} />
      </div>
      {image && (
        <img
          src={image.preview}
          alt="Preview"
          style={{
            width: "80%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}
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
