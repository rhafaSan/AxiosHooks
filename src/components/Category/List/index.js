import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryDataService from '../../../services/CategoryService/index';


// import { Container } from './styles';

const List = () => {
    const [ categorys, setCategorys ] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState(null);
    const [ currentIndex, setCurrentIndex ] = useState(-1);
    const [ searchName, setSearchName ] = useState('');

    useEffect(() => {
        retrieveCategorys();
    });

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const retrieveCategorys = () =>{
        CategoryDataService.getAll()
            .then(res => {
                setCategorys(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const setActveCategory = (category, index) => {
        setCurrentCategory(category);
        setCurrentIndex(index);
    }

    const findByName = () => {
        if(searchName !== ''){
            CategoryDataService.findByName(searchName)
                .then(res => {
                    setCategorys(res.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }else{
            retrieveCategorys();
        }
    }

    return(
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input 
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secundary"
                            type='button'
                            onClick={findByName}
                        >   
                            Search
                        </button>
                    </div>
                </div>
                
            </div>
            <div className="col-md-6">
                <h4>Category List</h4>
                <ul className="list-group"> 
                    {categorys && categorys.map((category, index) => (
                        <li className={"list-group-item " + (index === currentIndex? 'active' : '')}
                        style={{cursor: 'pointer'}}
                        onClick={() =>setActveCategory(category, index)}
                        key={index}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-md-6"> 
                {currentCategory ? (
                    <div>
                        <h4>Category</h4>
                        <div>
                            <label><strong>Name: </strong></label> {" "}
                            {currentCategory.name}
                        </div>
                        <Link to={'/category/' + currentCategory.id} className="badge badge-warning">Edit</Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Category...</p>
                    </div>
                )}

            </div>

        </div>
    )
  
}

export default List;