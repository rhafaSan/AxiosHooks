import React, { useState } from 'react';
import CategoryDataService from '../../../services/CategoryService/index';

// import { Container } from './styles';

const Add = () =>{
    
    const initialCategoryState = { id: null, name: '' };
    const [ category, setCategory ] = useState(initialCategoryState);
    const [ submitted, setSubmitted ] = useState(false);


    const handleInputChange = e => {
        const { name, value } = e.target;
        setCategory({...category, [name]: value});
    }

    const saveCategory = () => {
        var data = {
            name: category.name
        }

        CategoryDataService.create(data)
            .then(response => {
                setCategory({
                    id: response.data.id,
                    name: response.data.name
                })
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const newCategory = () => {
        setCategory(initialCategoryState);
        setSubmitted(false);
    }

  return (
      <div className="submit-form"> 
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newCategory}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            className="form-control"
                            required
                            value={category.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={saveCategory} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
      </div>
  );
}

export default Add;