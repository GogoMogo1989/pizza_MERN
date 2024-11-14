import React from 'react';
import UserNavbar from '../components/userNavbar';
import UserFooter from '../components/userFooter';
import PizzaMenu from '../pages/PizzaMenu';
import SaladMenu from '../pages/SaladMenu';
import DessertMenu from '../pages/DessertMenu';
import DrinkMenu from '../pages/DrinkMenu'

const LayoutMenu = () => {
    return (
        <div className='LayoutMenu'>

            <UserNavbar />

            <div id='pizza'>
                <PizzaMenu />
            </div>

            <div id='salad'>
                <SaladMenu />
            </div>

            <div id='dessert'>
                <DessertMenu />
            </div>

            <div id='drink'>
                <DrinkMenu />
            </div>

            <UserFooter />

        </div>
    )
}

export default LayoutMenu