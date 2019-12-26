import React from "react";

function Weekday() {
  const day = new Date().getDay();
  switch (day) {
    case 0:
      return <h1 className="display 4 text-center mb-2">Sunday</h1>;
    case 1:
      return <h1 className="display 4 text-center mb-2">Monday</h1>;
    case 2:
      return <h1 className="display 4 text-center mb-2">Tuesday</h1>;
    case 3:
      return <h1 className="display 4 text-center mb-2">Wednesday</h1>;
    case 4:
      return <h1 className="display 4 text-center mb-2">Thursday</h1>;
    case 5:
      return <h1 className="display 4 text-center mb-2">Friday</h1>;
    case 6:
      return <h1 className="display 4 text-center mb-2">Saturday</h1>;
    default:
      return null;
  }
}

export default Weekday;
