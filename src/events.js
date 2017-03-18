var subscriptions = {};

module.exports = {
  subscribe: function(events, callback){ //adding a new subscription
    if(!Array.isArray(events)){ //if not an array, make it a single item array
      events = [events];
    }
    for(var event of events){
      if(!subscriptions[event]){
        subscriptions[event] = [];
      }
      subscriptions[event].push(callback);
    }
  },
  emit: function(event, data){
    if(subscriptions[event]){
      for(var callback of subscriptions[event]){ //loop through and call all subscriptions
        callback(data);
      }
    }
  }
};
