import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth"

const ColorForm = () => {

    const initialColor = {
        color: "",
        code: { hex: "" }
    };

    const [color, setColor] = useState(initialColor);

    const handleChanges = evt => {
        const { name, value } = evt.target;
        setColor({ ...color, [name]: value });
    }

    const onSubmit = e => {
        e.preventDefault();

        axiosWithAuth().post(`http://localhost:5000/api/colors`, color)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={onSubmit}>
            <label>color name: 
            <input
                type="text"
                name="color"
                onChange={handleChanges}
                placeholder="color"
                value={color.color}
            />
            </label>
            <br></br>
            <label>hex code: 
            <input
                type="text"
                name="hex"
                onChange={handleChanges}
                value={color.code.hex}
            />
            </label>
            <br></br>

            <button>Add</button>
    </form>
    )
}

export default ColorForm;