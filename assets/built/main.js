let mainMenu = document.getElementsByClassName('nav')[0]
let menuToggle = document.getElementById('js-navbar-toggle')
let topSocialLinks = document.getElementById('js-top-social-links')
let siteTopNav = document.getElementsByClassName('site-top-nav')[0]
let iconDark = document.getElementsByClassName('icon-dark')
let iconLight = document.getElementsByClassName('icon-light')

menuToggle.addEventListener('click', function () {
  mainMenu.classList.toggle('active')
  topSocialLinks.classList.toggle('active')
  siteTopNav.classList.toggle('full-center')
})

for (const key in iconDark) {
  if (Object.hasOwnProperty.call(iconDark, key)) {
    const element = iconDark[key];
    element.addEventListener('click', () => {
      html.classList.remove('dark-mode')
      localStorage.setItem('selected-theme', 'light')
    })
  }
}

for (const key in iconLight) {
  if (Object.hasOwnProperty.call(iconLight, key)) {
    const element = iconLight[key];
    element.addEventListener('click', () => {
      html.classList.add('dark-mode')
      localStorage.setItem('selected-theme', 'dark')
    })
  }
}

if (typeof (Storage) !== 'undefined') {
  if (localStorage.getItem('selected-theme') == 'dark') {
    html.classList.add('dark-mode')
  }
}


