function ShowTooltip(text, dom) {
	DOM.tooltip.style.display = "initial";
	DOM.tooltip.innerHTML = text;
	x = dom.getBoundingClientRect().x;
	y = dom.getBoundingClientRect().y + dom.getBoundingClientRect().height + 1 + window.pageYOffset;
    if (x > document.body.getBoundingClientRect().width - 200) 
        x = document.body.getBoundingClientRect().width - 200;
    else if (x < 0) 
        x = 0;
	DOM.tooltip.style.left = x + "px";
	DOM.tooltip.style.top = y + "px";
	DOM.tooltip.style.visibility = "visible";
}

function HideTooltip() {
	DOM.tooltip.style.display = "none";
	DOM.tooltip.style.visibility = "hidden";
}