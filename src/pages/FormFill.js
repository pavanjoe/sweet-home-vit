import React, { useState } from 'react';
import '../styles/FormStyles.css'; // Import CSS file

export default function FormFill() {
  const [dimensions, setDimensions] = useState({ breadth: '', width: '' });
  const [bedType, setBedType] = useState('');
  const [color, setColor] = useState('');
  const [furniture, setFurniture] = useState([]);
  const [newFurniture, setNewFurniture] = useState('');
  const [aesthetic, setAesthetic] = useState('');
  const [theme, setTheme] = useState('');
  
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  }


  const handleDimensionsChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBedTypeChange = (e) => {
    setBedType(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleFurnitureChange = (e) => {
    setNewFurniture(e.target.value);
  };

  const handleFurnitureAdd = () => {
    if (newFurniture.trim() !== '') {
      setFurniture(prevFurniture => [...prevFurniture, newFurniture]);
      setNewFurniture('');
    }
  };

  const handleDeleteFurniture = (index) => {
    setFurniture(prevFurniture => prevFurniture.filter((_, i) => i !== index));
  };

  const handleAestheticChange = (e) => {
    setAesthetic(e.target.value);
  };

  return (
    <div className="form-container">
      <form>
        <div>
          <label htmlFor="breadth">Enter room dimensions:</label>
          <br />
          <input
            type="text"
            id="breadth"
            name="breadth"
            value={dimensions.breadth}
            onChange={handleDimensionsChange}
            placeholder="Breadth"
            className='input-field'
          />
          <br />
          <input
            type="text"
            id="width"
            name="width"
            value={dimensions.width}
            onChange={handleDimensionsChange}
            placeholder="Width"
            className='input-field'
          />
        </div>

        <br />

        <div>
          <label htmlFor="bedType">Bed Type:</label>
          <select
            id="bedType"
            value={bedType}
            onChange={handleBedTypeChange}
            className='select-field'
          >
            <option value="">Select Bed Type</option>
            <option value="">Single</option>
            <option value="Queen">Queen</option>
            <option value="King">King</option>
            <option value="Bunk">Bunk</option>
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="color">Colour Palette:</label>
          <br />
          <input
            type="color"
            id="color"
            value={color}
            onChange={handleColorChange}
            className='color-picker'
          />
        </div>

        <br />

        <div>
          <label htmlFor="furniture">Furniture:</label>
          <input
            type="text"
            id="furniture"
            value={newFurniture}
            onChange={handleFurnitureChange}
            placeholder="Add Furniture"
            className='input-field'
          />
          <button type="button" onClick={handleFurnitureAdd} className='button'>Add Furniture</button>
          <ul className='list'>
            {furniture.map((item, index) => (
              <li key={index} className='list-item'>
                {item}
                <button type="button" className="delete-furniture" onClick={() => handleDeleteFurniture(index)}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
              
        <br />      
        <div>
          <label>Aesthetic:</label>
          <div>
            <input
              type="radio"
              id="study"
              name="aesthetic"
              value="study"
              checked={aesthetic === 'study'}
              onChange={handleAestheticChange}
            />
            <label htmlFor="study">Study</label>
          </div>
          <div>
            <input
              type="radio"
              id="kids"
              name="aesthetic"
              value="kids"
              checked={aesthetic === 'kids'}
              onChange={handleAestheticChange}
            />
            <label htmlFor="kids">Kids</label>
          </div>
          <div>
            <input
              type="radio"
              id="minimalist"
              name="aesthetic"
              value="minimalist"
              checked={aesthetic === 'minimalist'}
              onChange={handleAestheticChange}
            />
            <label htmlFor="kids">Minimalist</label>
          </div>
          <div>
            <input
              type="radio"
              id="moody"
              name="aesthetic"
              value="moody"
              checked={aesthetic === 'moody'}
              onChange={handleAestheticChange}
            />
            <label htmlFor="kids">Moody</label>
          </div>
          <div>
            <input
              type="radio"
              id="Bright"
              name="aesthetic"
              value="kids"
              checked={aesthetic === 'bright'}
              onChange={handleAestheticChange}
            />
            <label htmlFor="kids">Bright</label>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="theme">Choose a Custom Theme</label>
            <br />
            <input
              type="text"
              id="theme"
              name="theme"
              value={theme}
              onChange={handleThemeChange}
              placeholder="Custom Theme"
              className='input-field'
            />
        </div>

        
        <button type="submit" className='button'>Submit</button>
      </form>
    </div>
  );
}
