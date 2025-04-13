import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

const IngredientsMenu = () => {
    const [current, setCurrent] = React.useState('bun')
    return (
      <div className='p-5' style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    )
  }

export default IngredientsMenu;