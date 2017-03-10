var subscriptions = {};

module.exports = {
  subscribe: function(event, callback){ //adding a new subscription
    if(!subscriptions[event]){
      subscriptions[event] = [];
    }
    subscriptions[event].push(callback);
  },
  emit: function(event, data){
    if(subscriptions[event]){
      for(var callback of subscriptions[event]){ //loop through and call all subscriptions
        callback(data);
      }
    }
  }
};
