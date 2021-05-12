function priceListFormatter(pricelist) {
    // transformacija modela
    grouped = pricelist.reduce(function (acc, val) {
        acc[val.price] = acc[val.price] || [];
        acc[val.price].push(val);
        return acc;
    }, {});
    
    // output
    console.log(printOutput(grouped));
  }
  
  function printOutput(format) {
    res = ""; 
    
    Object.keys(format).sort().map(  
      key => res += `${parseFloat(key).toFixed(1)} : ${format[key].map(x => x.from + ' do ' + x.to).join(' , ')} \n`
    );
  
    return res.trimEnd();
  }
  
  module.exports = priceListFormatter;