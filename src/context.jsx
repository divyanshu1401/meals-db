import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const _ = require('underscore');


const AppContext = React.createContext()
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomeMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

    const addToFavourites = (idMeal) => {
        let meal;
        meal = meals.find((meal) =>
            meal.idMeal === idMeal
        )
        let updatedFavourites = _.uniq([...favourites, meal])
        setFavourites(updatedFavourites)
        localStorage.setItem('favourites',JSON.stringify(updatedFavourites))
    }

    const removeFromFavourites = (idMeal) => {
        let updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal)
        setFavourites(updatedFavourites)
        localStorage.setItem('favourites',JSON.stringify(updatedFavourites))
    }

    const selectMeal = (idMeal, favouriteMeal = false) => {
        let meal;
        if (favouriteMeal) {
            meal = favourites.find((item) =>
                item.idMeal === idMeal
            )
        }
        else {
            meal = meals.find((meal) =>
                meal.idMeal === idMeal
            )
        }

        setSelectedMeal(meal)
        setShowModal(true)
    }

    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const { data } = await axios(url)
            if (data.meals) {
                setMeals(data.meals)
            }
            else
                setMeals([])
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false)
    }

    const fetchRandomMeal = async () => {
        fetchMeals(randomeMealUrl)
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])


    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    return <AppContext.Provider value={
        {
            meals,
            loading,
            setSearchTerm,
            fetchRandomMeal,
            showModal,
            setShowModal,
            selectMeal,
            setSelectedMeal,
            selectedMeal,
            addToFavourites,
            removeFromFavourites,
            favourites
        }
    }>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }