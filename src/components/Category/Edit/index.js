import React, { useEffect, useState } from 'react';
import CategoryDataService from '../../../services/CategoryService/index';

const Edit = props => {
    const initialCategoryState ={
        id: null,
        name: ''
    }

    const [ currentCategory, setCurrentCategory ] = useState(initialCategoryState);
    const [ message, setMessage ] = useState("");

    const getCategory = id => {
        CategoryDataService.get(id)
            .then(response => {
                setCurrentCategory(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() =>{
        getCategory(props.match.params.id);
    }, [props.match.params.id])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    }

    const updateCategory = () => {
        CategoryDataService.update(currentCategory.id, currentCategory)
            .then(response => {
                setMessage("The category was updated successfully!");
            })
            .catch(e =>{
                console.log(e);
            })
    }

    const deleteCategory = () => {
        CategoryDataService.remove(currentCategory.id)
            .then(res => {
                props.history.push('/category')
            })
            .catch(e => {
                console.log(e);
            })
    }

    return(
        <div>
            {currentCategory ? (
                <div className="edit-form">
                    <h4>Category</h4>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                className="form-control"
                                value={currentCategory.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button className="badge badge-danger mr-2" onClick={deleteCategory}>Delete</button>
                    <button className="badge badge-success" type="submit" onClick={updateCategory} >Update</button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Category...</p>
                </div>
            )}
        </div>
    )
}

export default Edit