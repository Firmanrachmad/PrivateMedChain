import { React } from 'react';
import "../App.css";

function Tenaga () {

    return (
        <div className="addDocuments">
          <form action="">
            <input
              type="text"
              placeholder="name"
            />
            <input
              type="email"
              placeholder="email"
            />
            <input
              type="password"
              placeholder="password"
            />
            <button type="submit">
              submit
            </button>
          </form>
        </div>
      );

}

export default Tenaga;