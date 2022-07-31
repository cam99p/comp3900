"""
A mealType.py can return the recipes which are selected the meal type by the
 user.

Team name: 3900-M14A-SICCC
Project Name: Project 1 - Recipe Recommendation System
Author: Cameron Khuu, Carla Phan, Christopher Tsang, Sylvia Huang, Xin Tian Luo
Date: 31/July/2022
"""
from src.helper import dbConnection, retrieveRecipeList
from src.recipe import getFilteredRecipes, recipeMatch


def getMealType(meal, ingredientsList, blacklist):
    """ Select the meal type after the recipe match. 

        Algorithm: linear search. 
        
        The time complexity of "if" statement is O(1) and the time complexity
        of "for" loop is O(n). Thus, O(1+n) = O(n).

        Final Time Complexisty: O(n)

        Parameters:
            meal (str): the name of meal type
            ingredientsList (str): the string of ingredientsList
            blackist (list): the blacklist of ingredients
        
        Returns:
            recipleTypeList (list): list of all recipes ingredients
    """
    if len(ingredientsList) <= 0 or ingredientsList == "" \
        or ingredientsList is None:
        info= retrieveRecipeList(dbConnection())
        if blacklist != [] or len(blacklist) <= 0:
            info = getFilteredRecipes(info, blacklist) 
        recipeList = []   
        for recipe in info:
            ingDict = {
                    "recipeID": recipe[0],
                    "title": recipe[7],
                    "servings": recipe[1],
                    "timeToCook": recipe[2],
                    "mealType": recipe[3],
                    "photo": recipe[4],
                    "calories": recipe[5],
                    "cookingSteps": recipe[6],
                    "ingredients": recipe[8],
                    "missingIngredient": "",
                    "partialMatch": "",
            }
            recipeList.append(ingDict)
    else:
        recipeList = recipeMatch(ingredientsList, blacklist)
    recipeTypeList = []
    for recipe in recipeList:
        if meal is None or len(meal) == 0 or meal == "":
            recipeTypeList.append(recipe)
        elif recipe["mealType"] == meal:
            recipeTypeList.append(recipe)
    return recipeTypeList
