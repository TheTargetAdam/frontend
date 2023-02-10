
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface CategoriesProps{
    categoriesHandler:(event:any)=>void,
}
const initialState:string[]=[]

const fakeData:string[]=["Программирование","Тексты","Менеджмент","Консалтинг","Мобильные приложения","Партнерство","Переводы","Разработка игр","Фотография","Анимация","SEO","Дизайн"]
export function Categories({categoriesHandler}:CategoriesProps){
    const [categoriesList,setCategoriesList]=useState(initialState)
    useEffect(()=>{
        setCategoriesList(fakeData);
    })
    return(
        <div>
            <div className="filter-header">
                        Выбрать критерии
                    </div>
                    <ul>
                        {/* <input type="checkbox" onClick={categoriesHandler} name="anime"></input>
                        <label >Anime</label> */}
                        {categoriesList.map(category=>(<div><input type="checkbox" onClick={categoriesHandler} name={`${category}`}></input>
                        <label >{category}</label></div>))}
                    </ul>
                    {/* <button onClick={submitHandler}>Add</button> */}
        </div>
    )
}