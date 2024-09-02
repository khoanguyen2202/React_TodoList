import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "./App";
import "./App.css";
function FakeChat() {
  const lessons = [
    {
      id: 1,
      name: "React JS",
    },
    {
      id: 2,
      name: "Angular",
    },
    {
      id: 3,
      name: "Vue JS",
    },
  ];
  const [lessonId, setLessonId] = useState(1);
  useEffect(() => {
    const handleChat = ({ detail }) => {
      console.log(detail);
    };

    window.addEventListener(`lesson-${lessonId}`, handleChat);
    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleChat);
    };
  }, [lessonId]);
  const initialCoundown = 60;
  const [countdown, setCountdown] = useState(initialCoundown);
  const timerId = useRef();
  const prevCountdown = useRef();
  const handleStart = () => {
    if (countdown === 0) {
      setCountdown(initialCoundown);
    }
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };
  const handleStop = () => {
    clearInterval(timerId.current);
  };
  useEffect(() => {
    prevCountdown.current = countdown;
    if (countdown === 0) {
      clearInterval(timerId.current);
    }
  }, [countdown]);
  console.log(countdown, prevCountdown.current);
  console.log("re-render");
  const theme = useContext(ThemeContext);
  return (
    <div className={theme}>
      {lessons.map((lesson) => (
        <li
          key={lesson.id}
          style={{
            listStyleType: "none",
            color: lessonId === lesson.id ? "red" : "#333",
          }}
          onClick={() => setLessonId(lesson.id)}
        >
          {lesson.name}
        </li>
      ))}
      <div>
        <h1>{countdown}</h1>
        <div>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
        </div>
      </div>
    </div>
  );
}

export default FakeChat;
