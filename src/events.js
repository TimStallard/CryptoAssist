var subscriptions = {};

module.exports = {
  subscribe: function(event, callback){
    if(!subscriptions[event]){
      subscriptions[event] = [];
    }
    subscriptions[event].push(callback);
  },
  emit: function(event, data){
    if(subscriptions[event]){
      for(var callback of subscriptions[event]){
        callback(data);
      }
    }
  }
};
