(function() {
function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}
var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		for (var j = 0; j < element.childNodes.length; j++) {
				var node = element.childNodes[j];
				if (node.className && node.className.startsWith && node.className.startsWith("CommodityAd__text___")) {
					var text = node.textContent;
					var matches = text.match(/(?:BUYING|SELLING)\s(\d+)\s.*\s@\s([\d,.]+)\s[A-Z]+\sfor/);
						if (matches && matches.length > 2) {
							var count = matches[1];
							var totalCents = parseInt(matches[2].replace(/[,.]/g,''));
							var perItem = toFixed(totalCents / count / 100, 3);
								console.log(perItem);
							var span = node.childNodes[0].childNodes[0]
								span.textContent += " ("+perItem+")";
						}
				}
		}
}
})();
