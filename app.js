import React, { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, cost: 300, category: 'Hair accessory', date: '2025-03-13', item: 'Clip' },
    { id: 2, cost: 7000, category: 'Clothes', date: '2025-05-23', item: 'Shirt' },
    { id: 3, cost: 236462, category: 'Foot wear', date: '2025-05-23', item: 'Shoes' },
    { id: 4, cost: 2364562, category: 'Foot wear', date: '2025-05-22', item: 'Shoes' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
    const expenseToEdit = expenses.find(expense => expense.id === id);
    setEditedExpense(expenseToEdit);
  };

  const handleSaveEdit = () => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === editingId ? { ...editedExpense } : expense
    );
    setExpenses(updatedExpenses);
    setEditingId(null);
    setEditedExpense({});
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const handleChange = (e) => {
     const { name, value } = e.target;
        setEditedExpense(prev => ({
            ...prev,
            [name]: value
        }));
  }

  return (
    <div className="App">
      <h1>Your Expenses</h1>
      <table>
        <thead>
          <tr>
            <th>Cost</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
               {editingId === expense.id ? (
                            <>
                                <td><input type="text" name="cost" value={editedExpense.cost} onChange={handleChange} /></td>
                                <td><input type="text" name="category" value={editedExpense.category} onChange={handleChange} /></td>
                                <td><input type="text" name="date" value={editedExpense.date} onChange={handleChange} /></td>
                                <td>
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>Rs {expense.cost.toLocaleString()}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td>
                                    <button onClick={() => handleEdit(expense.id)}>Edit</button>
                                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                                </td>
                            </>
                        )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
