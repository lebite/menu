const randomNumGenerator = (context, events, done) => {
    const restaurant_id = Math.floor(Math.random() * 10000000) + 1;
    context.vars.restaurant_id  = restaurant_id;
    return done();
  }
  ​
  module.exports = {
    randomNumGenerator,
  };