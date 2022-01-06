import React, { useState } from 'react'
import SingleColor from './components/SingleColor'
import Values from 'values.js'

function App() {
  
  /* Initial color */
  const [color, setColor] = useState('#fc3b90');
  /* Set red border around input in case of error */
  const [error, setError] = useState(false);
  /* Array of colors */
  const [list,setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      let colors = new Values(color).all(10);
      setList(colors);
    }catch(error){
      setError(true);
    }
  }
  
  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input className={`${error ? 'error' : null}`}
                type="text" 
                value={color} 
                onChange={ (e) => {setColor(e.target.value)}}
                placeholder="#fc3b90"
          />
          <button className="btn" type="submit">Generate</button>
        </form>      
      </section>
      <section className="colors">
        {list.map( (color,index) => {
          const {weight} = color;
    
          // [255,255,0] changed on 255,255,0 string
          const rgb = color.rgb.join(',');

          return(
            <SingleColor key={index} 
                         index={index}
                         rgb={rgb}
                         weight={weight}
                         hexColor={color.hex}/>              
          )
        })}
      </section>
    </>
  )
}

export default App
