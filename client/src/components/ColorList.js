import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const initialAddColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialAddColor);

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post(`http://localhost:5000/api/colors`, addColor)
      .then(res => {
        console.log(res);
        updateColors([...colors, { ...addColor, id: colors.length + 1 }]);
        // updateColors(colors);
        console.log(colors)
        setAddColor(initialAddColor);
      })
      .catch(err => console.log(err))
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit.id);
    console.log(colorToEdit);
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        updateColors(colors);
        console.log(colors);
        setEditing(false);
      })
      .catch(err => console.log(err));
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    console.log(color);
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        updateColors(colors);
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={onSubmit}>
        <legend>add color</legend>
        <label>color name:
          <input
            type="text"
            name="addColorName"
            onChange={e => setAddColor({ ...addColor, color: e.target.value })}
            placeholder="color"
            value={addColor.color}
          />
        </label>
        <br></br>
        <label>hex code:
          <input
            type="text"
            name="hex"
            onChange={e => setAddColor({ ...addColor, code: { hex: e.target.value } })}
            value={addColor.code.hex}
          />
        </label>
        <br></br>
        <div className="button-row">
          <button>Add</button>
        </div>
      </form>
      <div className="spacer" />
    </div>

  );
};

export default ColorList;
