import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from "../UI/LoadingIndicator";
import './IngredientForm.css';

const IngredientForm = React.memo(({addIngredient, loading}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("")

  const submitHandler = event => {
    event.preventDefault();
    if (name && amount) {
      const ingredient = {
        title: name,
        amount
      }
      addIngredient(ingredient);
      setName("");
      setAmount("");
    }
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
