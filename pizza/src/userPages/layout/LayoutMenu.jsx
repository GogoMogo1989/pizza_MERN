import React from 'react';
import UserNavbar from '../components/userNavbar';
import UserFooter from '../components/userFooter';
import PizzaMenu from './PizzaMenu';
import SaladMenu from './SaladMenu';
import DessertMenu from './DessertMenu';
import DrinkMenu from './DrinkMenu'

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