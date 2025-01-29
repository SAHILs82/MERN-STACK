import { useState } from "react";

export default function Form() {
  let [fullName, SetFullName] = useState("Sahil");
  let handleNameChange = (event) => {
    SetFullName(event.target.value);
  };
  return (
    <form>
      <input
        type="text"
        placeholder="enter full name"
        value={fullName} //controlled component here in this program.
        onChange={handleNameChange}
      />
      <button>Submit</button>
    </form>
  );
}
