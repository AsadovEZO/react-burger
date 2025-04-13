import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-item.module.css'; 

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientItem = ({ ingredient, onAdd, count }) => {
  const { name, price, image } = ingredient;
  return (
    <div className={styles.card}>
      <button className={styles.addButton} onClick={() => onAdd(ingredient)}>
        {count > 0 && (
          <div className={styles.counter}>
            <Counter count={count} size="default" extraClass="m-1" />
          </div>
        )}
        <img src={image} alt={name} className={styles.image} />
        <p className={`${styles.price} text text_type_digits-default`}>
          {price} <span className={styles.currencyIcon}><CurrencyIcon type="primary" /></span>
        </p>
        <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      </button>
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default IngredientItem;