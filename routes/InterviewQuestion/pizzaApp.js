const express = require('express')
const Pizza = require('../../modules/InterviewQuestion/pizzaApp');


const Router = new express.Router();


// Define a POST route for uploading CSV files


//create single pizza
Router.post('/create/pizza', async (req, res) => {
  const pizza = new Pizza(req.body);
  try {
    await pizza.save();
    res.status(200).send({ pizza });

  } catch (e) {
    res.status(400).send(e);
    console.log("did not work ")
  }

})
//get many
Router.get('/fetch/pizza', async (req, res) => {
  try {
    const pizza = await Pizza.find();
    res.status(200).send(pizza)
  } catch (e) {
    res.status(400).send(e)

  }
})

//update pizza

Router.patch('/update/pizza/:id', async (req, res) => {
    try {
      const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Use findByIdAndUpdate
      if (!pizza) {
        return res.status(404).send("Pizza not found");
      }
      res.status(200).send(pizza);
    } catch (e) {
      res.status(400).send(e);
    }
  });

//delete single pizza

Router.delete(`/delete/pizza/:_id`, async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params._id);
        if (!pizza) {
            return res.status(404).send("Pizza not found");
        }
        
        const deletedPizza = await Pizza.findByIdAndDelete(req.params._id);
        res.status(200).send(deletedPizza);
    } catch (e) {
        res.status(400).send(e);
    }
});
// Router.delete('/delete/pizza/:_id', async (req, res) => {
//     console.log(typeof(req.params._id))
//     try {
//         // const pizza = await Pizza.deleteOne(req.params._id); 

//       const pizza = await Pizza.findByIdAndDelete(req.params._id); 
//       if (!pizza) {
//         return res.status(404).send();
//       }
//       res.status(200).send(pizza);
//     } catch (e) {
//       res.status(400).send(e)
//     }


// })
module.exports = Router;