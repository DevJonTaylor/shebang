document.addEventListener('readystatechange', onReadyStateChange)

function onReadyStateChange(event) {
  if(document.readyState === 'complete') {
    navbarSetup()
  }
}

function navbarSetup() {
  const hamburger = document.querySelector('.navbar-burger')
  const observerOptions = {
    attributes: true
  }
  const observer = new MutationObserver((list, observer) => {
    list.forEach(mutation => {
      if(mutation.attributeName === 'class') {
        const isActive = mutation.target.classList.contains('is-active')
        const menu = document.querySelector('.navbar-menu').classList
        if(isActive) return menu.add('is-active')
        menu.remove('is-active')
      }
    })
  })
  observer.observe(hamburger, observerOptions)
  hamburger.addEventListener('click', event => {
    hamburger.classList.toggle('is-active')
  })
}