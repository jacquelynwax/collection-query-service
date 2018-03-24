const stats = {
  average: (messages) => {
    let sum = 0;
    messages.forEach(message => {
      sum += message.responseTime;
    })
    return sum / messages.length;
  },
  median: (messages) => {
    messages.sort();
    return messages(Math.floor(messages.length / 2)).responseTime;
  },
  min: (messages) => {
    messages.sort((a, b) => {
      return a.responseTime - b.responseTime
    });
    return messages[0].responseTime;
  },
  max: (messages) => {
    messages.sort((a, b) => {
      return a.responseTime - b.responseTime
    });
    return messages[messages.length - 1].responseTime;
  }
}

module.exports = { stats };
