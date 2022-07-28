import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../helpers.jsx';
import { Box } from '@chakra-ui/react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';


const RecipeDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [recipe, setRecipe] = React.useState({})

  React.useEffect(() => {
    const viewDetail = async () => {
      try {
        const recipeData = await apiFetch('GET', `recipe/details/${params.id}`, null);
        setRecipe(recipeData);
        //console.log('here');

      } catch (err) {
        alert(err.message);
      }
    }
    viewDetail();
  }, [params.id]);

  return (
    <>
      <AppBar position="static" style={{ background: '#93C759' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Recipe Recommendation System
          </Typography>
          <Button variant="outlined" style={{color:"#93C759", background: "#FFFFFF", borderColor: '#FFFFFF' }} onClick={() => navigate('/recipe-create')}>Create new recipes</Button> 
        </Toolbar>
      </AppBar>

      <Box pl="100px" pt="50px" pb="100px">
        <Box >
          {/* <>recipe{params.id}</> */}
          <h1>{recipe.title}</h1>
          <img src={recipe.photo} alt="recipe thumbnail" height="300px" width="auto"/>
          <p><b>Meal Type:</b> {recipe.mealType}</p>
          <p><b>Serving Size:</b> {recipe.servings} servings</p>
          <p><b>Time To Cook:</b> {recipe.timeToCook} minutes</p>
          <p><b>Total Calories:</b> {recipe.calories} calories</p>
          <span><b>Ingredients: </b>{String(recipe.ingredients).split(", ").map((ingredient, idx) => {
            return (
              <div key = {idx}>
                <label>
                  {ingredient}
                </label>
              </div>
            )
          })}</span>
          <h3>Cooking Steps</h3>
          <span>{String(recipe.cookingSteps).split("Step ").slice(1).map((step, idx) => {
            return (
              <div key = {idx}>
                <label>
                  Step {step}
                </label>
              </div>
            )
          })}</span>
          <br></br>
          {/* <button onClick={() => navigate(`/`)}>Back</button> */}
          <Button variant="contained" style={{ background: '#93C759' }} name="back" onClick={() => navigate(`/`)}>Back</Button>

        </Box>  
      </Box>
    </>
  );

}



export default RecipeDetails;