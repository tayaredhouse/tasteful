import React from 'react';
import logo from "../Header/logo.png";
import { Link } from 'react-router-dom';
import './Header.scss';
import { setSelectedSubreddit } from '../../features-redux/posts/postSlice';
import { useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllPosts } from '../../features-redux/posts/postSlice';
import { useSelector } from 'react-redux';
import { setSearchTerm } from '../../features-redux/posts/postSlice';
function Header() {
    const posts = useSelector(getAllPosts);
    const dispatch = useDispatch();
    const recipes = 'recipes.json';
    const baking = 'baking.json';
    const deliciousRecipes = 'AllDeliciousRecipes.json';

    const [title, setTitle] = useState("Recipes");
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const searchTerm = useSelector((state) => state.posts.searchTerm);
  
  
    const onSearchTermChange = (e) => {
      setSearchTermLocal(e.target.value);
    };
  
    useEffect(() => {
      setSearchTermLocal(searchTerm);
    }, [searchTerm]);
  
    const onSearchTermSubmit = (e) => {
      e.preventDefault();
      dispatch(setSearchTerm(searchTermLocal));
    };
  

    const onRecipesClick = (e) => {
        e.preventDefault();
        dispatch(setSelectedSubreddit(recipes));
        setTitle("Recipes");
    }
    const onBakingClick = (e) => {  
        e.preventDefault();
        dispatch(setSelectedSubreddit(baking));
        setTitle("Baking Recipes");
      };

    const onDeliciousClick = (e) => {
        e.preventDefault();
        dispatch(setSelectedSubreddit(deliciousRecipes));
        setTitle("All Delicious Recipes")
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="Tasteful Reddit logo" height="100" className="d-inline-block align-text-top"/>
                </Link>
            </div>
            {title}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Choose Subreddit
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" onClick= {onRecipesClick}>Recipes</a></li>
                    <li><a className="dropdown-item" onClick={onBakingClick}>Baking Recipes</a></li>
                    <li><a className="dropdown-item" onClick={onDeliciousClick}>All Delicious Recipes</a></li>
                </ul>
                </li>
                <form className="form-inline my-2 my-lg-0" onSubmit={onSearchTermSubmit}>
                    <input className="form-control mr-sm-2" type="search" 
                    placeholder="Search..." aria-label="Search"
                     onChange={onSearchTermChange} />
                    <button type="submit" onClick={onSearchTermSubmit}></button>
                </form>
            </ul>
            </div>
        </div>
        </nav>
            
    )
}

export default Header

