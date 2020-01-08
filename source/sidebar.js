const current = document.getElementsByClassName("current")[0]

function element(tag, properties = '') {
  const el = document.createElement(tag);
  if (properties) {
    Object.keys(properties).forEach((prop) => {
      if (typeof properties[prop] === 'object') {
        Object.keys(properties[prop]).forEach((p) => {
          el[prop][p] = properties[prop][p]
        })
      } else {
        el[prop] = properties[prop];
      }})}
  return el
}

function formatDate(date_string) {
  date = new Date(date_string)
  return `${date.getHours()}h`
}

function createNews(story) {
  console.log(story["hed"])
  news = element("div", {className: "news"})
  hed = element("div", {className: "hed", textContent: story["hed"]})
  lede = element("div", {className: "lede", textContent: story["lede"]})
  time = element("div", {className: "time", textContent: formatDate(story["updated_at"])})
  place = element("div", {className: "place", textContent: story["dateline"]})
  timeplace = element("div", {className: "timeplace"})
  timeplace.appendChild(time)
  timeplace.appendChild(place)
  news.appendChild(hed)
  news.appendChild(lede)
  news.appendChild(timeplace)
  news.addEventListener("click", function(){window.open(story["url"], "_blank")}, false)
  return news
}

function init() {
  fetch("https://wireapi.reuters.com/v3/feed/url/www.reuters.com/news/world")
    .then(response => response.json())
    .then((data) => {
      data["wireitems"].forEach((item) => {
	story = item["templates"][0]["story"]
	if (typeof story != "undefined") {
	  news = createNews(story)
	  current.appendChild(news)
	}
      })
    })
}

init()
