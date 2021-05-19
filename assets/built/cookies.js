let buttonCookies = document.getElementById('button-cookies')
let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)accepted-cookies\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let cookieBanner = document.getElementsByClassName('cookies')[0]

if (cookieValue === 'true') {
  cookieBanner.style.display = 'none'
} else {
  cookieBanner.style.display = 'block'
  buttonCookies.addEventListener('click', () => {
    document.cookie = "accepted-cookies=true;"
    cookieBanner.style.display = 'none'
  })
}