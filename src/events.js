var subscriptions = {};

module.exports = {
  subscribe: function(events, callback){
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
      for(var callback of subscriptions[event]){
        callback(data);
      }
    }
  }
};
