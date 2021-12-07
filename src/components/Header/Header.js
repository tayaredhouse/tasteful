import React from 'react';
import logo from "../Header/logo.png";
import { Link } from 'react-router-dom';
import './Header.scss';
import { setSelectedSubreddit } from '../../features-redux/posts/postSlice';
import { useDispatch } from 'react-redux';
function Header() {
    const dispatch = useDispatch();
    const recipes = 'recipes.json';
    const baking = 'baking.json';
    const deliciousRecipes = 'AllDeliciousRecipes.json';

    const onRecipesClick = (e) => {
        e.preventDefault();
        dispatch(setSelectedSubreddit(recipes));
    }
    const onBakingClick = (e) => {  
        e.preventDefault();
        dispatch(setSelectedSubreddit(baking));
      };

    const onDeliciousClick = (e) => {
        e.preventDefault();
        dispatch(setSelectedSubreddit(deliciousRecipes));
    };

    return (
            <nav>
                <input type="radio" id="recipes" name="choose_subreddit" value="Recipes" onClick={onRecipesClick} />
                <label for="recipes">Recipes</label>
                <input type="radio" id="baking" name="choose_subreddit" value="Baking" onClick={onBakingClick}/>
                <label for="baking">Baking</label>
                <input type="radio" id="deliciousrecipes" name="choose_subreddit" value="DeliciousRecipes" onClick={onDeliciousClick}/>
                <label for="deliciousrecipes">All Delicious Recipes</label>
                <Link to="/">
                     <img src={logo} alt="Tasteful Reddit logo"/>
                </Link>
                
            </nav>
    )
}

export default Header
