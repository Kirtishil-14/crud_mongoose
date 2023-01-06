const express = require("express");
const testModel = require("../models/test.model");
const app = express();

//get data
app.get("/", async (request, response) => {
  const tests = await testModel.find({});
  try {
    response.send(tests);
  } catch (error) {
    response.status(500).send(error);
  }
});

//create data
app.post("/create", async (request, response) => {
  const tests = new testModel(request.body);
  try {
    if (tests.name && tests.age) {
      await tests.save();
      response.status(200).send(tests);
    } else {
      response.send({ msg: "please enter valid data" });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

//update data
app.put("/update", async (request, response) => {
  try {
    const id = request.body.id;
    if (id && request.body.name && request.body.age) {
      const tests = await testModel.findByIdAndUpdate(
        { _id: id },
        request.body
      );
      if (tests)
        response.status(200).send(tests);
      else
        response.status(404).send({ msg: "id not found" });
    } else {
      response.send({ msg: "please enter invalid data" });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

//delete data
app.delete("/delete", async (request, response) => {
  try {
    const tests = await testModel.findByIdAndDelete(request.body.id);
    if (!tests) response.status(404).send("No item found");
    response.status(200).send(tests);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;