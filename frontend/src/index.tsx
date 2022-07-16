import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import "./style.css";

const App = () => {
  const [image, setImage] = useState("alpine:latest");

  const createContainer = async () => {
    await fetch(`http://localhost:8080/containers/create`, {
      method: "POST",
      body: JSON.stringify({
        image,
        name: "test",
      }),
    });
  };

  return (
    <main>
      <h1>FireNodes Panel</h1>
      <input
        id="text"
        onChange={(e) => setImage((e.target as HTMLInputElement).value)}
        value={image}
      />
      <button className="btn btn-primary" onClick={createContainer}>
        Deploy Container
      </button>
    </main>
  );
};

render(<App />, document.body);
